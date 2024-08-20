import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import useWeeklyStats from './useWeeklyStats'; // Adjust the path to your hook

const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

const formatDate = (date) => new Date(date).toISOString().split('T')[0];

const getStartOfWeek = (date) => {
    const day = date.getDay();
    // 월요일을 기준으로 주의 첫날을 계산합니다
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day === 0 ? 6 : day -2));
    return monday;
};

const getWeekData = (date, dailyStats) => {
    const monday = getStartOfWeek(date);
    
    return Array.from({ length: 7 }).map((_, index) => {
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + index);
        const formattedDate = formatDate(currentDate);

        const { late = false, absent = false, earlyLeave = false, startDate, endDate } = dailyStats[formattedDate] || {};

        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = startDate && endDate ? calculateWorkingHours(startDate, endDate) : 'N/A';

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

        const dayOfWeek = currentDate.getDay();
        let backgroundColor = 'white';
        let textColor = 'black';

        // Change color based on the day of the week
        if (dayOfWeek === 1) { // Sunday
            textColor = 'red';
        } else if (dayOfWeek === 0) { // Saturday
            textColor = 'blue';
        }

        return {
            title,
            date: formattedDate,
            extendedProps: { backgroundColor, textColor }
        };
    });
};

const calculateWorkingHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffMs = end - start;
    if (diffMs < 0) return 'N/A'; // Invalid time

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}시간 ${diffMinutes}분`;
};

const WeeklyStats = ({ memberId }) => {
    const { stats, dailyStats } = useWeeklyStats(memberId);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const getWeekDataFromStats = useCallback(() => {
        const { startOfWeek } = getWeekRange(currentDate);
        const weekData = getWeekData(startOfWeek, dailyStats);
        setEvents(weekData);
    }, [currentDate, dailyStats]);

    useEffect(() => {
        getWeekDataFromStats();
        console.log("Events array:", events); // 콘솔에 events 배열을 출력하여 디버깅
    }, [getWeekDataFromStats]);

    const getWeekRange = (date) => {
        const startOfWeek = getStartOfWeek(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
    };

    const handleDatesSet = (info) => {
        const newStart = info.view.currentStart;
        if (newStart && newStart.getTime() !== currentDate.getTime()) {
            setCurrentDate(newStart);
        }
    };

    return (
        <div>
            <h2>주간 통계</h2>
            <div>
                <p>지각 횟수: {stats.lateCount}</p>
                <p>결근 횟수: {stats.absentCount}</p>
                <p>조기 퇴근 횟수: {stats.earlyLeaveCount}</p>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                locales={[koLocale]}
                locale="ko"
                selectable={true}
                height="auto"
                events={events}
                firstDay={1} // 월요일을 주의 시작일로 설정
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
                datesSet={handleDatesSet}
            />
        </div>
    );
};

export default WeeklyStats;
