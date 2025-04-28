import mongoose, { Model, Schema } from 'mongoose';
import {
  IMessage,
  IMessageContent,
} from '@/types/interfaces/MessageInterfaces';

const MessageContentSchema = new Schema<IMessageContent>(
  {
    user_id: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false },
);

const MessageSchema: Schema = new Schema<IMessage>(
  {
    messages: { type: [MessageContentSchema], default: [] },

    // Timestamps
    createdTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' } },
);

export const Message: Model<IMessage> = mongoose.model<IMessage>(
  'Message',
  MessageSchema,
);
