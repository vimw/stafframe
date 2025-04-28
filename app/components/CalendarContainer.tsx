'use client'
import React from 'react'
import { Calendar } from "antd";
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import styles from './CalendarContainer.module.css'

const CalendarContainer = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar onPanelChange={onPanelChange} />
    </div>
  );
}

export default CalendarContainer