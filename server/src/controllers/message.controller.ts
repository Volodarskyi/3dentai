import { Request, Response, NextFunction } from "express";
import { Message } from "@/models/Message";
import { AppError } from "@/utils/errorUtils";
import { sendResSuccess } from "@/utils/responseUtils";
import mongoose from "mongoose";
import {Scan} from "@/models/Scan";
import {Conversation} from "@/models/Conversation";
import {EUserRole} from "@/types/enums/UserEnums";

// POST /api/message/send
const send = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { scanId, message } = req.body;
        const sender = req.user;

        console.log('[API] | [/api/messages/send] | [req.body] :', req.body);
        console.log('[API] | [/api/messages/:scanId] | [req.user] :', req.user);

        if (!sender) {
            throw new AppError("Unauthorized: Missing data", 401);
        }

        if (!scanId || !message || typeof message !== "string") {
            throw new AppError("Missing required fields: scanId or message", 400);
        }

        if (!mongoose.Types.ObjectId.isValid(scanId)) {
            throw new AppError("Invalid scanId format", 400);
        }

        // ✅ exist conversation
        const conversation = await Conversation.findOne({ scanId });
        if (!conversation) {
            throw new AppError("Conversation not found. Cannot send message.", 404);
        }

        // ✅ create message
        const newMessage = await Message.create({
            scanId,
            senderId: sender.userId,
            senderRole: sender.role,
            message,
            read: false,
        });

        // ✅ Обновление счетчиков
        const updateFields: any = {
            lastMessageAt: new Date(),
        };

        if (sender.role === EUserRole.USER) {
            updateFields.$inc = { unreadCountForDoctor: 1 };
        } else if (sender.role === EUserRole.DENTIST) {
            updateFields.$inc = { unreadCountForUser: 1 };
        }

        await Conversation.updateOne({ scanId }, updateFields);

        sendResSuccess(res, "Message sent successfully", { message: newMessage });
    } catch (error) {
        console.error("[Message Create Error]:", error);
        next(error);
    }
};

// GET /messages/:scanId
const getMessagesByScanId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {scanId} = req.params;
        const currentUser = req.user;

        console.log('[API] | [/api/messages/:scanId] | [req.params] :', req.params);
        console.log('[API] | [/api/messages/:scanId] | [req.user] :', req.user);

        if (!currentUser) {
            throw new AppError("Unauthorized: Missing data", 401);
        }

        if (!mongoose.Types.ObjectId.isValid(scanId)) {
            throw new AppError("Invalid scan ID format", 400);
        }

        // Check access: user must be doctor or patient of this scan
        const scan = await Scan.findById(scanId);
        if (!scan) {
            throw new AppError("Scan not found", 404);
        }

        const isAllowed =
            scan.userId.toString() === currentUser.userId ||
            scan.doctorId.toString() === currentUser.userId;

        if (!isAllowed) {
            throw new AppError("Access denied: You are not part of this scan", 403);
        }

        const messages = await Message.find({scanId})
            .sort({createdAt: 1}); // oldest → newest

        sendResSuccess(res, `Messages belong scan with ID:${scanId}`, {scanMessages:messages});
    } catch (error) {
        console.error("[Message GetByScanId Error]:", error);
        next(error);
    }
}

export default {
    send,
    getMessagesByScanId,
}
