import Stripe from 'stripe';
import * as Services from '../services/order';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Services.getOrderByUser(userId);
    if (!order) {
      return res.status(400).json({
        message: 'You do not have any order',
      });
    }

    const items = order.products.map((product) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.unit_price * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `https://${req.get('host')}`,
      cancel_url: `https://${req.get('host')}`,
      customer_email: req.user.email,
      line_items: items,
      mode: 'payment',
    });
    await Services.updateOrderStatus(req.user.id,'completed');
    return res.status(200).json({
      success: true,
      message: 'payment successfully made',
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default makePayment;
