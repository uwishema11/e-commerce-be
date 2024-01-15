import models from '../database/models';

const createProduct = async (productInformation) => {
  const createdItem = await models.Product.create(productInformation);
  return createdItem;
};
const findAllProducts = async () => {
  const allItems = await models.Product.findAll();
  return allItems;
};

const findOneProduct = async (name) => {
  const singleItem = await models.Product.findOne({
    where: { productName: name },
  });
  return singleItem;
};

export { createProduct, findAllProducts, findOneProduct };
