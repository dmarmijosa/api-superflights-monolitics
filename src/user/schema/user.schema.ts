import mongoose from 'mongoose';
import { User } from '../../common/interfaces/user.interface';
export const UserSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.index({ username: 1, email: 1 }, { unique: true });
