import React from 'react'
import styles from './EmployeeInfo.module.css'
import Image from 'next/image'


const EmployeeInfo = () => {
  return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h2>Employee Information</h2>
        </div>
        <div className={styles.employeeInfoCentered}>
          <Image
            src="/profile_picture.jpg"
            width={100}
            height={100}
            alt="Profile Picture"
          />
          <h3>Tomasz Nowak</h3>
          <span>Senior Developer</span>
        </div>
        <div className={styles.rowWrapper}>
          <div className={styles.row}>
            <span className={styles.label}>Department:</span>
            <span>Engineering</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email:</span>
            <span>tomasz.nowak@stafframe.com</span>
          </div>
        </div>
      </div>
  )
}

export default EmployeeInfo