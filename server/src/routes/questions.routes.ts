import { Router } from 'express';

import questionController from '../controllers/questions.controller';

const router = Router();

router.post('/', questionController.addQuestion);

export default router;
