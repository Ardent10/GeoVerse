import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  score: number;
  correct: number;
  incorrect: number;
  invited: boolean;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    invited: {
      type: Boolean,
      required: true,
      default: false,
    },
    score: {
      type: Number,
      required: false,
    },
    correct: {
      type: Number,
      required: false,
      default: 0,
    },
    incorrect: {
      type: Number,
      required: false,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
