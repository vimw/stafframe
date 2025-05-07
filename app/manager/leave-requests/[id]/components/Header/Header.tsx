import Link from 'next/link'
import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './Header.module.css'


const header = () => {
  return (
    <div className={styles.headerContainer}>
        <Link href='/manager/leave-requests'><ArrowLeftOutlined />Back to Leave Requests</Link>
        <h1>Leave Request Details</h1>
        <p>Review request details and take action</p>
    </div>
  )
}

export default header