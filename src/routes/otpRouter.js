import express from 'express';
import protect from '../middleware/authMiddleWare';
import sendOtp from '../controllers/otpController';

const otpRouter = express.Router();

otpRouter.post('/', protect, sendOtp);

export default otpRouter;
