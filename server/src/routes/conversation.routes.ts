import { Router } from "express";
import conversationController from "@/controllers/conversation.controller";

const router = Router();

// 1️⃣ Get conversation by scanId
router.get("/scan/:scanId", conversationController.getByScanId);

// 2️⃣ Create or upsert conversation
router.post("/init", conversationController.initConversation);

// 3️⃣ Mark as read (for current user)
router.patch("/read", conversationController.markAsRead);

// 4️⃣ Get inbox for current doctor
router.get("/inbox", conversationController.getInbox);

export default router;
