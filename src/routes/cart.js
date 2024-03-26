import express from 'express';
import addToCart from '../controllers/cartController';
import protect from '../middleware/authMiddleWare';

const cartRouter = express.Router();

cartRouter.post('/:id', protect, addToCart);
export default cartRouter;
