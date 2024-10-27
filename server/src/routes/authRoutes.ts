import { Router } from 'express';
// const validator = require('express-validator');

import authController from "../controllers/authController";

const router = Router();

// 'api/auth/register'
router.post('/register', authController.registerController);

export default router;
