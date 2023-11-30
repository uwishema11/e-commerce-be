import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateAccessToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
