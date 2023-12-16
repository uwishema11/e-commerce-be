import express from 'express';
import sendOtp from '../controllers/otpController';
import enableTwoFactorAuth from '../controllers/twoFactorAuthController';

const otpRouter = express.Router();

otpRouter.post('/', sendOtp);
otpRouter.post('/enable-2fa', enableTwoFactorAuth);

export default otpRouter;
