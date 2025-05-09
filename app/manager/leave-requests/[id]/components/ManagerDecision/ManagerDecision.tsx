'use client'
import React from 'react'
import styles from './ManagerDecision.module.css'
import { Input } from 'antd';

const { TextArea } = Input;

const ManagerDecision = () => {
  return (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h2>Manager Decision</h2>
        </div>
        <p className={styles.metaText}>Review the request and provide your decision</p>
        <p className={styles.commentsHeader}>Comments (Optional)</p>
        <TextArea className={styles.textArea} rows={4} placeholder="Add any comments or notes about your decision..."/>
        <div className={styles.cardFooter}>
            <button className={styles.cancelButton}>Cancel</button>
            <div className={styles.actionButtons}>
                <button className={`${styles.button} ${styles.decline}`}>
                <span className={styles.icon}>✖</span>
                Decline Request
                </button>
                <button className={`${styles.button} ${styles.approve}`}>
                <span className={styles.icon}>✔</span>
                Approve Request
                </button>
            </div>
        </div>

      </div>
  )
}

export default ManagerDecision