import { Document, Types } from 'mongoose';
import { EQuestionType } from '../enums/QuestionEnums';
import { IAnswer } from './QuestionInterfaces';
import {EScanStatus} from "@/types/enums/ScanEnums";

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

export type ToothNumber =
    | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18"
    | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28"
    | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38"
    | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48";

export type ITeethMap = {
  [key in ToothNumber]: string;
};
