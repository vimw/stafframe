import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './LeaveRequestsChart.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
  );


interface LeaveRequestsChartProps{
    title: string,
    labels: string[],
    dataValues: number[],
}

const LeaveRequestsChart = ({title,labels,dataValues}: LeaveRequestsChartProps) => {
    const options: object = {
        responsive: true,
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: '#090C9B'
            }
        ]
    }

  return (
    <div className={styles.chartContainer}>
        <h3>{title}</h3>
        <Bar
            options={options}
            data={data}
        />
    </div>
  )
}

export default LeaveRequestsChart