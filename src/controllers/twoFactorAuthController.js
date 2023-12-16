import * as userService from '../services/userService';

const enableTwoFactorAuth = async (req, res) => {
  try {
    const { email } = req.body;

    // check if the user exists in our user's collection
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User with the provided email does not exists ! Please provide the correct email.',
      });
    }
    await userService.updateUserTwoAuth(user.id);
    return res.status(200).json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export default enableTwoFactorAuth;
