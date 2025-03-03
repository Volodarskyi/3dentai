import { Document } from 'mongoose';
import {EUserRole} from "../enums/UserEnums";

export interface IAuth {
    password: string;
    refreshTokenHash?: string;
    expireRefreshToken?: Date;
}

export interface IUser extends Document {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    role: EUserRole;
    auth: IAuth;
    createdTime: Date;
    updateTime: Date;
}
