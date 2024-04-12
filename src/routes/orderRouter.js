import express from 'express';
import protect from '../middleware/authMiddleWare.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import * as orderController from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create', protect, orderController.createOrder);
orderRouter.get('/', protect, verifyAdmin, orderController.getAllOrders);

export default orderRouter;
