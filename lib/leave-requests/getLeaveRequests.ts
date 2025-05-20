import { connectDB } from "../db/db";
import { fullLeaveRequestI, leaveRequestI } from "./LeaveRequestDefinitions";
import { LeaveRequestModel, ArchiveLeaveRequestModel } from "@/models/LeaveRequest";
import { getUsernamesByIds } from "../users/getUsers";

async function getLeaveRequests() {
    await connectDB();
    const leaveRequests = await LeaveRequestModel.find({}).lean().exec();

    leaveRequests.forEach((el) => {
        el._id = (el._id as any).toString();
        el.userId = el.userId.toString();
    });

    // console.log(leaveRequests);

    const enrichedLeaveRequests = await enrichLeaveRequests(leaveRequests);

    // console.log(enrichedLeaveRequests);

    return enrichedLeaveRequests as fullLeaveRequestI[];
}

async function getArchivedLeaveRequests() {
    await connectDB();
    const archivedLeaveRequests = await ArchiveLeaveRequestModel.find({}).exec();

    archivedLeaveRequests.forEach((el) => {
        el._id = (el._id as any).toString();
        el.userId = el.userId.toString();
    });

    const enrichedLeaveRequests = await enrichLeaveRequests(archivedLeaveRequests);

    return enrichedLeaveRequests as fullLeaveRequestI[];
}

async function enrichLeaveRequests(leaveRequests: any[]) {
    const users = getDistinctUsers(leaveRequests);

    const usernames = await getUsernames(users);

    console.log(usernames)

    leaveRequests.forEach(el => {
        el.name = usernames.get(el.userId);
    });

    return leaveRequests;
}

function getDistinctUsers(leaveRequests: leaveRequestI[]): string[]{
    const m = new Set();

    leaveRequests.forEach((el) => {
        m.add(el.userId)
    });

    return [...m] as string[];
}

async function getUsernames(users: string[]){
    const usernames = await getUsernamesByIds(users);

    

    return usernames;
}

export { getLeaveRequests, getArchivedLeaveRequests };