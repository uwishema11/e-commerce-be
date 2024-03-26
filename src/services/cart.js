import { findproductById } from './productService';
import { redisClient } from '../utils/initRedis';

const createCart = async (id) => {
  await redisClient.set(`client:${id}`, JSON.stringify([]));
  const cart = await redisClient.get(`client:${id}`);
  return JSON.parse(cart);
};

const getProductsInCart = async (id) => {
  const cart = await redisClient.get(`client:${id}`);
  if (!cart) {
    console.log('no cart');
    await createCart(id);
  }
  console.log(`here is your ${cart}`);
  return JSON.parse(cart);
};
const updateProductsInCart = async (userId, products) => {
  await redisClient.set(`client:${userId}`, JSON.stringify(products));
  const cart = await redisClient.get(`client:${userId}`);
  return JSON.parse(cart);
};

const addToCart = async (userId, item) => {
  const product = await findproductById(item.productId);
  console.log(product);

  const productList = await getProductsInCart(userId);
  let isInCart = false;
  productList.map((element) => {
    if (element.productId === item.productId) {
      isInCart = true;
      element.quantity += 1;
    }
  });

  if (isInCart === false) {
    productList.push(item);
  }

  const isUpdated = await updateProductsInCart(userId, productList);
  return isUpdated;
};

export { addToCart, getProductsInCart, createCart };
