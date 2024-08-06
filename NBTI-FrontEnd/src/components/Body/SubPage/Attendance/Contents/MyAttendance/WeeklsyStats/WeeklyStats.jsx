import React from 'react';
import styles from './WeeklyStats.module.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import useWeeklyStats from './useWeeklyStats';

// 시간 포맷 함수
const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('ko-KR', options);
};

// 날짜 포맷 함수
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

// 요일 계산 함수 (월요일을 주의 시작일로 설정)
const getDayOfWeek = (date) => (date.getDay() + 6) % 7; // 0 (월요일)부터 6 (일요일)

const WeeklyStats = ({ memberId }) => {
    const { stats, dailyStats } = useWeeklyStats(memberId);

    console.log("Received stats:", stats); // 데이터 확인용 로그
    console.log("Received dailyStats:", dailyStats); // 데이터 확인용 로그

    const { lateCount, absentCount, earlyLeaveCount } = stats;

    // FullCalendar 이벤트 데이터 생성
    const events = Array.from({ length: 7 }).map((_, index) => {
        // 현재 주의 시작일을 기준으로 날짜 계산 (월요일 시작)
        const date = new Date();
        const currentDay = date.getDay();
        const daysToMonday = (currentDay === 0 ? -6 : 1 - currentDay);
        date.setDate(date.getDate() + daysToMonday + index);
        const formattedDate = formatDate(date);

        // dailyStats에서 데이터 가져오기
        const { late = false, absent = false, earlyLeave = false, startDate, endDate } = dailyStats[formattedDate] || {};

        // 시간 및 근무 시간 계산
        const startTime = startDate ? formatTime(startDate) : 'N/A';
        const endTime = endDate ? formatTime(endDate) : 'N/A';
        const workingHours = startDate && endDate ? `${((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60)).toFixed(2)} 시간` : 'N/A';

        const title = `출근: ${startTime}\n퇴근: ${endTime}\n근무 시간: ${workingHours}\n`;

        const dayOfWeek = getDayOfWeek(date); // 0: 월요일, 6: 일요일

        let backgroundColor = 'white'; // 기본 배경색
        let textColor = 'black'; // 기본 텍스트 색상

        if (dayOfWeek === 6) {
            textColor = 'red'; // 텍스트 색상
        } else if (dayOfWeek === 5) {
            textColor = 'blue'; // 텍스트 색상
        }

        return {
            title, // 제목을 문자열로 설정
            date: formattedDate,
            extendedProps: { backgroundColor, textColor } // 추가 속성 설정
        };
    });

    return (
        <div className={styles.container}>
            <h2>주간 통계</h2>
            <div className={styles.stats}>
                <p>지각 횟수: {lateCount}</p>
                <p>결근 횟수: {absentCount}</p>
                <p>조기 퇴근 횟수: {earlyLeaveCount}</p>
            </div>
            <div className='minical'>
                {/* 미니 주간 캘린더 */}
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridWeek"
                    headerToolbar={false}
                    locales={[koLocale]}
                    locale="ko"
                    selectable={true}
                    height="auto"
                    events={events} // 이벤트 데이터 추가
                    firstDay={1} // 월요일을 주의 시작일로 설정
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

export default WeeklyStats;
