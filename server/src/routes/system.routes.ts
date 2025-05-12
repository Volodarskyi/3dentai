import { Router } from 'express';
import systemController from "@/controllers/system.controller";

const router = Router();

router.get('/version', systemController.getServerVersion);

export default router;
