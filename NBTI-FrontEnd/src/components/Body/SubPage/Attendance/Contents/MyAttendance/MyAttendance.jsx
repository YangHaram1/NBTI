import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MyAttendance.module.css';
import { host } from '../../../../../../config/config';

export const MyAttendance = () => {
    const [currentClockIn, setCurrentClockIn] = useState(null);
    const [clockedIn, setClockedIn] = useState(false);
    const [currentClockOut, setCurrentClockOut] = useState(null);
    const [clockedOut, setClockedOut] = useState(false);
    const [attendanceSeq, setAttendanceSeq] = useState(null);

    useEffect(() => {
        // 로컬 스토리지에서 출근 기록 시퀀스와 출근 상태를 가져옵니다.
        const storedSeq = localStorage.getItem('attendanceSeq');
        const storedClockIn = localStorage.getItem('currentClockIn');
        const storedClockOut = localStorage.getItem('currentClockOut');
        const storedClockedIn = localStorage.getItem('clockedIn') === 'true';
        const storedClockedOut = localStorage.getItem('clockedOut') === 'true';

        if (storedSeq) {
            setAttendanceSeq(Number(storedSeq));
        }
        if (storedClockIn) {
            setCurrentClockIn(storedClockIn);
        }
        if (storedClockOut) {
            setCurrentClockOut(storedClockOut);
        }
        setClockedIn(storedClockedIn);
        setClockedOut(storedClockedOut);
    }, []);

    const handleClockIn = async () => {
        try {
            console.log(`Sending POST request to ${host}/attendance/clock-in`);
            const response = await axios.post(`${host}/attendance/clock-in`, null, {
                withCredentials: true
            });
            console.log('Response:', response);
            const { seq } = response.data;
            if (seq) {
                setAttendanceSeq(seq);
                setCurrentClockIn(new Date().toLocaleTimeString());
                setClockedIn(true);
                
                // 로컬 스토리지에 출근 기록 시퀀스와 출근 시간을 저장합니다.
                localStorage.setItem('attendanceSeq', seq);
                localStorage.setItem('currentClockIn', new Date().toLocaleTimeString());
                localStorage.setItem('clockedIn', 'true');
                
                alert('출근 기록이 저장되었습니다.');
            } else {
                alert('출근 기록 저장 실패: seq 값이 없습니다.');
            }
        } catch (err) {
            console.error('출근 기록에 실패했습니다.', err.response ? err.response.data : err);
            alert('출근 기록에 실패했습니다.');
        }
    };

    const handleClockOut = async () => {
        if (!attendanceSeq) {
            alert('출근 기록이 없습니다.');
            return;
        }

        try {
            const endDate = new Date().toISOString();
            console.log(`Sending PUT request to ${host}/attendance/clock-out`);
            const response = await axios.put(`${host}/attendance/clock-out`, null, {
                params: { seq: attendanceSeq },
                withCredentials: true
            });
            console.log('Response:', response);
            setCurrentClockOut(new Date().toLocaleTimeString());
            setClockedOut(true);

            // 로컬 스토리지에 퇴근 시간을 저장합니다.
            localStorage.setItem('currentClockOut', new Date().toLocaleTimeString());
            localStorage.setItem('clockedOut', 'true');
            
            alert('퇴근 기록이 저장되었습니다.');
        } catch (err) {
            console.error('퇴근 기록에 실패했습니다.', err.response ? err.response.data : err);
            alert('퇴근 기록에 실패했습니다.');
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
                <div className={styles.clockSection}>
                    <div className={styles.timeAndButtons}>
                        <div className={styles.timeDisplay}>
                            <p>퇴근 시간: {currentClockOut || '퇴근 기록 없음'}</p>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button 
                                onClick={handleClockOut} 
                                className={`${styles.button} ${clockedOut ? styles.disabled : ''}`} 
                                disabled={clockedOut}
                            >
                                퇴근
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
