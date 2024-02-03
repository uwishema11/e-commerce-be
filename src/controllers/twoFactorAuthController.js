import bcrypt from 'bcrypt';
import * as userService from '../services/userService';

const enableTwoFactorAuth = async (req, res) => {
  try {
    const { email, otpSecret } = req.body;

    // check if the user exists in our user's collection
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User with the provided email does not exists ! Please provide the correct email.',
      });
    }

    // verify if entred OTP is the same as the  we have in our database
    const matchedOtp = await bcrypt.compare(otpSecret, user.otpSecret);
    if (!matchedOtp) {
      return res.status(400).json({
        success: true,
        message: 'OTP do not match! Please provide valid OTP',
      });
    }
    // delete otp from our databse;
    await userService.deleteUserOtp(user.id);
    // enable 2FA
    await userService.updateUserTwoAuth(user.id);
    return res.status(200).json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default enableTwoFactorAuth;
