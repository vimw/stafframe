import React from 'react'
import styles from './RequestsStatusCard.module.css'
import Image from 'next/image'

interface RequestsStatusCardProps{
    status: 'Approved' | 'Pending' | 'Declined' | 'Requests',
    count: number,
    icon: string
}

const RequestsStatusCard = ({status,count,icon}: RequestsStatusCardProps) => {
  return (
    <div className={styles.requestStatusCard}>
        <Image src={icon} alt={`${status} icon`} width={75} height={75}/>
        <div className={styles.requestStatusCardContent}>
            <h3>{count}</h3>
            <p>{status}</p>
        </div>
    </div>
  )
}

export default RequestsStatusCard