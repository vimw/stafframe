import React from 'react';
import styles from '../../../leave-requests/components/LeaveRequestsTableSkeleton/LeaveRequestsTableSkeleton.module.css';

const ManageUsersTableSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Array(6).fill(null).map((_, idx) => (
              <th key={idx} className={styles.th}>
                <div className={styles.skeletonCell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(6).fill(null).map((_, rowIdx) => (
            <tr key={rowIdx} className={styles.row}>
              {Array(6).fill(null).map((_, colIdx) => (
                <td key={colIdx} className={styles.td}>
                  <div className={styles.skeletonCell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersTableSkeleton;
