import { Router } from 'express';
import PhotoController from "../controllers/photo-contr.js";

const router = Router();

// 'api/photo/upload'
router.post('/upload', PhotoController.uploadPhoto);

export default router;
