import React from 'react'
import styles from './TaskCard.module.css'
import { EditOutlined,DeleteOutlined,SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface Task {
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

interface TaskCardProps {
  task: Task,
  handleEditTask: (task: Task) => void
  handleDeleteTask: (id:string) => void
}

const TaskCard = ({ task, handleEditTask, handleDeleteTask }: TaskCardProps) => {

  return (
    <div key={task.id} className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>
          {task.title}
          {task.recurring && (
            <span className={styles.recurringBadge} title="Recurring Task">
              <SyncOutlined />
            </span>
          )}
        </h3>
        <div className={styles.taskActions}>
          <button
            className={styles.taskActionButton}
            onClick={() => handleEditTask(task)}
            title="Edit Task"
          >
            <EditOutlined />
          </button>
          <button
            className={styles.taskActionButton}
            onClick={() => handleDeleteTask(task.id)}
            title="Delete Task"
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>

      <div className={styles.taskMeta}>
        <div className={styles.taskAssignee}>
          <span className={styles.taskMetaLabel}>Assigned to:</span>
          <div className={styles.assigneeList}>
            {task.targetIds.length <= 2 ? (
              task.employeeNames.join(', ')
            ) : (
              <>
                {task.employeeNames.slice(0, 2).join(', ')}
                <span
                  className={styles.moreAssignees}
                  title={task.employeeNames.join(', ')}
                >
                  +{task.targetIds.length - 2} more
                </span>
              </>
            )}
          </div>
        </div>
        <div className={styles.taskDates}>
          <div>
            <span className={styles.taskMetaLabel}>Start:</span>
            <span className={styles.taskMetaValue}>
              {task.startDate} {task.startTime}
            </span>
          </div>
          <div>
            <span className={styles.taskMetaLabel}>Due:</span>
            <span className={styles.taskMetaValue}>
              {task.dueDate} {task.dueTime}
            </span>
          </div>
        </div>
      </div>

      <p className={styles.taskDescription}>{task.desc}</p>

      <div className={styles.taskDuration}>
        <span className={styles.durationIcon}><ClockCircleOutlined /></span>
        <span className={styles.durationText}>
            Duration: {task.startTime} - {task.dueTime}
        </span>
      </div>

      {task.recurring && (
        <div className={styles.recurringInfo}>
          <span className={styles.recurringIcon}><SyncOutlined /></span>
          <span className={styles.recurringText}>
            {/* {getRecurringTypeText(task.recurringType, task.recurringDays)}
            {task.recurringEndDate && ` until ${task.recurringEndDate}`} */}
            {/* Weekly on Mon until 2023-12-31 */}
          </span>
        </div>
      )}

      <div className={styles.taskFooter}>
        <span className={styles.taskCategory}>{task.category}</span>
      </div>
    </div>
  )
}

export default TaskCard
