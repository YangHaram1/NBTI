import React from 'react';
import styles from './YearlyStats.module.css';

const YearlyStats = ({ stats = { lateCount: 0, absentCount: 0, earlyLeaveCount: 0,statsDay:0,statsHours:0 } }) => {
    const { lateCount, absentCount, earlyLeaveCount,statsDay,statsHours } = stats;

    return (
        <div className={styles.statsContainer}>
            <h3>연간 출근 기록</h3>
            <ul>
                <li className={styles.statItem}>
                    <span className={styles.statLabel}>지각 횟수:</span>
                    <span className={styles.statValue}>{lateCount}</span>
                </li>
                <li className={styles.statItem}>
                    <span className={styles.statLabel}>결근 횟수:</span>
                    <span className={styles.statValue}>{absentCount}</span>
                </li>
                <li className={styles.statItem}>
                    <span className={styles.statLabel}>조기 퇴근 횟수:</span>
                    <span className={styles.statValue}>{earlyLeaveCount}</span>
                </li>
                <li className={styles.statItem}>
                    <span className={styles.statLabel}>총 근무일 : </span>
                    <span className={styles.statValue}>{statsDay}</span>
                </li>
                <li className={styles.statItem}>
                    <span className={styles.statLabel}>총 근무 시간 :</span>
                    <span className={styles.statValue}>{statsHours}</span>
                </li>
            </ul>
        </div>
    );
};

export default YearlyStats;
