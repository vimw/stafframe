import React from 'react'
import styles from './ManageUsersTable.module.css'
import ManageUsersRow from '../ManageUsersRow/ManageUsersRow'


interface Users{
    id:string,
    name: string
    email: string,
    department:string,
    position: string,
    joinDate: string
}

interface ManageUsersTableProps{
    header: string[]
    data: Users[]
}

const ManageUsersTable = ({header,data}: ManageUsersTableProps) => {
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
            <ManageUsersRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsersTable