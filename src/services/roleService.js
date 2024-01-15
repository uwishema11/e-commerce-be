import models from '../database/models';

const updateRoles = async (email, userRole) => {
  const userCount = await models.User.update({ role: userRole }, { where: { email } });
  return userCount;
};

export default updateRoles;
