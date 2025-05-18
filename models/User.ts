import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  joinDate: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  leaveBalance: {
    annual: { type: Number, default: 15 },
    sick: { type: Number, default: 10 },
    personal: { type: Number, default: 3 }
  },
  role: {
    type: String,
    enum: ['user','manager'],
    default: 'user'
  }
  
});

const User = models.User || model("User", userSchema);
export default User;
