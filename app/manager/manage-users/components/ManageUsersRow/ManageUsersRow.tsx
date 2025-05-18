import React from 'react'
import styles from "../ManageUsersTable/ManageUsersTable.module.css";
import ActionButton from '../ActionButton/ActionButton';

interface User{
    id:string,
    name: string
    email: string,
    department:string,
    position: string,
    joinDate: string,
    leaveBalance: {
      annual: number
      sick: number
      personal: number
    }
}

interface ManageUserRowProps{
  user: User,
  onEdit: (user:User) => void
  onDelete: (user:User) => void
}

const LeaveRequestRow = ({user,onEdit,onDelete}: ManageUserRowProps) => {
  return (
    <tr key={user.id} className={styles.row}>
      <td className={styles.td}>{user.name}</td>
      <td className={styles.td}>{user.email}</td>
      <td className={styles.td}>{user.department}</td>
      <td className={styles.td}>{user.position}</td>
      <td className={styles.td}>{user.joinDate}</td>
      <td className={`${styles.td} ${styles.actionButtons}`}>
        <ActionButton action='Edit' onEdit={onEdit} user={user}/>
        <ActionButton action='Delete' onDelete={onDelete} user={user}/>
      </td>
    </tr>
  )
}

export default LeaveRequestRow