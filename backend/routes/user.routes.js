import Router from 'express';
import { userController } from '../controller/user.controller.js';

export const userRouter = new Router();

userRouter.get('/products', userController.products);
userRouter.get('/products/:id', userController.productsById);
userRouter.get('/myOrders/:username', userController.getMyOrders);
userRouter.post('/myOrders/:username', userController.updateMyOrders);
userRouter.get('/getOrderByID/:id', userController.getOrderByID);
userRouter.get('/cart/:username', userController.getCart);
userRouter.post('/cart/:username', userController.clearCart);
userRouter.put('/cart/:username', userController.updateCart);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/signup', userController.signup);
userRouter.get('/checkAuthUser', userController.checkAuthUser);