import { NextResponse } from 'next/server';

const mockActiveLeaveRequests = [
    {
        id: 1,
        employeeName: 'Jan Nowak',
        employeeId: 2,
        leaveType: 'Sick Leave',
        startDate: '2020-03-23',
        endDate: '2020-03-25',
        status: 'Pending',
    },
    {
        id: 2,
        employeeName: 'Anna Kowalska',
        employeeId: 1,
        leaveType: 'Annual Leave',
        startDate: '2020-04-10',
        endDate: '2020-04-20',
        status: 'Approved',
    },
    {
        id: 3,
        employeeName: 'Piotr Zieliński',
        employeeId: 3,
        leaveType: 'Sick Leave',
        startDate: '2020-05-01',
        endDate: '2020-05-03',
        status: 'Rejected',
    },
    {
        id: 4,
        employeeName: 'Maria Wiśniewska',
        employeeId: 4,
        leaveType: 'Annual Leave',
        startDate: '2020-06-15',
        endDate: '2020-06-30',
        status: 'Approved',
    },
    {
        id: 5,
        employeeName: 'Tomasz Kaczmarek',
        employeeId: 5,
        leaveType: 'Sick Leave',
        startDate: '2020-07-05',
        endDate: '2020-07-08',
        status: 'Pending',
    },
    {
        id: 6,
        employeeName: 'Katarzyna Wójcik',
        employeeId: 6,
        leaveType: 'Annual Leave',
        startDate: '2020-08-12',
        endDate: '2020-08-25',
        status: 'Rejected',
    },
    {
        id: 7,
        employeeName: 'Michał Lewandowski',
        employeeId: 7,
        leaveType: 'Sick Leave',
        startDate: '2020-09-01',
        endDate: '2020-09-03',
        status: 'Approved',
    },
    {
        id: 8,
        employeeName: 'Natalia Kamińska',
        employeeId: 8,
        leaveType: 'Annual Leave',
        startDate: '2020-10-10',
        endDate: '2020-10-20',
        status: 'Rejected',
    },
    {
        id: 9,
        employeeName: 'Adam Nowicki',
        employeeId: 9,
        leaveType: 'Sick Leave',
        startDate: '2020-11-04',
        endDate: '2020-11-06',
        status: 'Pending',
    },
    {
        id: 10,
        employeeName: 'Ewa Mazur',
        employeeId: 10,
        leaveType: 'Annual Leave',
        startDate: '2020-12-01',
        endDate: '2020-12-10',
        status: 'Approved',
    },
    {
        id: 11,
        employeeName: 'Kamil Dąbrowski',
        employeeId: 11,
        leaveType: 'Sick Leave',
        startDate: '2021-01-15',
        endDate: '2021-01-17',
        status: 'Pending',
    },
    {
        id: 12,
        employeeName: 'Agnieszka Piotrowska',
        employeeId: 12,
        leaveType: 'Annual Leave',
        startDate: '2021-02-05',
        endDate: '2021-02-15',
        status: 'Approved',
    },
  
];

const mockArchivedLeaveRequests = [
    {
        id: 1,
        employeeName: 'Jan Nowak',
        employeeId: 2,
        leaveType: 'Sick Leave',
        startDate: '2020-03-23',
        endDate: '2020-03-25',
        status: 'Archived',
    },
    {
        id: 2,
        employeeName: 'Anna Kowalska',
        employeeId: 1,
        leaveType: 'Annual Leave',
        startDate: '2020-04-10',
        endDate: '2020-04-20',
        status: 'Archived',
    },
    {
        id: 3,
        employeeName: 'Piotr Zieliński',
        employeeId: 3,
        leaveType: 'Sick Leave',
        startDate: '2020-05-01',
        endDate: '2020-05-03',
        status: 'Archived',
    },
    {
        id: 4,
        employeeName: 'Maria Wiśniewska',
        employeeId: 4,
        leaveType: 'Annual Leave',
        startDate: '2020-06-15',
        endDate: '2020-06-30',
        status: 'Archived',
    },
    {
        id: 5,
        employeeName: 'Tomasz Kaczmarek',
        employeeId: 5,
        leaveType: 'Sick Leave',
        startDate: '2020-07-05',
        endDate: '2020-07-08',
        status: 'Archived',
    },
    {
        id: 6,
        employeeName: 'Katarzyna Wójcik',
        employeeId: 6,
        leaveType: 'Annual Leave',
        startDate: '2020-08-12',
        endDate: '2020-08-25',
        status: 'Archived',
    },
    {
        id: 7,
        employeeName: 'Michał Lewandowski',
        employeeId: 7,
        leaveType: 'Sick Leave',
        startDate: '2020-09-01',
        endDate: '2020-09-03',
        status: 'Archived',
    },
    {
        id: 8,
        employeeName: 'Natalia Kamińska',
        employeeId: 8,
        leaveType: 'Annual Leave',
        startDate: '2020-10-10',
        endDate: '2020-10-20',
        status: 'Archived',
    },
    {
        id: 9,
        employeeName: 'Adam Nowicki',
        employeeId: 9,
        leaveType: 'Sick Leave',
        startDate: '2020-11-04',
        endDate: '2020-11-06',
        status: 'Archived',
    },
    {
        id: 10,
        employeeName: 'Ewa Mazur',
        employeeId: 10,
        leaveType: 'Annual Leave',
        startDate: '2020-12-01',
        endDate: '2020-12-10',
        status: 'Archived',
    },
    {
        id: 11,
        employeeName: 'Kamil Dąbrowski',
        employeeId: 11,
        leaveType: 'Sick Leave',
        startDate: '2021-01-15',
        endDate: '2021-01-17',
        status: 'Archived',
    },
    {
        id: 12,
        employeeName: 'Agnieszka Piotrowska',
        employeeId: 12,
        leaveType: 'Annual Leave',
        startDate: '2021-02-05',
        endDate: '2021-02-15',
        status: 'Archived',
    },
  
];

interface data{
    id:number
    employeeName: string
    employeeId: number
    leaveType: string
    startDate: string
    endDate: string
    status: string
}

const paginateData = (data: data[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return data.slice(start, end);
  };

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const employees = searchParams.getAll('employee')?.map((e) => parseInt(e)) || '';
    const leaveTypes = searchParams.getAll('leaveType')?.map((lt) => lt.toLowerCase()) || '';
    const currentPage = parseInt(searchParams.get('page') || '1',10)
    const pageSize = parseInt(searchParams.get('pageSize') || '1',10)
    const status = searchParams.get('status') || 'active'

    let filteredLeaveRequests
    
    if(status === 'archived'){
        filteredLeaveRequests = mockArchivedLeaveRequests
    } else {
        
        filteredLeaveRequests = mockActiveLeaveRequests;
    }

    if (employees.length > 0){
        filteredLeaveRequests = filteredLeaveRequests.filter((leaveRequest) => 
            employees.includes(leaveRequest.employeeId)
        )
    }

    if(leaveTypes.length > 0){
        filteredLeaveRequests = filteredLeaveRequests.filter((leaveRequest) => 
            leaveTypes.includes(leaveRequest.leaveType.toLowerCase())
        )
    }

    const paginatedLeaveRequests = paginateData(filteredLeaveRequests, currentPage, pageSize);


    return NextResponse.json({
        paginatedLeaveRequests,
        totalCount: filteredLeaveRequests.length
    })
}