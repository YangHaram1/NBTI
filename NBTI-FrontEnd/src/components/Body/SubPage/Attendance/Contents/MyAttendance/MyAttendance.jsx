import React, { useState } from 'react';
import axios from 'axios';
import styles from './MyAttendance.module.css';
import { host } from '../../../../../../config/config';

export const MyAttendance = () => {
    const [currentClockIn, setCurrentClockIn] = useState(null);
    const [clockedIn, setClockedIn] = useState(false);

    const handleClockIn = async () => {
        try {
            console.log(`Sending POST request to ${host}/attendance/clock-in`);
            const response = await axios.post(`${host}/attendance/clock-in`);
            console.log('Response:', response);
            setCurrentClockIn(new Date().toLocaleTimeString());
            setClockedIn(true);
            alert('출근 기록이 저장되었습니다.');
        } catch (err) {
            console.error('출근 기록에 실패했습니다.', err.response ? err.response.data : err);
            alert('출근 기록에 실패했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <h2>금일 근무 현황</h2>
            </div>
            <div className={styles.clockAndWorkInfo}>
                <div className={styles.clockSection}>
                    <div className={styles.timeAndButtons}>
                        <div className={styles.timeDisplay}>
                            <p>출근 시간: {currentClockIn || '출근 기록 없음'}</p>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button 
                                onClick={handleClockIn} 
                                className={`${styles.button} ${clockedIn ? styles.disabled : ''}`} 
                                disabled={clockedIn}
                            >
                                출근
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
