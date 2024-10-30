import { Router } from 'express';
const validator = require('express-validator');

import authContr from "../controllers/auth-contr.js";

const router = Router();

// 'api/auth/register'
router.post('/register', authContr.registerController);

export default router;
