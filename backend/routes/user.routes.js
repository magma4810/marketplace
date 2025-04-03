import Router from 'express';
import { userController } from '../controller/user.controller.js';

export const userRouter = new Router();

userRouter.get('/getProducts', userController.getProducts);
