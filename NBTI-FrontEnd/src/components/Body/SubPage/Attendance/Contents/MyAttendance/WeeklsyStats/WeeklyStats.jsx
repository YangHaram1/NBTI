import React, { useState, useCallback, useEffect } from 'react';
import styles from './WeeklyStats.module.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

// 시간 포맷 함수
const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

// 날짜 포맷 함수
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

// 요일 계산 함수 (월요일을 주의 시작일로 설정)
const getDayOfWeek = (date) => (date.getDay() + 6) % 7; // 0 (월요일)부터 6 (일요일)

// 주의 시작일 계산 함수 (월요일)
const getStartOfWeek = (date) => {
    const day = date.getDay();
    const distanceToMonday = (day + 6) % 7;
    const monday = new Date(date);
    monday.setDate(date.getDate() - distanceToMonday);
    return monday;
};

// 근무 시간 계산 함수
const calculateWorkingHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffMs = end - start;
    if (diffMs < 0) return 'N/A'; // 유효하지 않은 시간

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}시간 ${diffMinutes}분`;
};

// 주간 데이터 가져오기
const getWeekData = (date, dailyStats) => {
    return Array.from({ length: 7 }).map((_, index) => {
        const monday = getStartOfWeek(date);
        monday.setDate(monday.getDate() + index);
        const formattedDate = formatDate(monday);

        // dailyStats에서 데이터 가져오기
        const { late = false, absent = false, earlyLeave = false, startDate, endDate } = dailyStats[formattedDate] || {};

        // 시간 및 근무 시간 계산
        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = calculateWorkingHours(startDate, endDate);

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

        const dayOfWeek = getDayOfWeek(monday);

        let backgroundColor = 'white';
        let textColor = 'black';

        if (dayOfWeek === 6) {
            textColor = 'red';
        } else if (dayOfWeek === 5) {
            textColor = 'blue';
        }

        return {
            title,
            date: formattedDate,
            extendedProps: { backgroundColor, textColor }
        };
    });
};

const WeeklyStats = ({ stats, dailyStats }) => {
    const { lateCount, absentCount, earlyLeaveCount } = stats;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarApi, setCalendarApi] = useState(null);

    // 주간 범위를 설정하는 함수
    const getWeekRange = (date) => {
        const startOfWeek = getStartOfWeek(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
    };

    // 전체 이벤트 가져오기
    const getAllEvents = (date) => {
        const { startOfWeek, endOfWeek } = getWeekRange(date);
        const previousWeek = new Date(startOfWeek);
        previousWeek.setDate(startOfWeek.getDate() - 7);
        const nextWeek = new Date(endOfWeek);
        nextWeek.setDate(endOfWeek.getDate() + 7);

        return [
            ...getWeekData(previousWeek, dailyStats),
            ...getWeekData(startOfWeek, dailyStats),
            ...getWeekData(nextWeek, dailyStats)
        ];
    };

    // 주간 뷰의 날짜를 설정하는 함수
    const setDates = useCallback((date) => {
        setCurrentDate(date);
    }, []);

    // "지난주" 버튼 클릭 핸들러
    const handlePreviousWeek = () => {
        const { startOfWeek } = getWeekRange(currentDate);
        const previousWeek = new Date(startOfWeek);
        previousWeek.setDate(startOfWeek.getDate() - 7);
        setDates(previousWeek);
    };

    // "다음주" 버튼 클릭 핸들러
    const handleNextWeek = () => {
        const { endOfWeek } = getWeekRange(currentDate);
        const nextWeek = new Date(endOfWeek);
        nextWeek.setDate(endOfWeek.getDate() + 7);
        setDates(nextWeek);
    };

    useEffect(() => {
        // 현재 날짜가 변경되면 FullCalendar의 날짜를 업데이트
        if (calendarApi) {
            calendarApi.gotoDate(currentDate);
        }
    }, [currentDate, calendarApi]);

    return (
        <div className={styles.container}>
            <h2>주간 통계</h2>
            <div className={styles.stats}>
                <p>지각 횟수: {lateCount}</p>
                <p>결근 횟수: {absentCount}</p>
                <p>조기 퇴근 횟수: {earlyLeaveCount}</p>
            </div>
            <div className={styles.toolbar}>
                <button onClick={handlePreviousWeek}>지난주</button>
                <button onClick={handleNextWeek}>다음주</button>
            </div>
            <div className='minical'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridWeek"
                    headerToolbar={false}
                    locales={[koLocale]}
                    locale="ko"
                    selectable={true}
                    height="auto"
                    events={getAllEvents(currentDate)}
                    firstDay={1}
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
                    // FullCalendar API를 설정
                    datesSet={(info) => {
                        if (info.view) {
                            setCalendarApi(info.view.calendar);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default WeeklyStats;
