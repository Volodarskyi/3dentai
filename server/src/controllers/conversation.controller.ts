import { Request, Response, NextFunction } from "express";
import { Conversation } from "@/models/Conversation";
import { AppError } from "@/utils/errorUtils";
import mongoose from "mongoose";
import { sendResSuccess } from "@/utils/responseUtils";

// 1️⃣ GET /conversations/scan/:scanId
export const getByScanId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { scanId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(scanId)) {
            throw new AppError("Invalid scan ID", 400);
        }

        const conversation = await Conversation.findOne({ scanId });

        if (!conversation) {
            throw new AppError("Conversation not found", 404);
        }

        sendResSuccess(res, "Conversation found", { conversation });
    } catch (error) {
        console.error('ERROR! /conversations/scan/:scanId ',error);
        next(error);
    }
};

// 2️⃣ POST /conversations/init
export const initConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { scanId, doctorId, userId } = req.body;
        console.log('[API] | [/api/conversations/init] | [req.body] :', req.body);

        if (!scanId || !doctorId || !userId) {
            throw new AppError("Missing required fields", 400);
        }

        const conversation = await Conversation.findOneAndUpdate(
            { scanId },
            {
                $set: {
                    scanId,
                    doctorId,
                    userId,
                    lastMessageAt: new Date()
                },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        sendResSuccess(res, "Conversation initialized", { conversation });
    } catch (error) {
        console.error('ERROR! /conversations/init',error);
        next(error);
    }
};

// 3️⃣ PATCH /conversations/read
export const markAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { scanId } = req.body;
        const user = req.user;

        if (!scanId || !user?.userId) {
            throw new AppError("Missing scanId or user data", 400);
        }

        const conversation = await Conversation.findOne({ scanId });
        if (!conversation) {
            throw new AppError("Conversation not found", 404);
        }

        // Reset unread count for the current user
        if (user.userId === conversation.userId.toString()) {
            conversation.unreadCountForUser = 0;
        } else if (user.userId === conversation.doctorId.toString()) {
            conversation.unreadCountForDoctor = 0;
        } else {
            throw new AppError("Access denied to this conversation", 403);
        }

        await conversation.save();
        sendResSuccess(res, "Unread count reset", { conversation });
    } catch (error) {
        console.error('ERROR! /conversations/read',error);
        next(error);
    }
};

// 4️⃣ GET /conversations/inbox
export const getInbox = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user;
        console.log('[API] | [/api/conversations/inbox] | [req.user] :', req.user);

        if (!user?.userId) {
            throw new AppError("Unauthorized", 401);
        }

        const inbox = await Conversation.find({ doctorId: user.userId })
            .sort({ lastMessageAt: -1 });

        sendResSuccess(res, "Inbox loaded", { inbox });
    } catch (error) {
        console.error('ERROR! conversations/inbox',error);
        next(error);
    }
};

export default {
    getByScanId,
    initConversation,
    markAsRead,
    getInbox,
};
