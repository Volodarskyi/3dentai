import mongoose, { Model, Schema } from 'mongoose';
import { IScan } from '@/types/interfaces/ScanInterfaces';
import { EScanStatus } from '@/types/enums/ScanEnums';

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

    createdTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' } },
);

export const Scan: Model<IScan> = mongoose.model<IScan>('Scan', ScanSchema);
