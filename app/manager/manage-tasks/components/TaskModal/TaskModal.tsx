import type React from "react"
import { useEffect, useState } from "react"
import styles from "./TaskModal.module.css"
import {CloseOutlined,InfoCircleOutlined} from '@ant-design/icons';
import EmployeeSearchInput from "@/app/manager/leave-requests/components/EmployeeSearchInput/EmployeeSearchInput";


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
    isRecurring: boolean,
    employeeNames: string[],
    startDate: string,
    startTime: string,
    dueDate: string,
    dueTime: string,
    recurringType?: "daily" | "weekly" | "monthly" | "yearly",
    recurringEndDate?: string,
    recurringDays?: number[]
}


interface TaskModalProps {
  task: Task | null
  categories: string[]
  onSave: (task: Task,isNew: boolean) => void
  onClose: () => void
}

export default function TaskModal({ task, categories, onSave, onClose }: TaskModalProps) {
  const today = new Date().toISOString().split("T")[0]
  const now = new Date()
  const currentHour = now.getHours().toString().padStart(2, "0")
  const currentMinute = now.getMinutes().toString().padStart(2, "0")
  const currentTime = `${currentHour}:${currentMinute}`

  const [formData, setFormData] = useState<Task>({
    id: "",
    title: "",
    desc: "",
    targetIds: [],
    taskStart: {
        yday: 0
    },
      taskTime: {
        hour: 0,
        minute: 0,
        length: 0
    },
    employeeNames: [''],
    targetType: 'user',
    startDate: today,
    startTime: currentTime,
    dueDate: today,
    dueTime: currentTime,
    category: categories[0] || "Other",
    isRecurring: false,
    recurringType: "weekly",
    recurringEndDate: "",
    recurringDays: [],
  })

  useEffect(() => {
      if(task){
          setFormData(task)
      }
    },[task])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  function handleFilterEmployees(users: string[]){
      setFormData({
        ...formData,
        targetIds: users
      })
  }

  const handleRecurringDayToggle = (day: number) => {
    const currentDays = formData.recurringDays || []

    if (currentDays.includes(day)) {
      setFormData({
        ...formData,
        recurringDays: currentDays.filter((d) => d !== day),
      })
    } else {
      setFormData({
        ...formData,
        recurringDays: [...currentDays, day].sort(),
      })
    }
  }

async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    try{
        const response = await fetch('/api/tasks', {
            method: task ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (!response.ok) {
            if (data.errors) {
              console.log(data.errors)
            }
            return
        }

        onClose()

    } catch(error){
        console.error('Request failed:', error)
    }
  }

  const isDateTimeValid = () => {
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime || "00:00"}`)
    const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime || "00:00"}`)

    return (
      startDateTime <= dueDateTime &&
      (!formData.isRecurring ||
        !formData.recurringEndDate ||
        new Date(formData.dueDate) <= new Date(formData.recurringEndDate))
    )
  }

  const getDayName = (day: number): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[day]
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{task ? "Edit Task" : "Add New Task"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.desc}
              onChange={handleChange}
              className={styles.textarea}
              rows={4}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Assigned To</label>
            <div className={styles.searchEmployeeContainer}>
              <EmployeeSearchInput handleFilterEmployees={handleFilterEmployees}/>
            </div>
            {formData.targetIds.length === 0 && (
              <div className={styles.errorMessage}>At least one employee must be assigned</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="startTime" className={styles.label}>
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="dueDate" className={styles.label}>
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`${styles.input} ${!isDateTimeValid() ? styles.inputError : ""}`}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dueTime" className={styles.label}>
                Due Time
              </label>
              <input
                type="time"
                id="dueTime"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
                className={`${styles.input} ${!isDateTimeValid() ? styles.inputError : ""}`}
                required
              />
            </div>
          </div>

          {!isDateTimeValid() && <div className={styles.errorMessage}>Due date/time must be after start date/time</div>}

          <div className={styles.sectionTitle}>Recurring Task Settings</div>

          <div className={styles.formGroup}>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>This is a recurring task</span>
              </label>
            </div>
          </div>

          {formData.isRecurring && (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="recurringType" className={styles.label}>
                    Recurrence Pattern
                  </label>
                  <select
                    id="recurringType"
                    name="recurringType"
                    value={formData.recurringType}
                    onChange={handleChange}
                    className={styles.select}
                    required={formData.isRecurring}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="recurringEndDate" className={styles.label}>
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="recurringEndDate"
                    name="recurringEndDate"
                    value={formData.recurringEndDate || ""}
                    onChange={handleChange}
                    className={styles.input}
                    min={formData.dueDate}
                  />
                </div>
              </div>

              {formData.recurringType === "weekly" && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Repeat on</label>
                  <div className={styles.weekdaySelector}>
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`${styles.dayButton} ${
                          formData.recurringDays?.includes(day) ? styles.dayButtonSelected : ""
                        }`}
                        onClick={() => handleRecurringDayToggle(day)}
                      >
                        {getDayName(day).charAt(0)}
                      </button>
                    ))}
                  </div>
                  <div className={styles.helperText}>
                    {formData.recurringDays && formData.recurringDays.length > 0
                      ? `Repeats on: ${formData.recurringDays.map((day) => getDayName(day)).join(", ")}`
                      : "Select at least one day"}
                  </div>
                </div>
              )}

              <div className={styles.recurringInfo}>
                <div className={styles.infoIcon}><InfoCircleOutlined /></div>
                <div className={styles.infoText}>
                  <p>This task will automatically create new instances based on the recurrence pattern.</p>
                  <p>You can edit or cancel the recurring pattern at any time.</p>
                </div>
              </div>
            </>
          )}

          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={!isDateTimeValid() || formData.targetIds.length === 0}
            >
              {task ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
