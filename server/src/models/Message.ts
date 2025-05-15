import mongoose, { Schema, Document } from "mongoose";
import { EUserRole } from "@/types/enums/UserEnums";

export interface IMessage extends Document {
    scanId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    senderRole: EUserRole;
    message: string;
    read: boolean;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        scanId: {
            type: Schema.Types.ObjectId,
            ref: "Scan",
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        senderRole: {
            type: String,
            enum: [EUserRole.USER, EUserRole.DENTIST],
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
