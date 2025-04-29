'use client'
import React, { useState } from 'react'
import styles from './LeaveRequestsPageContent.module.css'
import RequestsStatusCard from './components/RequestsStatusCard';
import LeaveRequestsChart from './components/LeaveRequestsChart';
import EmployeeSearchInput from './components/EmployeeSearchInput'

const LeaveRequestsPageContent = () => {
    const [currentTab,setCurrentTab] = useState<'Requests' | 'History'>('Requests');

    function handleTabChange(tab: 'Requests' | 'History'){
        setCurrentTab(tab);
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
        </div>
    </section>
  )
}

export default LeaveRequestsPageContent