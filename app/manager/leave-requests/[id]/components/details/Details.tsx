import React from 'react'
import styles from './Details.module.css'

const Details = () => {
    const leaveRequest = {
        type: 'Annual',
        startDate: '2025-05-10',
        endDate: '2025-05-15',
        days: 5,
        leaveBalance: {
          annual: 8,
          sick: 4,
          personal: 2,
        },
      };
  return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h2>Request Information</h2>
            <div className={styles.pending}>Pending</div>
        </div>
        <p className={styles.metaText}>Request #7 • Submitted on 2025-05-09</p>
        <div className={styles.sectionWrapper}>
          <div className={styles.section}>
            <h3 className={styles.heading}>Leave Details</h3>
            <div className={styles.row}>
              <span className={styles.label}>Leave Type:</span>
              <span>{leaveRequest.type}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Start Date:</span>
              <span>{leaveRequest.startDate}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>End Date:</span>
              <span>{leaveRequest.endDate}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Total Days:</span>
              <span>{leaveRequest.days} working days</span>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.heading}>Leave Balance</h3>
            <div className={styles.row}>
              <span className={styles.label}>Annual Leave:</span>
              <span>{leaveRequest.leaveBalance.annual} days remaining</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Sick Leave:</span>
              <span>{leaveRequest.leaveBalance.sick} days remaining</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Personal Leave:</span>
              <span>{leaveRequest.leaveBalance.personal} days remaining</span>
            </div>
          </div>
        </div>
        <div className={styles.seperator}></div>
        <h3 className={styles.heading}>Reason for Leave</h3>
        <div className={`${styles.row} ${styles.reason}`}>
          <span>Medical appointment and recovery</span>
        </div>
      </div>
  )
}

export default Details