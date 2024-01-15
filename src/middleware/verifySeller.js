const verifySeller = async (res, req, next) => {
  const user = req.user.role;
  if (user !== 'seller') {
    return res.status(401).json({
      success: false,
      message:
        'You are allowed to add a product! please login a seller to continue with this action.',
    });
  }
  next();
};
export default verifySeller;
