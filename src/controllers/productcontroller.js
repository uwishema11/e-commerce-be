import * as Services from '../services/productService';

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    // find if product exixsts in our database
    const isExists = await Services.findOneProduct(req.body.productName);
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: 'Product already exists',
      });
    }
    const newProduct = await Services.createProduct(product);
    return res.status(200).json({
      success: true,
      message: 'Product was added successfuly',
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
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
  }
};

export { addProduct, getAllProducts };
