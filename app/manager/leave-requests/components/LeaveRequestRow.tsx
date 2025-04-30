import React from 'react'
import styles from './LeaveRequestsTable.module.css';
import Link from 'next/link'
import {ExportOutlined, EditOutlined,FolderOutlined} from '@ant-design/icons';

interface LeaveRequestRow{
  leaveRequest: {
    id: number;
    employeeName: string;
    leaveType: 'Annual Leave' | 'Sick Leave';
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Archived';
  }
  columnCount: number
}

const LeaveRequestRow = ({leaveRequest,columnCount}: LeaveRequestRow) => {
  return (
    <tr key={leaveRequest.id} className={styles.row}>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{leaveRequest.employeeName}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{leaveRequest.leaveType}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{leaveRequest.startDate}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{leaveRequest.endDate}</td>
      <td className={`${styles.td} ${styles[leaveRequest.status.toLowerCase()]}`}>
        <span className={styles.statusDot}></span>
        {leaveRequest.status}
      </td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>
        <Link href={`/manager/leave-requests/${leaveRequest.id}`}><ExportOutlined /></Link>
      </td>
      {leaveRequest.status === 'Pending' ? (
        <td style={{ width: `${100 / columnCount}%` }} className={`${styles.td} ${styles.editArchive}`}>
          <Link href={`/manager/leave-requests/${leaveRequest.id}`}>
            <EditOutlined/>
          </Link>
          <button>
            <FolderOutlined />
          </button>
        </td>
      ): <td style={{ width: `${100 / columnCount}%` }} className={styles.td}></td>}
    </tr>
  )
}

export default LeaveRequestRow