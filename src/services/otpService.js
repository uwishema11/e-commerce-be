import RedisClient from '../utils/initRedis';

const deleteOtp = async (data) => RedisClient.deleteToken(data);

const createOtp = async (data) => {
  const otpData = await RedisClient.setToken('otp', data);
  return otpData;
};
const getOtp = async () => {
  const otpData = await RedisClient.getToken('otp');
  return otpData;
};

export { deleteOtp, createOtp, getOtp };
