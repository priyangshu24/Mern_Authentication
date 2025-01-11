import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getAllUsers } from '../controllers/userController.js';  

const userRouter = express.Router();

userRouter.get('/data', userAuth, getAllUsers); 

export default userRouter;