const generateOTP = async () => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  const { error } = otp;
  if (error) {
    return 'failed to generate OPT! Please try again';
  }
  return otp;
};

export default generateOTP;
