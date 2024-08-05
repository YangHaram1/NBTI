import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './MyAttendance.module.css';
import { host } from '../../../../../../config/config';
import { format } from 'date-fns';
import useWeeklyStats from './WeeklsyStats/useWeeklyStats';
import WeeklyStats from './WeeklsyStats/WeeklyStats';

export const MyAttendance = () => {
    const [currentClockIn, setCurrentClockIn] = useState(null);
    const [currentClockOut, setCurrentClockOut] = useState(null);
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);
    const [isLate, setIsLate] = useState(false);
    const [isAbsent, setIsAbsent] = useState(false);
    const [isEarlyLeave, setIsEarlyLeave] = useState(false);

    const memberId = sessionStorage.getItem('loginID');
    const today = new Date().toISOString().split('T')[0];
    const stats = useWeeklyStats(memberId);

    const fetchAttendanceStatus = useCallback(async () => {
        if (!memberId) return;
        try {
            const response = await axios.get(`${host}/attendance/status`, {
                params: { memberId },
                withCredentials: true
            });
            const { start_date, end_date, clockedIn, clockedOut, isLate } = response.data;

            const startDate = start_date ? new Date(start_date) : null;
            const endDate = end_date ? new Date(end_date) : null;

            const isClockInToday = startDate && startDate.toISOString().split('T')[0] === today;
            const isClockOutToday = endDate && endDate.toISOString().split('T')[0] === today;

            setClockedIn(clockedIn);
            setClockedOut(clockedOut);
            setIsLate(isLate);
            setIsAbsent(!isClockInToday && !clockedIn); // 출근 기록이 없는 경우 결근
            setIsEarlyLeave(endDate && endDate.getHours() < 18); // 18시 이전에 퇴근하면 조기퇴근

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
            const { seq, start_date, isLate } = response.data;
            setCurrentClockIn(format(new Date(start_date), 'HH:mm:ss'));
            setClockedIn(true);
            setIsLate(isLate);
            setIsAbsent(false); // 출근 기록이 저장되면 결근 상태를 초기화
            alert(isLate ? '지각 기록이 저장되었습니다.' : '출근 기록이 저장되었습니다.');
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
                setIsEarlyLeave(true); // 퇴근 시간 업데이트 시 조기퇴근 상태를 업데이트
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
                            <p>출근 시간: {currentClockIn || '출근 기록 없음'} {isLate && <span>(지각)</span>}</p>
                            {isAbsent && <p>오늘 출근하지 않아 결근 처리되었습니다.</p>}
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
                            <p>퇴근 시간: {currentClockOut || '퇴근 기록 없음'} {isEarlyLeave && <span>(조기 퇴근)</span>}</p>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button
                                onClick={handleClockOut}
                                className={`${styles.button} ${clockedOut || !clockedIn ? styles.disabled : ''}`}
                                disabled={clockedOut || !clockedIn}
                            >
                                퇴근
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <WeeklyStats stats={stats} />
        </div>
    );
};
