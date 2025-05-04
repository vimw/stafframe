'use client'
import React, { useEffect, useState } from 'react'
import styles from './LeaveRequestsPageContent.module.css'
import RequestsStatusCard from './components/RequestsStatusCard/RequestsStatusCard';
import LeaveRequestsChart from './components/LeaveRequestsChart/LeaveRequestsChart';
import EmployeeSearchInput from './components/EmployeeSearchInput/EmployeeSearchInput'
import LeaveTypeSelect from './components/LeaveTypeSelect/LeaveTypeSelect';
import LeaveRequestsTable from './components/LeaveRequestsTable/LeaveRequestsTable';
import LeaveRequestsTableNavigation from './components/LeaveRequestsTableNavigation/LeaveRequestsTableNavigation';
import { fetchActiveLeaveRequests } from './lib/api/leaves';
import LeaveRequestsTableSkeleton from './components/LeaveRequestsTableSkeleton/LeaveRequestsTableSkeleton';

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
    const [loading,setLoading] = useState(true);
    const [filteredLeaveTypes,setFilteredLeaveTypes] = useState<string[]>([])
    const [filteredEmployees,setFilteredEmployees] = useState<string[]>([])
    const [activeLeaveRequests,setActiveLeaveRequests] = useState<LeaveRequest[][]>([])
    const [archivedLeaveRequests,setArchivedLeaveRequests] = useState<LeaveRequest[][]>([])
    const [activeLeaveRequestsCount,setActiveLeaveRequestsCount] = useState<number>(0)

    // Number of table rows displayed per page
    const pageSize = 6;


    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, activeLeaveRequestsCount);

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage * pageSize >= activeLeaveRequestsCount;


    function handleTabChange(tab: 'Requests' | 'History'){
        setCurrentTab(tab);
        setCurrentPage(1);
    }

    function handleNextPageClick() {
        setCurrentPage(currentPage+1)
    }
    function handlePreviousPageClick() {
        setCurrentPage(currentPage-1)
    }

    function handleFilterEmployees(users:string[]){
        setFilteredEmployees(users)
        if (currentTab === 'Requests'){
            setActiveLeaveRequests([])
        } else {
            setArchivedLeaveRequests([])
        }
        setCurrentPage(1)
    }

    function handleFilterLeaveTypes(leaveTypes:string[]){
        setFilteredLeaveTypes(leaveTypes)
        if (currentTab === 'Requests'){
            setActiveLeaveRequests([])
        } else {
            setArchivedLeaveRequests([])
        }
        setCurrentPage(1)
    }

    // fetch active leave requets
    useEffect(() => {
        if(activeLeaveRequests[currentPage-1]) return

        setLoading(true)
        const fetchData = async () => {
            const {paginatedLeaveRequests,totalCount} = await fetchActiveLeaveRequests(filteredEmployees,filteredLeaveTypes,currentPage,pageSize)
            setActiveLeaveRequests((prev) => [...prev,paginatedLeaveRequests])
            setActiveLeaveRequestsCount(totalCount)
            setLoading(false)
        }
        fetchData();
    },[currentPage,filteredEmployees,filteredLeaveTypes])

    
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
            {currentTab === 'Requests' ? (
                <h3>Leave Requests</h3>
            ): (
                <h3>Archived Leave Requests</h3>
            )}
            <div className={styles.leaveRequestsFilters}>
                <EmployeeSearchInput handleFilterEmployees={handleFilterEmployees}/>
                <LeaveTypeSelect 
                    leaveTypes={
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
                    }
                    handleFilterLeaveTypes={handleFilterLeaveTypes}
                />
            </div>
            <div className={styles.leaveRequestsTableNavigation}>
                <LeaveRequestsTableNavigation handlePreviousPageClick={handlePreviousPageClick} handleNextPageClick={handleNextPageClick} leaveRequestsCount={activeLeaveRequestsCount} startItem={startItem} endItem={endItem} isPreviousDisabled={isPreviousDisabled} isNextDisabled={isNextDisabled}/>
            </div>
            <div className={styles.leaveRequestsTable}>
                {currentTab==='Requests' ? (
                    loading || !activeLeaveRequests[currentPage-1] ? (
                        <LeaveRequestsTableSkeleton />
                    ) : (
                        <LeaveRequestsTable
                            header={['Employee Name','Leave Type','Start Date','End Date','Status','View','Edit/Archive']}
                            data={activeLeaveRequests[currentPage-1]}
                        />
                    )
                ): (
                    loading || !activeLeaveRequests[currentPage-1] ? (
                        <LeaveRequestsTableSkeleton />
                    ) : (
                        <LeaveRequestsTable
                            header={['Employee Name','Leave Type','Start Date','End Date','Status','View']}
                            data={archivedLeaveRequests[currentPage-1]}
                            mode='archive'
                        />
                    )
                )}
            </div>
        </div>
    </section>
  )
}

export default LeaveRequestsPageContent