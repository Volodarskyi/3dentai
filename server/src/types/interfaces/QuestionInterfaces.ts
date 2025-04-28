import { Document } from 'mongoose';
import { EQuestionType } from '../enums/QuestionEnums';

export interface IAnswer {
  id?: string;
  label: string;
  value: boolean | string | number;
}

export interface IQuestion extends Document {
  id?: string;
  type: EQuestionType;
  value: string;
  answers: IAnswer[];
  active: boolean;
  createdTime: Date;
  updateTime: Date;
}
