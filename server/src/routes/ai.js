import { Router } from 'express';
import aiController from '../controllers/AI.js';

const router = Router();

router.post('/analyze', aiController.analyzeImages);

export default router;
