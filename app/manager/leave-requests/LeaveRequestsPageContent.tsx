'use client'
import React, { useState } from 'react'
import styles from './LeaveRequestsPageContent.module.css'

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
            </div>
        </div>
    </section>
  )
}

export default LeaveRequestsPageContent