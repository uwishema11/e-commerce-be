import express from 'express';
import * as productController from '../controllers/productcontroller';

const productRouter = express.Router();

productRouter.post('/', productController.addProduct);
productRouter.get('/', productController.getAllProducts);

export default productRouter;
