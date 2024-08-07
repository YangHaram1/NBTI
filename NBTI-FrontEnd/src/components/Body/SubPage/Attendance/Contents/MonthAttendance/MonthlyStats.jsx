import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import useMonthlyStats from './useMonthlyStats'; // 훅을 가져옵니다
import styles from './MonthlyStats.module.css'; // 스타일을 가져옵니다

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

const getDayOfWeek = (date) => (date.getDay() + 6) % 7; // 0 (월요일)부터 6 (일요일)

export const MonthlyStats = () => {
    const [memberId, setMemberId] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // 월은 0부터 시작하므로 +1 필요

    useEffect(() => {
        const storedMemberId = sessionStorage.getItem('loginID');
        if (storedMemberId) {
            setMemberId(storedMemberId);
        } else {
            console.error('SessionStorage에서 memberId를 찾을 수 없습니다.');
        }
    }, []);

    const { stats, dailyStats } = useMonthlyStats(memberId, year, month);

    const events = Object.keys(dailyStats).map(date => {
        const { late = false, absent = false, earlyLeave = false, startDate, endDate } = dailyStats[date] || {};

        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = startDate && endDate ? calculateWorkingHours(startDate, endDate) : 'N/A';

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}`;

        const dayOfWeek = getDayOfWeek(new Date(date));
        let backgroundColor = 'white';
        let textColor = 'black';

        // if (late) {
            
        //     textColor = 'white';
        // } else if (absent) {
            
        //     textColor = 'white';
        // } else if (earlyLeave) {
            
        //     textColor = 'white';
        // }

        if (dayOfWeek === 5) {
            textColor = 'blue';
            
        } else if (dayOfWeek === 6) {
            textColor = 'red';
            
        }

        return {
            title,
            start: formatDate(date),
            extendedProps: { backgroundColor, textColor }
        };
    });

    return (
        <div className={styles.container}>
            <h2>월간 통계</h2>
            <div className={styles.stats}>
                <p>지각 횟수: {stats.lateCount}</p>
                <p>결근 횟수: {stats.absentCount}</p>
                <p>조기 퇴근 횟수: {stats.earlyLeaveCount}</p>
            </div>
            <div className={styles.minical}>
                <FullCalendar
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
                                className={styles.eventContent}
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
