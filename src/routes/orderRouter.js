import express from 'express';
import protect from '../middleware/authMiddleWare';
import verifyAdmin from '../middleware/verifyAdmin';
import * as orderController from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/', protect, orderController.createOrder);
orderRouter.get('/', protect, verifyAdmin, orderController.getAllOrders);

export default orderRouter;
