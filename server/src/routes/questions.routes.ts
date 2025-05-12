import { Router } from 'express';

import questionController from '../controllers/questions.controller';

const router = Router();

router.get('/', questionController.getAllQuestionsController);
router.get('/active', questionController.getActiveQuestionsController);
router.post('/', questionController.addQuestionController);

export default router;
