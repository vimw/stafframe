'use client'
import React, { useState } from 'react'
import styles from './LeaveRequestsPageContent.module.css'
import RequestsStatusCard from './components/RequestsStatusCard';
import LeaveRequestsChart from './components/LeaveRequestsChart';
import EmployeeSearchInput from './components/EmployeeSearchInput'
import LeaveTypeSelect from './components/LeaveTypeSelect';
import LeaveRequestsTable from './components/LeaveRequestsTable';
import LeaveRequestsTableNavigation from './components/LeaveRequestsTableNavigation';

interface LeaveRequest {
    id: number
    employeeName: string
    leaveType: 'Annual Leave' | 'Sick Leave'
    startDate: string
    endDate: string
    status: 'Pending' | 'Approved' | 'Rejected'
}

const LeaveRequestsPageContent = () => {
    const [currentTab,setCurrentTab] = useState<'Requests' | 'History'>('Requests');
    const [currentPage,setCurrentPage] = useState<number>(1)
    // Number of table rows displayed per page
    const pageSize = 6;


    const leaveRequests: LeaveRequest[] = [
        {
            id: 1,
            employeeName: 'Jan Nowak',
            leaveType: 'Sick Leave',
            startDate: '2020-03-23',
            endDate: '2020-03-25',
            status: 'Pending',
        },
        {
            id: 2,
            employeeName: 'Anna Kowalska',
            leaveType: 'Annual Leave',
            startDate: '2020-04-10',
            endDate: '2020-04-20',
            status: 'Approved',
        },
        {
            id: 3,
            employeeName: 'Piotr Zieliński',
            leaveType: 'Sick Leave',
            startDate: '2020-05-01',
            endDate: '2020-05-03',
            status: 'Rejected',
        },
        {
            id: 4,
            employeeName: 'Maria Wiśniewska',
            leaveType: 'Annual Leave',
            startDate: '2020-06-15',
            endDate: '2020-06-30',
            status: 'Approved',
        },
        {
            id: 5,
            employeeName: 'Tomasz Kaczmarek',
            leaveType: 'Sick Leave',
            startDate: '2020-07-05',
            endDate: '2020-07-08',
            status: 'Pending',
        },
        {
            id: 6,
            employeeName: 'Katarzyna Wójcik',
            leaveType: 'Annual Leave',
            startDate: '2020-08-12',
            endDate: '2020-08-25',
            status: 'Rejected',
        },
        {
            id: 7,
            employeeName: 'Michał Lewandowski',
            leaveType: 'Sick Leave',
            startDate: '2020-09-01',
            endDate: '2020-09-03',
            status: 'Approved',
        },
        {
            id: 8,
            employeeName: 'Natalia Kamińska',
            leaveType: 'Annual Leave',
            startDate: '2020-10-10',
            endDate: '2020-10-20',
            status: 'Rejected',
        },
        {
            id: 9,
            employeeName: 'Adam Nowicki',
            leaveType: 'Sick Leave',
            startDate: '2020-11-04',
            endDate: '2020-11-06',
            status: 'Pending',
        },
        {
            id: 10,
            employeeName: 'Ewa Mazur',
            leaveType: 'Annual Leave',
            startDate: '2020-12-01',
            endDate: '2020-12-10',
            status: 'Approved',
        },
        {
            id: 11,
            employeeName: 'Kamil Dąbrowski',
            leaveType: 'Sick Leave',
            startDate: '2021-01-15',
            endDate: '2021-01-17',
            status: 'Pending',
        },
        {
            id: 12,
            employeeName: 'Agnieszka Piotrowska',
            leaveType: 'Annual Leave',
            startDate: '2021-02-05',
            endDate: '2021-02-15',
            status: 'Approved',
        },
    ]

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, leaveRequests.length);

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage * pageSize >= leaveRequests.length;

    let currentTableData = leaveRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    function handleTabChange(tab: 'Requests' | 'History'){
        setCurrentTab(tab);
    }

    function handleNextPageClick() {
        setCurrentPage(currentPage+1)
    }
    function handlePreviousPageClick() {
        setCurrentPage(currentPage-1)
    }

    
  return (
    <section className={styles.container}>
        <div className={styles.headerAndStats}>
            <div className={styles.headerAndStatsContent}>
                <div className={styles.links}>
                    <h2
                        className={`${currentTab==='Requests' ? styles.active : ''}`}
                        onClick={() => handleTabChange('Requests')}
                    >
                        Requests
                    </h2>
                    <h2 
                        className={`${currentTab==='History' ? styles.active : ''}`}
                        onClick={() => handleTabChange('History')}
                    >
                        History
                    </h2>
                </div>
                <div className={styles.stats}>
                    <div className={styles.charts}>
                        <LeaveRequestsChart title="Weekly Leave Requests Overview" dataValues={[1,3,6,8,3,1,7]} labels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}/>
                        <LeaveRequestsChart title="Monthly Leave Requests Overview" dataValues={[1,3,6,8,3,1,7,9,3,6,2,32]} labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']}/>
                    </div>
                    <div className={styles.requestsStatusCards}>
                        <RequestsStatusCard status="Approved" count={3} icon='/approve_circle.svg'/>
                        <RequestsStatusCard status="Declined" count={2} icon='/decline_circle.svg'/>
                        <RequestsStatusCard status="Pending" count={7} icon='/pending_circle.svg'/>
                        <RequestsStatusCard status="Requests" count={12} icon='/requests_circle.svg'/>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.leaveRequests}>
            <h3>Leave Requests</h3>
            <div className={styles.leaveRequestsFilters}>
                <EmployeeSearchInput/>
                <LeaveTypeSelect leaveTypes={
                    [
                        {
                            label: 'Annual Leave',
                            value: 'Annual Leave'
                        },
                        {
                            label: 'Sick Leave',
                            value: 'Sick Leave'                            
                        }
                    ]
                }/>
            </div>
            <div className={styles.leaveRequestsTableNavigation}>
                <LeaveRequestsTableNavigation handlePreviousPageClick={handlePreviousPageClick} handleNextPageClick={handleNextPageClick} leaveRequestsCount={leaveRequests.length} startItem={startItem} endItem={endItem} isPreviousDisabled={isPreviousDisabled} isNextDisabled={isNextDisabled}/>
            </div>
            <div className={styles.leaveRequestsTable}>
                <LeaveRequestsTable
                    header={['Employee Name','Leave Type','Start Date','End Date','Status','View','Edit/Archive']}
                    data={currentTableData}
                />
            </div>
        </div>
    </section>
  )
}

export default LeaveRequestsPageContent