import express from 'express';
import protect from '../middleware/authMiddleWare';
import makePayment from '../controllers/paymentController';

const paymentRouter = express.Router();

paymentRouter.post('/', protect, makePayment);
export default paymentRouter;
