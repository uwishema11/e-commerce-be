import models from '../database/models';
import RedisClient from '../utils/initRedis';

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

const updatePasswordResetToken = async (token) => {
  const passwordResetToken = await RedisClient.setToken('passwordToken', token);
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

export { addUser, getAllUsers, updatePasswordResetToken, resetPassword, findUserByEmail };
