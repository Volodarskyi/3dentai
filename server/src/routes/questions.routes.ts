import { Router } from 'express';

import questionController from '../controllers/questions.controller';

const router = Router();

router.post('/create', questionController.createQuestion);
router.get('/active', questionController.getQuestionsActive);

export default router;
