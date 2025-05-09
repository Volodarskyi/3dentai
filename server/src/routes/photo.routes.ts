import { Router } from 'express';
import photoController from '../controllers/photo.controller';

const router = Router();

router.post('/upload', photoController.uploadPhoto);
// @ts-ignore
router.post('/uploads3', photoController.uploadPhotoS3);
router.get("/folders", photoController.listFoldersS3);
router.get("/files", photoController.listFilesInFolderS3);

export default router;
