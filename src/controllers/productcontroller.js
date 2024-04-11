import * as Services from '../services/productService';
import productSchema from '../validations/productValidation';

const addProduct = async (req, res) => {
  try {
    //  data validations
    const validations = await productSchema.validate(req.body);
    const { error } = validations;
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    // find if product exixsts in our database
    const isExists = await Services.findOneProduct(req.body.productName);
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: 'Product already exists',
      });
    }
    const result = {
      ...req.body,
      userId: req.user.id,
    };
    const newProduct = await Services.createProduct(result);
    return res.status(200).json({
      success: true,
      message: 'Product was added successfuly',
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await Services.findAllProducts();
    const { error } = data;
    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Error while fetching data ! Please try again.',
      });
    }
    return res.status(201).json({
      success: true,
      message: 'All products.',
      result: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = req.params.productId;

    const singleProduct = await Services.findproductById(product);
    if (!singleProduct) {
      return res.status(404).json({
        success: 'failled',
        message: 'A product is  not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product successfully found.',
      result: singleProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: 'fail',
      message: error.message,
    });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const product = req.params.productId;
    if (!product) {
      return res.status(404).json({
        success: 'failled',
        message: ' Please  select a product to be deleted',
      });
    }
    const isProductExist = await Services.findproductById(product);
    if (!isProductExist) {
      return res.status(404).json({
        success: 'failled',
        message: 'Product not found',
      });
    }
    await Services.deleteProduct(product);
    return res.status(200).json({
      success: true,
      message: 'product succfully deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'fail',
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = req.params.productId;
    if (!product) {
      return res.status(404).json({
        success: 'failled',
        message: ' Please  identify an Product to be updated',
      });
    }
    const isProductExist = await Services.findproductById(product);
    if (!isProductExist) {
      return res.status(404).json({
        success: 'failled',
        message: 'Product not found',
      });
    }
    const updatedProduct = await Services.updateProduct(product, req.body);
    res.status(200).json({
      success: true,
      message: 'Product succfully updated',
      result: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: 'failled',
      message: error.message,
    });
  }
};
export { addProduct, deleteSingleProduct, getAllProducts, getSingleProduct, updateProduct };
