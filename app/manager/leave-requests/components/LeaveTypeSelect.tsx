import React from 'react'
import { Select } from 'antd';
import type { SelectProps } from 'antd';


interface LeaveTypeSelectProps{
    leaveTypes: { label: string; value: string }[];
}

const options: SelectProps['options'] = [];


const LeaveTypeSelect = ({leaveTypes}: LeaveTypeSelectProps) => {
  return (
    <Select
        mode="multiple"
        allowClear
        style={{ width: '10%' }}
        placeholder="Leave Type"
        options={leaveTypes}
    />
  )
}

export default LeaveTypeSelect