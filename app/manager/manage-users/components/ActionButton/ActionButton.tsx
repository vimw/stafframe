import React from 'react'
import styles from './ActionButton.module.css'

interface ActionButtonProps{
    action: "Edit" | "Delete"
}

const ActionButton = ({action}: ActionButtonProps) => {
  return (
    <button className={`${styles.actionButton} ${action === 'Delete' ? styles.deleteButton: ''}`}>
        {action}
    </button>
  )
}

export default ActionButton