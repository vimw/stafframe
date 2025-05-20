import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { LeaveRequestModel } from '@/models/LeaveRequest';
import User from '@/models/User';


export async function GET(request: Request) {
    try {
        await connectDB()
        const {searchParams} = new URL(request.url)
        const employees = searchParams.getAll('employee')?.map((e) => parseInt(e)) || '';
        const leaveTypes = searchParams.getAll('leaveType')?.map((lt) => lt.toLowerCase()) || '';
        const currentPage = parseInt(searchParams.get('page') || '1',10)
        const pageSize = parseInt(searchParams.get('pageSize') || '1',10)
        const status = searchParams.get('status') || 'active'

        const query:any = {}
    
        if(employees.length > 0){
            query.userId = {$in: employees}
        }

        if (leaveTypes.length > 0) {
            query.leaveType = {
                $in: leaveTypes.map((lt) =>
                lt
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                ),
            };
        }

        if (status === 'active') {
            query.status = { $ne: 'Archived' };
        } else if (status === 'archived') {
            query.status = 'Archived';
        }

        const totalCount = await LeaveRequestModel.countDocuments(query);
        const leaveRequestsFromDB = await LeaveRequestModel.find(query)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .lean();


        const leaveRequestsFormatted = await Promise.all(leaveRequestsFromDB.map(async (leaveRequest) => {
            const user = await User.findById(leaveRequest.userId).select('name').lean() as {name? : string} | null;

            return {
                id: leaveRequest._id,
                employeeName: user?.name || 'Unknown',
                employeeId: leaveRequest.userId,
                leaveType: leaveRequest.leaveType,
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate,
                status: leaveRequest.status
            }
        })
        ) 
        console.log(leaveRequestsFormatted)

        return NextResponse.json({
            paginatedLeaveRequests: leaveRequestsFormatted,
            totalCount,
        });

    } catch (error) {
        console.error('Error fetching leave requests:', error);
        return NextResponse.json({ paginatedLeaveRequests: [], totalCount: 0 });
    }
}
