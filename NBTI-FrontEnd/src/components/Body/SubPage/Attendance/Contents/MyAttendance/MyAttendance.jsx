import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './MyAttendance.module.css';
import { host } from '../../../../../../config/config'; // 수정된 경로
import { format } from 'date-fns';

export const MyAttendance = () => {
    const [currentClockIn, setCurrentClockIn] = useState(null);
    const [currentClockOut, setCurrentClockOut] = useState(null);
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);

    // 세션 스토리지에서 로그인 ID를 가져옵니다
    const memberId = sessionStorage.getItem('loginID');

    // 오늘 날짜를 가져옵니다
    const today = new Date().toISOString().split('T')[0];

    const fetchAttendanceStatus = useCallback(async () => {
        if (!memberId) return; // 로그인 ID가 없으면 상태를 가져오지 않음
        try {
            const response = await axios.get(`${host}/attendance/status`, {
                params: { memberId },
                withCredentials: true
            });
            const { start_date, end_date, clockedIn, clockedOut } = response.data;

            const startDate = start_date ? new Date(start_date) : null;
            const endDate = end_date ? new Date(end_date) : null;

            // 출근 및 퇴근 시간이 오늘 날짜와 일치하는지 확인합니다
            const isClockInToday = startDate && startDate.toISOString().split('T')[0] === today;
            const isClockOutToday = endDate && endDate.toISOString().split('T')[0] === today;

            setClockedIn(clockedIn);
            setClockedOut(clockedOut);
            setCurrentClockIn(isClockInToday ? format(startDate, 'HH:mm:ss') : null);
            setCurrentClockOut(isClockOutToday ? format(endDate, 'HH:mm:ss') : null);
        } catch (err) {
            console.error('출근 기록을 가져오는데 실패했습니다.', err.response ? err.response.data : err);
        }
    }, [memberId, today]);

    useEffect(() => {
        fetchAttendanceStatus();
    }, [fetchAttendanceStatus]);

    const handleClockIn = async () => {
        if (!memberId) return;
        try {
            const response = await axios.post(`${host}/attendance/clock-in`, null, {
                params: { memberId },
                withCredentials: true
            });
            const { seq, start_date } = response.data;
            setCurrentClockIn(format(new Date(start_date), 'HH:mm:ss'));
            setClockedIn(true);
            alert('출근 기록이 저장되었습니다.');
        } catch (err) {
            console.error('출근 기록에 실패했습니다.', err.response ? err.response.data : err);
            alert('출근 기록에 실패했습니다.');
        }
    };

    const handleClockOut = async () => {
        if (!memberId) return;
        try {
            const response = await axios.put(`${host}/attendance/clock-out`, null, {
                params: { memberId },
                withCredentials: true
            });
            if (response.status === 200) {
                setCurrentClockOut(format(new Date(), 'HH:mm:ss'));
                setClockedOut(true);
                alert('퇴근 기록이 저장되었습니다.');
            } else {
                alert('퇴근 기록 저장 실패');
            }
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
                                className={`${styles.button} ${clockedIn || currentClockIn ? styles.disabled : ''}`}
                                disabled={clockedIn || currentClockIn}
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
                                className={`${styles.button} ${clockedOut || currentClockOut ? styles.disabled : ''}`}
                                disabled={clockedOut || !clockedIn || currentClockOut}
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
