import { Document, Types } from 'mongoose';
import { EUserRole } from '../enums/UserEnums';

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

    // 🔹 Self-reference to another user (doctor)
    doctorId?: Types.ObjectId;

    auth: IAuth;
    createdTime: Date;
    updateTime: Date;
}

export interface IUserTokenData {
    userId: string,
    firstName: string,
    lastName: string,
    role: string,
}
