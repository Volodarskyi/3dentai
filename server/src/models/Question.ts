import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: Boolean, default: false },
});

export const QuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["checkbox", "radio"],
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [AnswerSchema],
        required: true,
        validate: [(arr: { label: string; value: boolean }[]) => arr.length > 0, "At least one answer is required"],
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

export const Question = mongoose.model("Question", QuestionSchema);
