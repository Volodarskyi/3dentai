import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, required: true },
  birthYear: { type: Number, required: true }, // Added birthYear as a number
});

export default model('User', UserSchema);
