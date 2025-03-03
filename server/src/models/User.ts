import mongoose, {Model, Schema} from 'mongoose';
// @ts-ignore
import {EUserRole} from "../../types/enums/UserEnums";
// @ts-ignore
import {IAuth, IUser} from "../../types/interfaces/UserInterfaces";

// 🔹 Define the Authentication Sub-document Schema
const AuthSchema = new Schema<IAuth>(
    {
      password: { type: String, required: true, minlength: 8 },
      refreshTokenHash: { type: String, default: null },
      expireRefreshToken: { type: Date, default: null, index: { expireAfterSeconds: 0 } }
    },
    { _id: false } // Prevent creating a separate ObjectId for auth
);

const UserSchema: Schema = new Schema<IUser>(
    {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      phone: { type: String, required: true, unique: true, trim: true },
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      birthDate: { type: Date, required: true },
      role: { type: String, enum: Object.values(EUserRole), default: EUserRole.NEW_USER },

      // 🔹 Authentication Fields as a Sub-document
      auth: { type: AuthSchema, required: true },

      // 🔹 Timestamps
      createdTime: { type: Date, default: Date.now },
      updateTime: { type: Date, default: Date.now }
    },
    { timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' } }
);

// 🔹 Hide sensitive auth data in JSON responses
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.auth;
  return obj;
};

// export const User = mongoose.model('User', UserSchema);
export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
