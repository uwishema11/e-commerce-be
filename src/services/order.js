import models from '../database/models';

const createOrder = async (orderInfo) => {
  const order = await models.Order.create(orderInfo);
  return order;
};

const getOrderById = async (orderId) => {
  const order = await models.Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: models.User,
        attributes: ['email'],
        as: 'user',
      },
    ],
  });
  return order;
};
const getOrderByUser = async (id) => {
  const productInf = await models.Order.findOne({
    where: { userId: id, status: 'pending' },
  });
  return productInf;
};

const getAllOrder = async () => {
  const allOrders = await models.Order.findAll();
  return allOrders;
};

const updateOrder = async (id, orderInfo) => {
  return models.Order.update(orderInfo, {
    where: id,
    returning: true,
    raw: true,
  });
};
const updateOrderStatus = (userId, status) => {
  return models.Order.update({ status }, { where: { userId } });
};

const deleteOrder = async (id) => {
  return models.Order.destroy({
    where: { id },
  });
};

export {
  createOrder,
  updateOrderStatus,
  getAllOrder,
  getOrderByUser,
  getOrderById,
  updateOrder,
  deleteOrder,
};
