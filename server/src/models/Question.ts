import mongoose, { Model, Schema } from 'mongoose';
import { EQuestionType } from '@/types/enums/QuestionEnums';
import { IAnswer, IQuestion } from '@/types/interfaces/QuestionInterfaces';

const AnswerSchema = new Schema<IAnswer>(
  {
    id: { type: String },
    label: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const QuestionSchema: Schema = new Schema<IQuestion>(
  {
    type: { type: String, enum: Object.values(EQuestionType), required: true },
    value: { type: String, required: true },
    answers: { type: [AnswerSchema], required: true },
    active: { type: Boolean, default: true },

    // Timestamps
    createdTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' } },
);

export const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  'Question',
  QuestionSchema,
);
