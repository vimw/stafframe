interface LeaveRequest {
    id: number
    employeeName: string
    leaveType: 'Annual Leave' | 'Sick Leave'
    startDate: string
    endDate: string
    status: 'Pending' | 'Approved' | 'Rejected'
}

interface PaginatedLeaveRequestsResponse {
    paginatedLeaveRequests: LeaveRequest[];
    totalCount: number;
}

export  async function fetchActiveLeaveRequests(employees:string[],leaveTypes: string[],currentPage:number,pageSize:number):Promise<PaginatedLeaveRequestsResponse> {
    const employeeParams:string = employees.map((employee) => `employee=${encodeURIComponent(employee)}`).join('&')
    const leaveTypesParams:string = leaveTypes.map((leaveType) => `leaveType=${encodeURIComponent(leaveType)}`).join('&')
    const url:string = `/api/leaveRequests?${employeeParams}&${leaveTypesParams}&page=${currentPage}&pageSize=${pageSize}`

    try {
        const response: Response = await fetch(url);
        const data = await response.json()
        return {
            paginatedLeaveRequests: data.paginatedLeaveRequests,
            totalCount: data.totalCount
        }
    } catch (error) {
        console.error('Failed to fetch leave requests',error)
    }

    return {
        paginatedLeaveRequests: [],
        totalCount: 0
    }
}
