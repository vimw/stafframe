'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './ManageTasksPageContent.module.css'
import EmployeeSearchInput from '../leave-requests/components/EmployeeSearchInput/EmployeeSearchInput'
import LeaveRequestsTableNavigation from '../leave-requests/components/LeaveRequestsTableNavigation/LeaveRequestsTableNavigation'
import SearchTaskInput from './components/SearchTaskInput'
import { Select } from 'antd';
import { fetchTasks } from './lib/tasks'
import TaskCard from './components/TaskCard/TaskCard'
import TaskModal from './components/TaskModal/TaskModal'

interface Task{
    id:string,
    title:string,
    desc:string,
    category: string,
    taskStart: {
        yday:number
    },
    taskTime: {
        hour: number,
        minute: number,
        length: number
    },
    targetType: string,
    targetIds: string[],
    recurring?: boolean,
    employeeNames: string[],
    startDate: string,
    startTime: string,
    dueDate: string,
    dueTime: string,
    recurringType?: "daily" | "weekly" | "monthly" | "yearly",
    recurringEndDate?: string,
    recurringDays?: number[]
}

const ManageTasksPageContent = () => {
    const [filteredEmployees,setFilteredEmployees] = useState<string[]>([])
    const [filteredTask,setFilteredTask] = useState<string>('')
    const [filteredCategory,setFilteredCategory] = useState<string>('')
    const [tasks,setTasks] = useState<Task[][]>([])
    const [tasksCount,setTasksCount] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [loading,setLoading] = useState<boolean>(true)
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    const [currentTask,setCurrentTask] = useState<Task | null>(null)

    const pageSize = 8

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

    function handleFilterCategory(category: string){
        if (category !== 'all'){
            setFilteredCategory(category)
        } else {
            setFilteredCategory('')
        }
        setTasks([])
        setCurrentPage(1)
    }

    const handleFilterTask = useCallback((taskName: string) => {
        setFilteredTask(taskName);
        setTasks([]);
        setCurrentPage(1);
    }, []);

    function handleAddTask(){
        setCurrentTask(null)
        setIsModalOpen(true)
    }

    function handleEditTask(task:Task) {
      setCurrentTask(task)
      setIsModalOpen(true)
    }

    async function handleDeleteTask (task:Task){
          if(window.confirm("Are you sure you want to delete this task?")){
            try{
              const res = await fetch('/api/tasks', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: task.id})
              })
    
              
              if (res.ok) {
                const { paginatedTasks, totalCount } = await fetchTasks(filteredEmployees,filteredTask,filteredCategory,currentPage,pageSize)
                setTasks((prev) => {
                  const copy = [...prev];
                  copy[currentPage - 1] = paginatedTasks;
                  return copy;
                });
                setTasksCount(totalCount);
              }
            } catch (error){
                console.error('Request failed:', error)
            }
          }
        }

    useEffect(() => {
      if(tasks[currentPage-1] && !loading) return

      setLoading(true)
      const fetchData = async () => {
        const {paginatedTasks,totalCount} = await fetchTasks(filteredEmployees,filteredTask,filteredCategory,currentPage,pageSize)
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[currentPage - 1] = paginatedTasks;
            return newTasks;
        })
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
                            <SearchTaskInput onSearch={handleFilterTask}/>
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
                                    onSelect={(category) => handleFilterCategory(category.toLowerCase())}
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
                    <div className={styles.taskGrid}>
                        {!loading && tasks[currentPage - 1] && tasks[currentPage - 1].length > 0? (
                            tasks[currentPage-1].length > 0 ? (
                                tasks[currentPage-1].map((task) => (
                                    <TaskCard key={task.id} task={task} handleEditTask={(task) => handleEditTask(task)} onDelete={handleDeleteTask} />
                                ))
                            ): (
                                <div className={styles.noResults}>No tasks found matching your criteria</div>
                            )
                        ) : null}
                    </div>
                </div>
                {isModalOpen && (
                    <TaskModal task={currentTask} categories={['Work','Other','Break','Meet']} onClose={() => setIsModalOpen(false)} onSave={(task:Task) => console.log(task)}/>
                )}
        </section>
    )
}

export default ManageTasksPageContent