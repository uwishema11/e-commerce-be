import express from 'express';
import * as productController from '../controllers/cartController';
import protect from '../middleware/authMiddleWare';

const cartRouter = express.Router();

cartRouter.post('/:id', protect, productController.addToCart);
cartRouter.get('/', protect, productController.viewCart);
export default cartRouter;
