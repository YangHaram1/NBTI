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

// 기본 이벤트 생성 함수
const createDefaultEvent = (date, memberName, teamName) => {
    return {
        title: `출근: N/A\n퇴근: N/A\n근무 시간: N/A\n`,
        date,
        extendedProps: {
            backgroundColor: 'gray',
            textColor: 'white',
            dayOfWeek: getDayOfWeek(new Date(date)),
            memberName,
            teamName
        }
    };
};

export const AllAttendance = () => {
    const { stats, loading } = useAllWeeklyStats();

    if (loading) {
        return <div>Loading...</div>;
    }

    // 현재 날짜와 주 시작일 계산
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);

    // 멤버 목록을 추출하여 이름과 팀명 저장
    const members = Object.keys(stats).map(memberId => {
        const memberStats = stats[memberId] || {};
        const hasAttendance = Object.keys(memberStats).length > 0;
        return {
            memberId,
            name: hasAttendance ? memberStats[Object.keys(memberStats)[0]].name : 'N/A',
            teamName: hasAttendance ? memberStats[Object.keys(memberStats)[0]].team_name : 'N/A'
        };
    });

    // 월요일에 표시할 이벤트 생성
    const events = members.flatMap(({ memberId, name, teamName }) => {
        return Array.from({ length: 7 }).map((_, index) => {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + index);
            const formattedDate = formatDate(date);

            const { startDate, endDate } = stats[memberId]?.[formattedDate] || {};

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

            // 월요일에 출근 기록이 없더라도, 다른 날짜에 출근 기록이 있는 경우에만 표시
            if (dayOfWeek === 0) {
                const hasAttendance = Object.keys(stats[memberId] || {}).length > 0;
                if (!hasAttendance) {
                    return createDefaultEvent(formattedDate, name, teamName);
                }
            }

            return {
                title,
                date: formattedDate,
                extendedProps: {
                    backgroundColor,
                    textColor,
                    dayOfWeek,
                    memberName: name,
                    teamName
                }
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
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div>이름: {event.extendedProps.memberName}</div>
                                    <div>부서: {event.extendedProps.teamName}</div>
                                </div>
                            )}
                            <div style={{ display: "flex", flexDirection: "column" }}>
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
