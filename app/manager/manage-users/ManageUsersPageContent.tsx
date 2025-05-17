'use client'
import React, { useEffect, useState } from 'react'
import styles from './ManageUsersPageContent.module.css'
import EmployeeSearchInput from '../leave-requests/components/EmployeeSearchInput/EmployeeSearchInput'
import ManageUsersTable from './components/ManageUsersTable/ManageUsersTable'
import { fetchUsers } from './lib/users'
import ManageUsersTableSkeleton from './components/ManageUsersTableSkeleton/ManageUsersTableSkeleton'


interface User{
  id:string,
  name:string,
  email:string,
  department:string,
  position:string,
  joinDate:string
}

const ManageUsersPageContent = () => {
  
    const [filteredEmployees,setFilteredEmployees] = useState<string[]>([])
    const [users,setUsers] = useState<User[][]>([])
    const [usersCount,setUsersCount] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [loading,setLoading] = useState<boolean>(true)

    const pageSize = 6

    useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
        const {paginatedUsers,totalCount} = await fetchUsers(filteredEmployees,currentPage,pageSize)
        setUsers((prev) => [...prev,paginatedUsers])
        setUsersCount(totalCount)
        setLoading(false)
      }
      fetchData();
    },[currentPage,filteredEmployees])
    

    function handleFilterEmployees(users: string[]){
        setFilteredEmployees(users)
        setUsers([])
    }
  
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
              {loading || !users[currentPage-1] ? (
                <ManageUsersTableSkeleton />
              ): (
                  <ManageUsersTable header={["Name","Email","Department","Position","Join Date","Actions"]} data={users[currentPage-1]}/>
              )}
            </div>

        </div>
    </section>
  )
}

export default ManageUsersPageContent