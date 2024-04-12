import express from 'express';
import sendOtp from '../controllers/otpController.js';
import enableTwoFactorAuth from '../controllers/twoFactorAuthController.js';

const otpRouter = express.Router();

otpRouter.post('/', sendOtp);
otpRouter.post('/enable-2fa', enableTwoFactorAuth);

export default otpRouter;
