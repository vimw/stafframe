import React from 'react'
import styles from './LeaveRequestsTable.module.css'
import LeaveRequestRow from './LeaveRequestRow'


interface LeaveRequests{
    id: number
    employeeName: string
    leaveType: 'Annual Leave' | 'Sick Leave'
    startDate: string
    endDate: string
    status: 'Pending' | 'Approved' | 'Rejected' | 'Archived'
}

interface LeaveRequestsTableProps{
    header: string[]
    data: LeaveRequests[]
}

const LeaveRequestsTable = ({header,data}: LeaveRequestsTableProps) => {
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
            <LeaveRequestRow key={leaveRequest.id} leaveRequest={leaveRequest} columnCount={data.length}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveRequestsTable