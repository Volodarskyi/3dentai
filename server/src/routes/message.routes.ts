import { Router } from "express";
import messageController from "@/controllers/message.controller";
const router = Router();

// Auth is applied globally in index.ts
router.post("/send", messageController.send);
router.get("/:scanId", messageController.getMessagesByScanId);

export default router;
