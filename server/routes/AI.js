import { Router } from 'express';
import AIController from '../controllers/AI.js';

const router = Router();

router.get('/', AIController.getImages);
router.get('/analyze', AIController.analyzeImages);
router.get('/test', AIController.testApiAi);

export default router;
