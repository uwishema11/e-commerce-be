import express from 'express';
import * as userController from '../controllers/userController';
import protect from '../middleware/authMiddleWare';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.login);
userRouter.post('/updatePassword', protect, userController.updatePassword);
userRouter.get('/logout', userController.logout);
userRouter.post('/forgot_password', userController.forgotPassword);
userRouter.post('/:token', userController.resetPassword);

export default userRouter;
