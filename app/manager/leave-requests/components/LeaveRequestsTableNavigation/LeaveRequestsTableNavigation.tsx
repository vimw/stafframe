import React, { useState } from 'react'
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import styles from './LeaveRequestsTableNavigation.module.css'

interface LeaveRequestsTableNavigationProps{
  leaveRequestsCount: number
  handleNextPageClick: () => void
  handlePreviousPageClick: () => void
  startItem: number;
  endItem: number;
  isPreviousDisabled: boolean
  isNextDisabled: boolean
}

const LeaveRequestsTableNavigation = ({leaveRequestsCount,handleNextPageClick,handlePreviousPageClick,isPreviousDisabled,isNextDisabled,startItem,endItem}: LeaveRequestsTableNavigationProps) => {

  return (
    <div className={styles.navigationWrapper}>
        <p>{startItem} - {endItem} of {leaveRequestsCount} items</p>
        <button disabled={isPreviousDisabled} onClick={handlePreviousPageClick}>
          <LeftOutlined/>
        </button>
        <button disabled={isNextDisabled} onClick={handleNextPageClick}>
            <RightOutlined/>
        </button>
    </div>
  )
}

export default LeaveRequestsTableNavigation