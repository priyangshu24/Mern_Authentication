import express from 'express';
import { register, login, logout,userVerifyOtp, verifyEmail, isAuthenticated, sendResetotp , resetPassword} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth,userVerifyOtp);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetotp);
authRouter.post('/reset-password', resetPassword);
export default authRouter;