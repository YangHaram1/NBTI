import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import useMonthlyStats from './useMonthlyStats';
import styles from './MonthlyStats.module.css'; // CSS 모듈 import

const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

const calculateWorkingHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffMs = end - start;
    if (diffMs < 0) return 'N/A'; 

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}시간 ${diffMinutes}분`;
};

const formatDate = (date) => new Date(date).toISOString().split('T')[0];

export const MonthlyStats = () => {
    const [memberId, setMemberId] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const calendarRef = useRef(null);

    useEffect(() => {
        const storedMemberId = sessionStorage.getItem('loginID');
        if (storedMemberId) {
            setMemberId(storedMemberId);
        } else {
          
        }
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const { stats, dailyStats } = useMonthlyStats(memberId, year, month);

    const events = Object.keys(dailyStats).map(date => {
        const { late = false, absent = false, earlyLeave = false, startDate, endDate } = dailyStats[date] || {};

        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = startDate && endDate ? calculateWorkingHours(startDate, endDate) : 'N/A';

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}`;

        return {
            title,
            start: formatDate(date),
            extendedProps: {
                backgroundColor: 'white',
                textColor: 'black'
            }
        };
    });

    const handleTodayClick = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.today();
            setCurrentDate(new Date());
        }
    };

    const handlePrevMonthClick = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.prev();
            setCurrentDate(new Date(calendarApi.getDate().getFullYear(), calendarApi.getDate().getMonth(), 1));
        }
    };

    const handleNextMonthClick = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.next();
            setCurrentDate(new Date(calendarApi.getDate().getFullYear(), calendarApi.getDate().getMonth(), 1));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.dateTitle}>
                    <h2>{`${year}년 ${month}월`}</h2>
                </div>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        title="이전 주"
                        onClick={handlePrevMonthClick}
                        className={styles.navButton}
                    >
                        <span className={styles.icon}>&#10094;</span>
                    </button>
                    <button
                        type="button"
                        title="오늘"
                        onClick={handleTodayClick}
                        className={styles.navButton}
                    >
                        오늘
                    </button>
                    <button
                        type="button"
                        title="다음 주"
                        onClick={handleNextMonthClick}
                        className={styles.navButton}
                    >
                        <span className={styles.icon}>&#10095;</span>
                    </button>
                </div>
            </div>
            <div className={styles.stats}>
                <p>지각 횟수: {stats.lateCount}</p>
                <p>결근 횟수: {stats.absentCount}</p>
                <p>조기 퇴근 횟수: {stats.earlyLeaveCount}</p>
            </div>
            <div className={styles.minical}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={false}
                    locales={[koLocale]}
                    locale="ko"
                    height="auto"
                    events={events}
                    eventContent={({ event }) => {
                        const lines = event.title.split('\n');
                        return (
                            <div
                                style={{ backgroundColor: event.extendedProps.backgroundColor, color: event.extendedProps.textColor }}
                            >
                                {lines.map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        );
                    }}
                />
            </div>

        </div>
    );
};
