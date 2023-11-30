import models from '../database/models';

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

export { addUser, getAllUsers, findUserByEmail };
