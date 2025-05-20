import React from 'react'
import styles from './LeaveRequestsTable.module.css'
import LeaveRequestRow from '../LeaveRequestRow/LeaveRequestRow'


interface LeaveRequests{
    id: string
    employeeName: string
    employeeId: string
    leaveType: 'Annual Leave' | 'Sick Leave'
    startDate: string
    endDate: string
    status: 'Pending' | 'Approved' | 'Rejected' | 'Archived'
}

interface LeaveRequestsTableProps{
    header: string[]
    data: LeaveRequests[]
    mode?: 'default' | 'archive'
}

const LeaveRequestsTable = ({header,data,mode}: LeaveRequestsTableProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {header.map((element, index) => (
              <th key={index} className={styles.th} style={{width: 100/header.length}}>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((leaveRequest) => (
            <LeaveRequestRow key={leaveRequest.id} leaveRequest={leaveRequest} columnCount={data.length} mode={mode}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveRequestsTable