import { Router } from 'express';

import authController from "../controllers/authController";

const router = Router();

// 'api/auth/register'
router.post('/register', authController.registerController);

// 'api/auth/login'
// @ts-ignore
router.post('/login', authController.loginController);

export default router;
