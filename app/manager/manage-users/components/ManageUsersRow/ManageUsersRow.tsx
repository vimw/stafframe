import React from 'react'
import styles from "../ManageUsersTable/ManageUsersTable.module.css";
import ActionButton from '../ActionButton/ActionButton';

interface ManageUserRowProps{
  user: {
    id: string;
    name: string
    email: string,
    department:string,
    position: string,
  }
  columnCount: number
}

const LeaveRequestRow = ({user,columnCount}: ManageUserRowProps) => {
  return (
    <tr key={user.id} className={styles.row}>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{user.name}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{user.email}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{user.department}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={styles.td}>{user.position}</td>
      <td style={{ width: `${100 / columnCount}%` }} className={`${styles.td} ${styles.actionButtons}`}>
        <ActionButton action='Edit'/>
        <ActionButton action='Delete'/>
      </td>
    </tr>
  )
}

export default LeaveRequestRow