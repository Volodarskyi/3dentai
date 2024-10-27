import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, required: true },
    accessTo: [{ type: Types.ObjectId, ref: 'Question' }]
});

export default model('User', UserSchema);

