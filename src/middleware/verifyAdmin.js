const verifyAdmin = (req, res, next) => {
  const user = req.user.role;
  if (user !== 'admin') {
    return res.status(401).json({ message: "You are not authorized to update user's role." });
  }
  next();
};

export default verifyAdmin;
