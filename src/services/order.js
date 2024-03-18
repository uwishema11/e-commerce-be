import models from '../database/models';

const createOrder = async (orderInfo) => {
  const order = await models.Order.create(orderInfo);
  return order;
};

const getOrderById = async (orderId) => {
  const order = await models.Order.findById({
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

const deleteOrder = async (id) => {
  return models.Order.destroy({
    where: { id },
  });
};

export { createOrder, getAllOrder, getOrderById, updateOrder, deleteOrder };
