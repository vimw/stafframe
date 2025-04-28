'use client'
import React, { useState } from 'react'
import styles from './LeaveRequestsPageContent.module.css'
import RequestsStatusCard from './components/RequestsStatusCard';

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
                    <div className={styles.charts}>f</div>
                    <div className={styles.requestsStatusCards}>
                        <RequestsStatusCard status="Approved" count={3} icon='/approve_circle.svg'/>
                        <RequestsStatusCard status="Declined" count={2} icon='/decline_circle.svg'/>
                        <RequestsStatusCard status="Pending" count={7} icon='/pending_circle.svg'/>
                        <RequestsStatusCard status="Requests" count={12} icon='/requests_circle.svg'/>

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LeaveRequestsPageContent