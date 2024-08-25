import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './MyAttendance.module.css';
import { host } from '../../../../../../config/config';
import { format } from 'date-fns';
import useWeeklyStats from './WeeklsyStats/useWeeklyStats';
import WeeklyStats from './WeeklsyStats/WeeklyStats';
import YearlyStats from './YearStats/YearlyStats';
import useYearlyStats from './YearStats/useYearlyStats';

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
    const { stats: weeklyStats, dailyStats, fetchWeeklyStats } = useWeeklyStats(memberId);
    const { stats: yearlyStats, fetchYearlyStats } = useYearlyStats(memberId);

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
            setIsAbsent(!isClockInToday && !clockedIn);
            setIsEarlyLeave(endDate && endDate.getHours() < 18);

            setCurrentClockIn(isClockInToday ? format(startDate, 'HH:mm:ss') : null);
            setCurrentClockOut(isClockOutToday ? format(endDate, 'HH:mm:ss') : null);
        } catch (err) {
           
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
            const { start_date, isLate } = response.data;
            setCurrentClockIn(format(new Date(start_date), 'HH:mm:ss'));
            setClockedIn(true);
            setIsLate(isLate);
            setIsAbsent(false);
            alert(isLate ? '지각 기록이 저장되었습니다.' : '출근 기록이 저장되었습니다.');
            fetchWeeklyStats(); // 주간 통계 업데이트
            fetchYearlyStats(); // 연간 통계 업데이트
        } catch (err) {
           
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
                setIsEarlyLeave(true);
                alert('퇴근 기록이 저장되었습니다.');
                fetchWeeklyStats(); // 주간 통계 업데이트
                fetchYearlyStats(); // 연간 통계 업데이트
            } else {
                alert('퇴근 기록 저장 실패');
            }
        } catch (err) {
           
            alert('퇴근 기록에 실패했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <YearlyStats stats={yearlyStats} />
            <div className={styles.myAttendanceContainer}>
                <h2>금일 근무 현황</h2>
                <div className={styles.clockAndWorkInfo}>
                    <div className={styles.clockSection}>
                        <div className={styles.timeAndButtons}>
                            <div className={styles.timeDisplay}>
                                <p>출근 시간: {currentClockIn || '출근 기록 없음'}</p>
                                {isLate && <span className={styles.comment}>지각</span>}
                                
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
                                {isEarlyLeave && <span className={styles.comment}>조기 퇴근</span>}
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
            </div>
            <WeeklyStats stats={weeklyStats} dailyStats={dailyStats} />
        </div>
    );
};
