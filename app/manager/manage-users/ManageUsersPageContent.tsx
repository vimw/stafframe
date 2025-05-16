'use client'
import React, { useState } from 'react'
import styles from './ManageUsersPageContent.module.css'
import EmployeeSearchInput from '../leave-requests/components/EmployeeSearchInput/EmployeeSearchInput'
import ManageUsersTable from './components/ManageUsersTable/ManageUsersTable'


const ManageUsersPageContent = () => {
  
    const [filteredEmployees,setFilteredEmployees] = useState<string[]>([])
    

    function handleFilterEmployees(users: string[]){
        setFilteredEmployees(users)
    }

    const users = [
        {
            id: '1',
            name: 'Jan Kowalski',
            email: 'jan.kowalski@stafframe.com',
            department: 'Finance',
            position: 'Financial Analyst',
        }
    ]
  
  return (
    <section className={styles.container}>
        <div className={styles.content}>
            <div className={styles.header}>
                <h1>Manage Users</h1>
                <p>Add, edit and manage employee accounts</p>
            </div>
            <div className={styles.filters}>
              <EmployeeSearchInput handleFilterEmployees={handleFilterEmployees}/>
            </div>
            <div className={styles.manageUsersTable}>
              <ManageUsersTable header={["Name","Email","Department","Position","Actions"]} data={users}/>
            </div>

        </div>
    </section>
  )
}

export default ManageUsersPageContent