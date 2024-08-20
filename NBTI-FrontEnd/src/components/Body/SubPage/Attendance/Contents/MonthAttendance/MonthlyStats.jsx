import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 상호작용 플러그인 추가
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
            console.error('SessionStorage에서 memberId를 찾을 수 없습니다.');
        }
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const { stats, dailyStats } = useMonthlyStats(memberId, year, month);

    // 주 단위로 데이터를 변환합니다.
    const getWeekStartDate = (date) => {
        const day = date.getDay();
        const distanceToMonday = (day + 6) % 7; // 월요일로부터의 거리
        const monday = new Date(date);
        monday.setDate(date.getDate() - distanceToMonday);
        return monday;
    };

    const getWeekDates = (startOfWeek) => {
        return Array.from({ length: 7 }).map((_, index) => {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + index);
            return formatDate(date);
        });
    };

    const events = Object.keys(dailyStats).flatMap(date => {
        const { startDate, endDate } = dailyStats[date] || {};

        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = startDate && endDate ? calculateWorkingHours(startDate, endDate) : 'N/A';

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}`;

        const startOfWeek = getWeekStartDate(new Date(date));
        const weekDates = getWeekDates(startOfWeek);

        return weekDates.map(weekDate => ({
            title,
            start: weekDate,
            extendedProps: {
                backgroundColor: 'white',
                textColor: 'black'
            }
        }));
    });

    const handleTodayClick = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.today();
            setCurrentDate(new Date());
        }
    };

    const handlePrevWeekClick = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            const currentStart = calendarApi.view.currentStart;
            const prevWeekStart = new Date(currentStart);
            prevWeekStart.setDate(prevWeekStart.getDate() - 7);
            calendarApi.gotoDate(prevWeekStart);
            setCurrentDate(prevWeekStart);
        }
    };

    const handleNextWeekClick = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            const currentStart = calendarApi.view.currentStart;
            const nextWeekStart = new Date(currentStart);
            nextWeekStart.setDate(nextWeekStart.getDate() + 7);
            calendarApi.gotoDate(nextWeekStart);
            setCurrentDate(nextWeekStart);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.dateTitle}>
                    <h2>{`${year}년 ${month}월`}</h2>
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
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridWeek"
                    locales={[koLocale]}
                    locale="ko"
                    height="auto"
                    events={events}
                    headerToolbar={false} // 기본 헤더 툴바를 사용하지 않음
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
