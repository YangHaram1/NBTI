import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './ClockButton.module.css'; // 버튼 스타일
import { format } from 'date-fns';
import { host } from '../../../../../config/config';

const ClockButton = ({ type }) => {
    const [currentClockIn, setCurrentClockIn] = useState(null);
    const [currentClockOut, setCurrentClockOut] = useState(null);
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);
    const [isLate, setIsLate] = useState(false);
    const [isAbsent, setIsAbsent] = useState(false);
    const [isEarlyLeave, setIsEarlyLeave] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const memberId = sessionStorage.getItem('loginID');
    const today = new Date().toISOString().split('T')[0];

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

            // Disable button if already clocked in/out
            if (type === 'clock-in') {
                setDisabled(isClockInToday);
            } else if (type === 'clock-out') {
                setDisabled(isClockOutToday || !clockedIn);
            }
        } catch (err) {
            console.error('출근 기록을 가져오는데 실패했습니다.', err.response ? err.response.data : err);
        }
    }, [memberId, today, type]);

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
            fetchAttendanceStatus(); // 상태 재조회
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
                setIsEarlyLeave(true);
                alert('퇴근 기록이 저장되었습니다.');
                fetchAttendanceStatus(); // 상태 재조회
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
            <div className={styles.clockSection}>
                <div className={styles.timeDisplay}>
                    {type === 'clock-in' && (
                        <>
                            <p>출근 시간 : </p>
                            <p> {currentClockIn || '출근 기록 없음'}</p>
                            {isLate && <span className={styles.comment}>지각</span>}
                            {!currentClockIn && <p className={styles.additionalText}>출근 기록이 없습니다.</p>}
                        </>
                    )}
                    {type === 'clock-out' && (
                        <>
                            <p>퇴근 시간</p>
                            <p> {currentClockOut || '퇴근 기록 없음'}</p>
                            {isEarlyLeave && <span className={styles.comment}>조기 퇴근</span>}
                        </>
                    )}
                </div>
                <div className={styles.buttonsContainer}>
                    {type === 'clock-in' && (
                        <button
                            onClick={handleClockIn}
                            className={`${styles.button} ${disabled ? styles.disabled : ''}`}
                            disabled={disabled}
                        >
                            출근
                        </button>
                    )}
                    {type === 'clock-out' && (
                        <button
                            onClick={handleClockOut}
                            className={`${styles.button} ${disabled ? styles.disabled : ''}`}
                            disabled={disabled}
                        >
                            퇴근
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClockButton;
