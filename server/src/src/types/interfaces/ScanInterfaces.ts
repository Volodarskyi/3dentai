import { Document, Types } from 'mongoose';
import { EScanStatus } from '../enums/ScanEnums';

export interface IScan extends Document {
  id?: string;
  doctor_id: Types.ObjectId;
  user_id: Types.ObjectId;
  photos: string[];
  ai_answer: string;
  status: EScanStatus;
  message_id: Types.ObjectId;
  createdTime?: Date;
  updateTime?: Date;
}
