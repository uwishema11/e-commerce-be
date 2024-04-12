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
const findproductById = async (id) => {
  const item = await models.Product.findOne({
    where: { id },
  });
  return item;
};

const deleteProduct = async (id) =>
  models.Product.destroy({
    where: { id },
  });

const updateProduct = async (id, productInfo) => {
  return models.Product.update(productInfo, {
    where: { id },
    returning: true,
    row: true,
  });
};

export {
  deleteProduct,
  createProduct,
  findAllProducts,
  findproductById,
  findOneProduct,
  updateProduct,
};
