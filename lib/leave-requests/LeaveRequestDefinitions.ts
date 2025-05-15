interface leaveRequestI {
    id: number,
    userId: number,
    leaveType: string,
    startDate: string,
    endDate: string,
    status: string
}

export type { leaveRequestI };