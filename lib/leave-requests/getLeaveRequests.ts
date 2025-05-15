import { connectDB } from "../db/db";
import { leaveRequestI } from "./LeaveRequestDefinitions";
import { LeaveRequestModel, ArchiveLeaveRequestModel } from "@/models/leaveRequestSchema";

async function getLeaveRequests() {
    await connectDB();
    const leaveRequests = await LeaveRequestModel.find({}).exec();

    return leaveRequests as leaveRequestI[];
}

async function getArchivedLeaveRequests() {
    await connectDB();
    const archivedLeaveRequests = await ArchiveLeaveRequestModel.find({}).exec();

    return archivedLeaveRequests as leaveRequestI[];
}

export { getLeaveRequests, getArchivedLeaveRequests };