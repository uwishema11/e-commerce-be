import express from 'express';
import * as productController from '../controllers/productcontroller';
import verifySeller from '../middleware/verifySeller';
import verifyAdmin from '../middleware/verifyAdmin';
import protect from '../middleware/authMiddleWare';

const productRouter = express.Router();

productRouter.post('/create', protect, verifySeller, productController.addProduct);
productRouter.get('/', protect, verifyAdmin, productController.getAllProducts);
productRouter.get('/:productId', protect, verifyAdmin, productController.getSingleProduct);
productRouter.delete(
  '/delete/:productId',
  protect,
  verifyAdmin,
  productController.deleteSingleProduct,
);
productRouter.patch(
  '/update/:productId',
  protect,
  verifyAdmin,
  productController.deleteSingleProduct,
);

export default productRouter;
