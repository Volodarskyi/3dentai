import { Document, Types } from 'mongoose';
import { EScanStatus } from '../enums/ScanEnums';
import { EQuestionType } from '../enums/QuestionEnums';
import { IAnswer } from './QuestionInterfaces';

export interface IScanQuestion {
  type: EQuestionType;
  value: string;
  options: IAnswer[];
  answer: string[];
}

export interface IScan extends Document {
  id?: string;
  doctor_id: Types.ObjectId;
  user_id: Types.ObjectId;
  photos: string[];
  ai_answer: string;
  status: EScanStatus;
  message_id: Types.ObjectId;
  questions?: IScanQuestion[];
  createdTime?: Date;
  updateTime?: Date;
}
