import bcrypt from 'bcrypt';
import { deleteOtp, createOtp } from '../services/otpService';
import sendOtpMail from '../utils/Email/otpEmail';
import sendOtpEmail from '../utils/Email/otpEmailTemplate';
import generateOTP from '../utils/otpGenerator';

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Provide value for email',
      });
    }
    // delete any old record
    await deleteOtp(req.user.email);

    // generate pin
    const generatedOtp = await generateOTP();
    console.log(generatedOtp)

    // send the email to the user
    sendOtpMail(email, 'OTP for Authentication', sendOtpEmail(generatedOtp));

    // save the  hashed otp in our database
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(generatedOtp, salt);
    const result = await createOtp(hashedOtp);

    return res.status(200).json({
      success: true,
      message: 'OTP was sent to your email',
      data: result,
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
