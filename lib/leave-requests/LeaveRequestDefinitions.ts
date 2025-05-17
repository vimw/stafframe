interface leaveRequestI {
    _id: any,
    userId: any,
    leaveType: string,
    startDate: string,
    endDate: string,
    status: string
}

interface fullLeaveRequestI extends leaveRequestI {
    name: string | null
}

export type { leaveRequestI, fullLeaveRequestI };