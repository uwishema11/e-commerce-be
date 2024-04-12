import * as Services from '../services/cart';
import * as productService from '../services/productService';

const addToCart = async (req, res) => {
  try {
    const product = await productService.findproductById(req.params.id);
    const details = {
      productId: req.params.id,
      productName: product.productName,
      price: product.price,
      quantity: 1,
    };
    const result = await Services.addToCart(req.user.id, details);

    return res.status(200).json({
      success: true,
      message: 'item is added to cart successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const viewCart = async (req, res) => {
  try {
    const allProductsInCart = await Services.getProductsInCart(req.user.id);
    return res.status(200).json({
      success: true,
      data: allProductsInCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { addToCart, viewCart };
