import React from 'react';
import styles from './MonthlyStats.module.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';

// 시간 포맷 함수
const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

// 날짜 포맷 함수
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

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

export const MonthlyStats = ({ stats, dailyStats }) => {
    const { lateCount, absentCount, earlyLeaveCount } = stats;

    // FullCalendar 이벤트 데이터 생성
    const events = Object.keys(dailyStats).map((date) => {
        const { late = false, absent = false, earlyLeave = false, startDate, endDate } = dailyStats[date];

        // 시간 및 근무 시간 계산
        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = calculateWorkingHours(startDate, endDate);

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

        let backgroundColor = 'white';
        let textColor = 'black';

        // 지각, 결근, 조기 퇴근에 따라 색상 설정
        if (late) backgroundColor = 'rgba(255, 178, 44, 0.4)'; // 지각
        if (absent) backgroundColor = 'rgba(255, 0, 0, 0.4)'; // 결근
        if (earlyLeave) backgroundColor = 'rgba(0, 255, 0, 0.4)'; // 조기 퇴근

        return {
            title,
            date,
            extendedProps: { backgroundColor, textColor }
        };
    });

    return (
        <div className={styles.container}>
            <h2>월간 통계</h2>
            <div className={styles.stats}>
                <p>지각 횟수: {lateCount}</p>
                <p>결근 횟수: {absentCount}</p>
                <p>조기 퇴근 횟수: {earlyLeaveCount}</p>
            </div>
            <div className='minical'>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
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
    );
};


