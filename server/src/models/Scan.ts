import mongoose, { Schema, Document } from "mongoose";
import {EScanStatus} from "@/types/enums/ScanEnums";
import {QuestionSchema} from "@/models/Question";

export interface IScan extends Document {
    teeth: Record<string, string>;
    userId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    createdAt: Date;
    status: EScanStatus;
    questions: typeof QuestionSchema[];
    resultAI?: string;
}

// 🦷 default: "no image url"
const TeethSchema = new Schema(
    {
        "11": { type: String, required: false, default: "no image url" },
        "12": { type: String, required: false, default: "no image url" },
        "13": { type: String, required: false, default: "no image url" },
        "14": { type: String, required: false, default: "no image url" },
        "15": { type: String, required: false, default: "no image url" },
        "16": { type: String, required: false, default: "no image url" },
        "17": { type: String, required: false, default: "no image url" },
        "18": { type: String, required: false, default: "no image url" },

        "21": { type: String, required: false, default: "no image url" },
        "22": { type: String, required: false, default: "no image url" },
        "23": { type: String, required: false, default: "no image url" },
        "24": { type: String, required: false, default: "no image url" },
        "25": { type: String, required: false, default: "no image url" },
        "26": { type: String, required: false, default: "no image url" },
        "27": { type: String, required: false, default: "no image url" },
        "28": { type: String, required: false, default: "no image url" },

        "31": { type: String, required: false, default: "no image url" },
        "32": { type: String, required: false, default: "no image url" },
        "33": { type: String, required: false, default: "no image url" },
        "34": { type: String, required: false, default: "no image url" },
        "35": { type: String, required: false, default: "no image url" },
        "36": { type: String, required: false, default: "no image url" },
        "37": { type: String, required: false, default: "no image url" },
        "38": { type: String, required: false, default: "no image url" },

        "41": { type: String, required: false, default: "no image url" },
        "42": { type: String, required: false, default: "no image url" },
        "43": { type: String, required: false, default: "no image url" },
        "44": { type: String, required: false, default: "no image url" },
        "45": { type: String, required: false, default: "no image url" },
        "46": { type: String, required: false, default: "no image url" },
        "47": { type: String, required: false, default: "no image url" },
        "48": { type: String, required: false, default: "no image url" }
    },
    { _id: false }
);

// Scan
const ScanSchema = new Schema<IScan>({
    teeth: {
        type: TeethSchema,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: Object.values(EScanStatus),
        default: EScanStatus.IN_REVIEW,
    },
    questions: {
        type: [QuestionSchema],
        required: true,
    },
    resultAI: {
        type: String,
    },
});

export const Scan = mongoose.model<IScan>("Scan", ScanSchema);
