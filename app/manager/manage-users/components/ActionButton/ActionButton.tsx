import React from 'react'
import styles from './ActionButton.module.css'

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

interface ActionButtonProps{
    action: "Edit" | "Delete",
    user: User,
    onEdit?: (user:User) => void
    onDelete?: (user:User) => void
}

const ActionButton = ({action,user,onEdit,onDelete}: ActionButtonProps) => {

  function handleClick(){
    if(action === 'Edit' && onEdit){
      onEdit(user)
    } else if (action === 'Delete' && onDelete){
      onDelete(user)
    }
  }

  return (
    <button className={`${styles.actionButton} ${action === 'Delete' ? styles.deleteButton: ''}`} onClick={handleClick}>
        {action}
    </button>
  )
}

export default ActionButton