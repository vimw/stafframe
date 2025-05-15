import React from 'react'

interface ActionButtonProps{
    action: "Edit" | "Delete"
}

const ActionButton = ({action}: ActionButtonProps) => {
  return (
    <button>
        {action}
    </button>
  )
}

export default ActionButton