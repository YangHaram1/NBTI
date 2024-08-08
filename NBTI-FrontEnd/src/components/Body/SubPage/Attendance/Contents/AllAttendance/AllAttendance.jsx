import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import useAllWeeklyStats from './useAllAttendance';
import styles from './AllAttendance.module.css';

// 시간 포맷 함수
const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

// 날짜 포맷 함수
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

// 요일 계산 함수 (월요일을 주의 시작일로 설정)
const getDayOfWeek = (date) => (date.getDay() + 6) % 7;

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
    if (diffMs < 0) return 'N/A';

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}시간 ${diffMinutes}분`;
};

export const AllAttendance = () => {
    const { stats, loading } = useAllWeeklyStats();

    if (loading) {
        return <div>Loading...</div>;
    }

    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const events = Object.keys(stats).flatMap(memberId => {
        const memberStats = stats[memberId];
        return Array.from({ length: 7 }).map((_, index) => {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + index);
            const formattedDate = formatDate(date);

            const { late = false, absent = false, earlyLeave = false, startDate, endDate } = memberStats[formattedDate] || {};

            const startTime = startDate ? formatTime(startDate) : 'N/A';
            const endTime = endDate ? formatTime(endDate) : 'N/A';
            const workingHours = calculateWorkingHours(startDate, endDate);

            const title = ` 출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

            const dayOfWeek = getDayOfWeek(date);

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
    });

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <p>이곳에 필요한 내용을 추가하세요</p>
            </div>
            <div className={styles.calendarContainer}>
                <h2>부서별 주간 통계</h2>
                <div className={styles.calendar}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridWeek"
                        headerToolbar={false}
                        locales={[koLocale]}
                        locale="ko"
                        selectable={true}
                        height="auto"
                        events={events}
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
                    />
                </div>
            </div>
            <div className={styles.sidebar}>
                <p>이곳에 필요한 내용을 추가하세요</p>
            </div>
        </div>
    );
};
