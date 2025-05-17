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
    joinDate:string
  }
}

const LeaveRequestRow = ({user}: ManageUserRowProps) => {
  return (
    <tr key={user.id} className={styles.row}>
      <td className={styles.td}>{user.name}</td>
      <td className={styles.td}>{user.email}</td>
      <td className={styles.td}>{user.department}</td>
      <td className={styles.td}>{user.position}</td>
      <td className={styles.td}>{user.joinDate}</td>
      <td className={`${styles.td} ${styles.actionButtons}`}>
        <ActionButton action='Edit'/>
        <ActionButton action='Delete'/>
      </td>
    </tr>
  )
}

export default LeaveRequestRow