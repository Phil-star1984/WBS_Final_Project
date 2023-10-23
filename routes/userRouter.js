import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter
.route('/')
.get(userController.getAllUsers)
.post(userController.addNewUser);

userRouter
.route('/:id')
.get(userController.getUserById)
.put(userController.updateUser)
.delete(userController.deleteUser);


export default userRouter;