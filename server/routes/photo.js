import { Router } from 'express';
import photoController from '../controllers/photo.js';

const router = Router();

router.post('/upload', photoController.uploadPhoto);

export default router;