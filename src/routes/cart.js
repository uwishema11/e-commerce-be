import express from 'express';
import * as productController from '../controllers/cartController.js';
import protect from '../middleware/authMiddleWare.js';

const cartRouter = express.Router();

cartRouter.post('/:id', protect, productController.addToCart);
cartRouter.get('/', protect, productController.viewCart);
export default cartRouter;
