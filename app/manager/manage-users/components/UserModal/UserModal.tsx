import React, { useEffect, useState } from 'react'
import styles from './UserModal.module.css'
import {CloseOutlined} from '@ant-design/icons';

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

interface UserModalProps {
  user: User | null,
  onClose: () => void,
  departments:string[]
}

const UserModal = ({user,onClose,departments} : UserModalProps) => {
  const [formData,setFormData] = useState<User>({
    id: '',
    name: '',
    email: '',
    department: departments[0] || '',
    position: '',
    joinDate: new Date().toISOString().split('T')[0],
    leaveBalance: {
        annual: 15,
        sick: 10,
        personal: 3
    }
  })

  useEffect(() => {
    if(user){
        setFormData(user)
    }
  },[user])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const {value,name} = e.target

    
    if(name.includes('.')){
        const [parent,child] = name.split('.')
        setFormData({
            ...formData,
            leaveBalance: {
                ...formData.leaveBalance,
                [child]: value
            }
        })
    } else {
        setFormData({
            ...formData,
            [name]: value
        })
    }
  }

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{!user ? 'Add New Employee' : 'Edit Employee'}</h2>
                <button onClick={onClose} className={styles.closeButton}><CloseOutlined /></button>
            </div>
            <form className={styles.modalForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input 
                        type="text"
                        id='name'
                        name='name'
                        className={styles.input}
                        required
                        value={formData.name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        className={styles.input}
                        required
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="department" className={styles.label}>Department</label>
                        <select
                            id="department"
                            name="department"
                            className={styles.select}
                            required
                            value={formData.department}
                            onChange={(e) => handleChange(e)}
                        >
                            {departments.map((department) => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="position" className={styles.label}>Position</label>
                        <input 
                            type="text"
                            id='position'
                            name='position'
                            className={styles.input}
                            required
                            value={formData.position}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="joinDate" className={styles.label}>Join Date</label>
                    <input 
                            type="date"
                            id='joinDate'
                            name='joinDate'
                            className={styles.input}
                            required
                            value={formData.joinDate}
                            onChange={(e) => handleChange(e)}
                        />
                </div>
                <div className={styles.sectionTitle}>Leave Balance</div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                    <label htmlFor="leaveBalance.annual" className={styles.label}>
                        Annual Leave
                    </label>
                    <input
                        type="number"
                        id="leaveBalance.annual"
                        name="leaveBalance.annual"
                        className={styles.input}
                        min="0"
                        required
                        value={formData.leaveBalance.annual}
                        onChange={(e) => handleChange(e)}
                    />
                    </div>

                    <div className={styles.formGroup}>
                    <label htmlFor="leaveBalance.sick" className={styles.label}>
                        Sick Leave
                    </label>
                    <input
                        type="number"
                        id="leaveBalance.sick"
                        name="leaveBalance.sick"
                        className={styles.input}
                        min="0"
                        required
                        value={formData.leaveBalance.sick}
                        onChange={(e) => handleChange(e)}
                    />
                    </div>

                    <div className={styles.formGroup}>
                    <label htmlFor="leaveBalance.personal" className={styles.label}>
                        Personal Leave
                    </label>
                    <input
                        type="number"
                        id="leaveBalance.personal"
                        name="leaveBalance.personal"
                        className={styles.input}
                        min="0"
                        required
                        value={formData.leaveBalance.personal}
                        onChange={(e) => handleChange(e)}
                    />
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button type="button" className={styles.cancelButton} onClick={onClose}>
                    Cancel
                    </button>
                    <button type="submit" className={styles.saveButton}>
                    {user ? "Update Employee" : "Add Employee"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UserModal