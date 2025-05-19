'use client'
import React, { useEffect, useState } from 'react'
import styles from './ManageTasksPageContent.module.css'
import EmployeeSearchInput from '../leave-requests/components/EmployeeSearchInput/EmployeeSearchInput'
import LeaveRequestsTableNavigation from '../leave-requests/components/LeaveRequestsTableNavigation/LeaveRequestsTableNavigation'
import SearchTaskInput from './components/SearchTaskInput'
import { Select } from 'antd';
import { fetchTasks } from './lib/tasks'

interface Task{

}

const ManageTasksPageContent = () => {
    const [filteredEmployees,setFilteredEmployees] = useState<string[]>([])
    const [filteredTask,setFilteredTask] = useState<string>('')
    const [filteredCategory,setFilteredCategory] = useState<string>('')
    const [tasks,setTasks] = useState<Task[][]>([])
    const [tasksCount,setTasksCount] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [loading,setLoading] = useState<boolean>(false)
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    const [currentTask,setCurrentTask] = useState<Task | null>(null)

    const pageSize = 6

    function handleNextPageClick() {
        setCurrentPage(currentPage+1)
    }
    function handlePreviousPageClick() {
        setCurrentPage(currentPage-1)
    }

    function handleFilterEmployees(users: string[]){
        setFilteredEmployees(users)
        setTasks([])
        setCurrentPage(1)
    }

    function handleAddTask(){

    }

    useEffect(() => {
      if(tasks[currentPage-1]) return

      setLoading(true)
      const fetchData = async () => {
        const {paginatedTasks,totalCount} = await fetchTasks(filteredEmployees,filteredTask,filteredCategory,currentPage,pageSize)
        setTasks((prev) => [...prev,paginatedTasks])
        setTasksCount(totalCount)
        setLoading(false)
      }
      fetchData();
    },[currentPage,filteredEmployees,filteredCategory,filteredTask])

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, tasksCount);

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage * pageSize >= tasksCount;

    return (
        <section className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1>Manage Tasks</h1>
                        <p>Create, assign, and track tasks for your team</p>
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.searchTask}>
                            <SearchTaskInput />
                        </div>
                        <div className={styles.filtersRow}>
                            <div className={styles.searchEmployee}>
                                <EmployeeSearchInput handleFilterEmployees={handleFilterEmployees}/>
                            </div>
                            <div className={styles.categorySelect}>
                                <Select
                                    defaultValue="all"
                                    options={[
                                        { value: 'all', label: 'All Categories' },
                                        { value: 'work', label: 'Work' },
                                        { value: 'other', label: 'Other' },
                                        { value: 'break', label: 'Break' },
                                        { value: 'meet', label: 'Meet' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.tableNavigation}>
                        <button onClick={handleAddTask} className={styles.addButton}>
                        Add New Task
                        </button>
                        {!loading && (
                            <LeaveRequestsTableNavigation handlePreviousPageClick={handlePreviousPageClick} handleNextPageClick={handleNextPageClick} leaveRequestsCount={tasksCount} startItem={startItem} endItem={endItem} isPreviousDisabled={isPreviousDisabled} isNextDisabled={isNextDisabled}/>
                        )}
                    </div>
                </div>
        </section>
    )
}

export default ManageTasksPageContent