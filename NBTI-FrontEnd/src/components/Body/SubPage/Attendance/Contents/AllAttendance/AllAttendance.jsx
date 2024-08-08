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

export const AllAttendance = () => {
    const { stats, loading } = useAllWeeklyStats();

    if (loading) {
        return <div>Loading...</div>;
    }

    // 현재 날짜와 주 시작일 계산
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);

    // FullCalendar 이벤트 데이터 생성
    const events = Object.keys(stats).flatMap(memberId => {
        const { name, team_name, records } = stats[memberId] || {};
        return Array.from({ length: 7 }).map((_, index) => {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + index);
            const formattedDate = formatDate(date);

            const { late = false, absent = false, earlyLeave = false, startDate, endDate } = records[formattedDate] || {};

            const startTime = startDate ? formatTime(startDate) : 'N/A';
            const endTime = endDate ? formatTime(endDate) : 'N/A';
            const workingHours = calculateWorkingHours(startDate, endDate);

            const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

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
                extendedProps: { backgroundColor, textColor, dayOfWeek, name, team_name }
            };
        });
    });

    return (
        <div className={styles.container}>
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
                    const isMonday = event.extendedProps.dayOfWeek === 0; // 월요일인지 확인
                    return (
                        <div
                            className={styles.eventContent}
                            style={{ backgroundColor: event.extendedProps.backgroundColor, color: event.extendedProps.textColor }}
                        >
                            {isMonday && (
                                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                    <div>이름: {event.extendedProps.name}</div>
                                    <div>부서: {event.extendedProps.team_name}</div>
                                </div>
                            )}
                            <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
                                {lines.map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
};
