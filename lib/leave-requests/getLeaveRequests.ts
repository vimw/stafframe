import { connectDB } from "../db/db";
import { fullLeaveRequestI, leaveRequestI } from "./LeaveRequestDefinitions";
import { LeaveRequestModel, ArchiveLeaveRequestModel } from "@/models/LeaveRequest";
import { getUsernameById } from "../users/getUsers";

async function getLeaveRequests() {
    await connectDB();
    const leaveRequests = await LeaveRequestModel.find({}).exec();

    const enrichedLeaveRequests = await enrichLeaveRequests(leaveRequests as leaveRequestI[]);

    return enrichedLeaveRequests as fullLeaveRequestI[];
}

async function getArchivedLeaveRequests() {
    await connectDB();
    const archivedLeaveRequests = await ArchiveLeaveRequestModel.find({}).exec();

    const enrichedLeaveRequests = await enrichLeaveRequests(archivedLeaveRequests as leaveRequestI[]);

    return enrichedLeaveRequests as fullLeaveRequestI[];
}

async function enrichLeaveRequests(leaveRequests: leaveRequestI[]) {
    const enrichedRequests = leaveRequests.map(async (obj) => {
        const userIdString = typeof obj.userId === 'string'
        ? obj.userId
        : obj.userId.toString();

        let nameValue: string | null = null;

        try {
            const userInfo = await getUsernameById(userIdString);
            if (userInfo) {
                nameValue = (userInfo as any).name; // Assign the username string to nameValue
            }
        } catch (error) {
            console.error(`Error fetching username for userId ${userIdString}:`);
        }

        return {
            ...obj,
            name: nameValue,
        } as fullLeaveRequestI;
    });

    const enriched = await Promise.all(enrichedRequests);
    return enriched;
}

export { getLeaveRequests, getArchivedLeaveRequests };