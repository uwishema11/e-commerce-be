import express from 'express';
import protect from '../middleware/authMiddleWare.js';
import makePayment from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/', protect, makePayment);
export default paymentRouter;
