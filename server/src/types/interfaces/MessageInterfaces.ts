import { Document } from 'mongoose';

export interface IMessageContent {
  user_id: string;
  date: string;
  message: string;
}

export interface IMessage extends Document {
  id?: string;
  messages: IMessageContent[];
  createdTime?: Date;
  updateTime?: Date;
}