import express from 'express';
import * as productController from '../controllers/productcontroller';
import verifySeller from '../middleware/verifySeller';
import verifyAdmin from '../middleware/verifyAdmin';
import protect from '../middleware/authMiddleWare';

const productRouter = express.Router();

productRouter.post('/', protect, verifySeller, productController.addProduct);
productRouter.get('/', protect, verifyAdmin, productController.getAllProducts);

export default productRouter;
