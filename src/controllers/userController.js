/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import * as userService from '../services/userService.js';
import sendEmailOnRegistration from '../utils/Email/emailTempalte.js';
import sendEmailOnResetPassword from '../utils/Email/resetPasswordTemplate.js';
import sendEmail from '../utils/Email/mailer.js';
import { generateAccessToken, verifyAccessToken, createSignInToken } from '../helpers/generateToken.js';
import { userSchema } from '../validations/userValidation.js';

const registerUser = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    const { error } = await userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const isUser = await userService.findUserByEmail(email);
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirm_password, salt);
    const body = {
      ...req.body,
      password: hashedPassword,
      confirm_password: hashedConfirmPassword
    };
    const newUser = await userService.addUser(body);
    // remove password from the result

    newUser.password = undefined;
    newUser.confirm_password = undefined;

    // sending confirmation email to user after registration
    sendEmail(
      email,
      'Confirmation Email',
      sendEmailOnRegistration(req.body.firstName, process.env.BASE_LINK),
    );
    res.status(200).json({
      success: true,
      message: 'check your email for confirmation',
      result: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill empty fields',
      });
    }

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please try again with the correct credentials.',
      });
    }
    // hash and compare passwords
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please try again with the correct credentials.',
      });
    }
    // sending token to client
    await createSignInToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// logging out a user
const logout = async (req, res) => {
  try {
    res.cookie('jwt', 'Loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({
      success: true,
      message: 'loggedout successfully'
    });
  } catch (error) {
    console.log('Error in Logging Out : ', error);
  }
};
// Reset Password via email
const forgotPassword = async (req, res) => {
  try {
    // find if user exists in our database
    const { email } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'user doees not exist',
      });
    }
    const token = await generateAccessToken({ email: user.email, id: user.id });
    await userService.updatePasswordResetToken(token);

    // send email to reset password

    sendEmail(
      req.body,
      process.env.EMAIL_FROM,
      'Reset Password',
      sendEmailOnResetPassword(user.firstName, process.env.BASE_LINK),
    );
    return res.status(200).json({
      success: true,
      message: 'email have been sent to a user',
      id: user.id,
      resetToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// resetting password
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { error } = await userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const token = await generateAccessToken(req.params.token);
    const user = await verifyAccessToken(token);
    const userId = user.id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userService.resetPassword(token, hashedPassword, userId, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  registerUser,
  login,
  logout,
  resetPassword,
  forgotPassword
};
