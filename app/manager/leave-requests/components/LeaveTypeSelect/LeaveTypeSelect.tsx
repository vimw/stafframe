import React from 'react'
import { Select } from 'antd';
import type { SelectProps } from 'antd';


interface LeaveTypeSelectProps{
    leaveTypes: { label: string; value: string }[];
    handleFilterLeaveTypes: (leaveTypes: string[]) => void
}

const options: SelectProps['options'] = [];


const LeaveTypeSelect = ({leaveTypes,handleFilterLeaveTypes}: LeaveTypeSelectProps) => {
  return (
    <Select
        mode="multiple"
        allowClear
        style={{ width: '10%' }}
        placeholder="Leave Type"
        options={leaveTypes}
        onChange={(leaveTypes) => handleFilterLeaveTypes(leaveTypes)}
    />
  )
}

export default LeaveTypeSelect