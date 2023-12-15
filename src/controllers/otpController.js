import bcrypt from 'bcrypt';
import { deleteOtp, createOtp } from '../services/otpService';
import sendEmail from '../utils/Email/mailer';
import sendOtpEmail from '../utils/Email/otpEmailTemplate';
import * as userService from '../services/userService';
import models from '../database/models'
import generateOTP from '../utils/otpGenerator';

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Provide value for email',
      });
    }
    // check whether the user exists in our database
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found! Please provide the correct registerd email',
      });
    }

    // generate pin
    const generatedOtp = await generateOTP();
    console.log(generatedOtp);
    // save the  hashed otp in our database
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(generatedOtp, salt);
    await models.User.update({ otpSecret: hashedOtp }, { where: { id: user.id } });
    console.log(user.otpSecret);

    sendEmail(email, 'OTP for Authentication', sendOtpEmail(generatedOtp));

    return res.status(200).json({
      success: true,
      message: 'OTP was sent to your email',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default sendOtp;