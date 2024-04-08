import * as Services from '../services/cart';
import * as productService from '../services/productService';

const addToCart = async (req, res) => {
  try {
    const product = await productService.findproductById(req.params.id);

    const details = {
      productId: req.params.id,
      name: product.productName,
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
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export default addToCart;
