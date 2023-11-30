/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import * as userService from '../services/userService.js';
import sendEmailOnRegistration from '../utils/Email/emailTempalte.js';
import sendEmail from '../utils/Email/mailer.js';
import { generateAccessToken } from '../helpers/generateToken.js';
import { userSchema } from '../validations/userValidation.js';

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    const body = {
      ...req.body,
      password: hashedPassword,
    };
    const newUser = await userService.addUser(body);
    res.status(200).json({
      success: true,
      result: newUser,
    });
    sendEmail(
      email,
      process.env.EMAIL_FROM,
      'Confirmation Email',
      sendEmailOnRegistration(req.body.firstName, process.env.BASE_LINK),
    );
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
        message: 'Wrong email or Paswword',
      });
    }
    // hash and compare passwords
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(401).json({
        message: 'Wrong email or Paswword',
      });
    }

    const token = await generateAccessToken(user);

    return res.status(201).json({
      success: true,
      message: 'logged in successfully',
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { registerUser, login };
