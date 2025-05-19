import mongoose, { Schema } from "mongoose";

const leaveBalanceSchema = new Schema({
    annual: {
        type: Number,
        required: true
    },
    sick: {
        type: Number,
        required: true
    },
    personal: {
        type: Number,
        required: true
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    leaveBalance: {
        type: leaveBalanceSchema,
        required: true
    }
});

const FullUserModel = mongoose.models.FullUser || mongoose.model("FullUser", userSchema, "users");

export { FullUserModel };