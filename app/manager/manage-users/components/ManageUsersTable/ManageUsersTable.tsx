import React from 'react'
import styles from './ManageUsersTable.module.css'
import ManageUsersRow from '../ManageUsersRow/ManageUsersRow'


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

interface ManageUsersTableProps{
    header: string[]
    data: User[]
    onEdit: (user:User) => void
    onDelete: (user:User) => void
}

const ManageUsersTable = ({header,data,onEdit,onDelete}: ManageUsersTableProps) => {
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
          {data.map((user) => (
            <ManageUsersRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsersTable