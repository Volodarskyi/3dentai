import mongoose, { Model, Schema } from 'mongoose';
import { IScan, IScanQuestion } from '@/types/interfaces/ScanInterfaces';
import { EScanStatus } from '@/types/enums/ScanEnums';
import { EQuestionType } from '@/types/enums/QuestionEnums';

const AnswerSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const ScanQuestionSchema = new Schema<IScanQuestion>(
  {
    type: { type: String, enum: Object.values(EQuestionType), required: true },
    value: { type: String, required: true },
    options: { type: [AnswerSchema], required: true },
    answer: { type: [String], required: true },
  },
  { _id: false },
);

const ScanSchema: Schema = new Schema<IScan>(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photos: { type: [String], default: [] },
    ai_answer: { type: String, required: false },
    status: {
      type: String,
      enum: Object.values(EScanStatus),
      default: EScanStatus.DRAFT,
      required: true,
    },
    message_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
    questions: { type: [ScanQuestionSchema], default: [] },

    createdTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' } },
);

export const Scan: Model<IScan> = mongoose.model<IScan>('Scan', ScanSchema);
