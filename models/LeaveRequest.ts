import mongoose, { Schema } from "mongoose";

const leaveRequestSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const LeaveRequestModel = mongoose.models.LeaveRequest || mongoose.model("LeaveRequest", leaveRequestSchema, "leave-requests");

const ArchiveLeaveRequestModel = mongoose.models.ArchiveLeaveRequest || mongoose.model("ArchiveLeaveRequest", leaveRequestSchema, "archive_leave-requests");

export { LeaveRequestModel, ArchiveLeaveRequestModel };