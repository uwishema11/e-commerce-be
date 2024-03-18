import * as Services from '../services/order';

const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const order = {
      ...req.body,
      userId: req.user.id,
    };
    const result = await Services.createOrder(order);
    console.log(order);
    return res.status(200).json({
      success: true,
      message: 'order created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messag: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Services.getAllOrder();
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messag: error.message,
    });
  }
};

export { createOrder, getAllOrders };
