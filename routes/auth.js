import { Router } from 'express';
import AuthController from '../controllers/auth.js';
import { AsyncWrapper } from '../utils/AsyncWrapper.js';

const router = Router();
const authController = new AuthController();

router.post('/signup', AsyncWrapper(authController.signUp));
router.post('/signin', AsyncWrapper(authController.signIn));
router.post('/forget-password', AsyncWrapper(authController.forgetPassword));
router.post('/change-password', AsyncWrapper(authController.changePassword));
router.post('/resend-otp', AsyncWrapper(authController.resendOtp));
router.post('/verify-otp', AsyncWrapper(authController.verifyOtp));

export const authRouter = { baseUrl: '/api/auth', router };
