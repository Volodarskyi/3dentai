import { Router } from 'express';
import aiController from '../controllers/ai.controller';

const router = Router();

router.post('/analyze', aiController.analyzeImages);

export default router;
