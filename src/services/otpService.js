import models from '../database/models';

const deleteOtp = async (email) => models.OTP.destroy({
  where: { email },
});

const createOtp = async (body) => {
  const otp = await models.OTP.create(body);
  return otp;
};

export { deleteOtp, createOtp };
