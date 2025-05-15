import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
    scanId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    unreadCountForDoctor: number;
    unreadCountForUser: number;
    lastMessageAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
    {
        scanId: {
            type: Schema.Types.ObjectId,
            ref: "Scan",
            required: true,
            unique: true, // 1:1 per scan
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        unreadCountForDoctor: {
            type: Number,
            default: 0,
        },
        unreadCountForUser: {
            type: Number,
            default: 0,
        },
        lastMessageAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const Conversation = mongoose.model<IConversation>(
    "Conversation",
    ConversationSchema
);
