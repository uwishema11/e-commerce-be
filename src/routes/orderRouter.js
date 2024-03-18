import express from 'express';
import protect from '../middleware/authMiddleWare';
import * as orderController from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/', protect, orderController.createOrder);
orderRouter.get('/', protect, orderController.getAllOrders);

export default orderRouter;
