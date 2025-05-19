'use client'
import React, { useEffect, useState } from 'react'
import styles from './ManageUsersPageContent.module.css'
import EmployeeSearchInput from '../leave-requests/components/EmployeeSearchInput/EmployeeSearchInput'
import ManageUsersTable from './components/ManageUsersTable/ManageUsersTable'
import { fetchUsers } from './lib/users'
import ManageUsersTableSkeleton from './components/ManageUsersTableSkeleton/ManageUsersTableSkeleton'
import LeaveRequestsTableNavigation from '../leave-requests/components/LeaveRequestsTableNavigation/LeaveRequestsTableNavigation'
import UserModal from './components/UserModal/UserModal'


interface User{
  id:string,
  name:string,
  email:string,
  department:string,
  position:string,
  joinDate:string
  leaveBalance: {
    annual: number
    sick: number
    personal: number
  }
}

const ManageUsersPageContent = () => {
  
    const [filteredEmployees,setFilteredEmployees] = useState<string[]>([])
    const [users,setUsers] = useState<User[][]>([])
    const [usersCount,setUsersCount] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [loading,setLoading] = useState<boolean>(true)
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    const [currentUser,setCurrentUser] = useState<User | null>(null)

    const pageSize = 6

    function handleNextPageClick() {
        setCurrentPage(currentPage+1)
    }
    function handlePreviousPageClick() {
        setCurrentPage(currentPage-1)
    }

    function handleAddUser() {
      setCurrentUser(null)
      setIsModalOpen(true)
    }

    function handleEditUser(user:User) {
      setCurrentUser(user)
      setIsModalOpen(true)
    }

    function handleUserSaved(savedUser: User, isNew: boolean) {
      setUsers(prev => {
        const copy = [...prev];
        const page = currentPage - 1;
        if (isNew) {
          const newPage = [savedUser, ...(copy[page] || [])].slice(0, pageSize);
          copy[page] = newPage;
          setUsersCount(prevCount => prevCount + 1);
        } else {
          copy[page] = copy[page].map(u => u.id === savedUser.id ? savedUser : u);
        }
        return copy;
      });
    }

    

    async function handleDeleteUser (user:User){
      if(window.confirm("Are you sure you want to delete this user?")){
        try{
          const res = await fetch('/api/users', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: user.id})
          })

          
          if (res.ok) {
            const { paginatedUsers, totalCount } = await fetchUsers(filteredEmployees, currentPage, pageSize);
            setUsers((prev) => {
              const copy = [...prev];
              copy[currentPage - 1] = paginatedUsers;
              return copy;
            });
            setUsersCount(totalCount);
          }
        } catch (error){
            console.error('Request failed:', error)
        }
      }
    }

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, usersCount);

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage * pageSize >= usersCount;

    useEffect(() => {
      if(users[currentPage-1]) return

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
        setCurrentPage(1)
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
            <div className={styles.tableNavigation}>
                <button onClick={handleAddUser} className={styles.addButton}>
                  Add New Employee
                </button>
                {!loading && (
                    <LeaveRequestsTableNavigation handlePreviousPageClick={handlePreviousPageClick} handleNextPageClick={handleNextPageClick} leaveRequestsCount={usersCount} startItem={startItem} endItem={endItem} isPreviousDisabled={isPreviousDisabled} isNextDisabled={isNextDisabled}/>
                )}
            </div>
            <div className={styles.manageUsersTable}>
              {loading || !users[currentPage-1] ? (
                <ManageUsersTableSkeleton />
              ): (
                  <ManageUsersTable header={["Name","Email","Department","Position","Join Date","Actions"]} data={users[currentPage-1]} onEdit={handleEditUser} onDelete={handleDeleteUser}/>
              )}
            </div>
        </div>
        {isModalOpen && (
          <UserModal user={currentUser} onClose={() => setIsModalOpen(false)} departments={['Marketing','Finance','HR','Engineering','Sales','Customer Support','Product']} onSave={handleUserSaved}/>
        )}
    </section>
  )
}

export default ManageUsersPageContent