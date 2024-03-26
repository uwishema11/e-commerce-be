import models from '../database/models';
import redisClient from '../utils/initRedis';

const addUser = async (newUser) => {
  const registereduser = await models.User.create(newUser);
  return registereduser;
};

const getAllUsers = async () => {
  const users = await models.User.find();
  return users;
};

const findUserByEmail = async (email) => {
  const user = await models.User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const updateUserOtp = async (otp, id) => {
  const user = await models.User.update({ otpSecret: otp }, { where: { id } });
  return user;
};
const deleteUserOtp = async (id) => {
  const user = await models.User.update({ otpSecret: null }, { where: { id } });
  return user;
};

const findUserById = async (userId) => {
  const user = await models.User.findOne({
    where: { id: userId },
  });
  return user;
};

const updatePasswordResetToken = async (token) => {
  const passwordResetToken = await redisClient.setToken('passwordToken', token);
  return passwordResetToken;
};

const resetPassword = async (token, newPassword, userId, res) => {
  const freshToken = RedisClient.get('passwordToken');
  if (!freshToken) {
    return res.status(400).json({
      success: false,
      message: 'failled to update your password',
    });
  }
  if (freshToken !== token) {
    return res.status(400).json({
      success: false,
      message: 'token do not match',
    });
  }
  const updatedUser = await models.User.update(
    { password: newPassword },
    {
      where: { id: userId },
    },
  );
  await RedisClient.del('passwordToken');
  if (updatedUser) {
    return res.status(201).json({
      success: true,
      message: 'password rest successfully',
    });
  }
};

const updatePassword = async (email, newPassword) => {
  const updatedPassword = await models.User.update(
    { password: newPassword },
    {
      where: { email },
    },
  );
  return updatedPassword;
};
const updateUserTwoAuth = async (id) => {
  const updated = await models.User.update({ twoFactorEnabled: true }, { where: { id } });
  return updated;
};

const updateMe = async (id, body) => {
  const user = await models.User.update(body, {
    where: { id },
    returning: true,
    raw: true,
  });
  return user;
};
export {
  addUser,
  updateMe,
  getAllUsers,
  updatePassword,
  findUserById,
  updatePasswordResetToken,
  resetPassword,
  findUserByEmail,
  updateUserOtp,
  deleteUserOtp,
  updateUserTwoAuth,
};
