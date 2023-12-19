import express from 'express';
import * as userController from '../controllers/userController';
import updatingRoles from '../controllers/rolecontroller';
import verifyAdmin from '../middleware/verifyAdmin';

import protect from '../middleware/authMiddleWare';

const userRouter = express.Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.login);
userRouter.post('/updatePassword', protect, userController.updatePassword);
userRouter.get('/logout', userController.logout);
userRouter.patch('/updateMe', protect, userController.updateMe);
userRouter.patch('/role', protect, verifyAdmin, updatingRoles);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.post('resetPassword/:token', userController.resetPassword);

export default userRouter;
