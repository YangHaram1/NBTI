import styles from './Calendar.module.css'
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import { useState } from 'react';
import ChatStyles from '../Chat.module.css';

const Calendar = ({ setSelectedDate }) => {
    const [events, setEvents] = useState([]); // 이벤트 상태

    const handleDateClick = (dateStr) => {
        const newEvent = { title: '선택', start: dateStr, backgroundColor: '#ffeb3b' };
        setEvents([newEvent]);
        setSelectedDate(dateStr); // 클릭된 날짜를 state로 설정
    };

    function handleEventMount(arg) {
        const dateStr = arg.date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식으로 날짜 추출
        // 특정 클래스명을 가진 요소들 모두 가져오기
        console.log(arg)
        const elements = document.getElementsByClassName(ChatStyles.dateSeparator);
        Array.from(elements).forEach(e => { // 요소 확인
            // 여기서 원하는 작업을 수행할 수 있습니다.
            if (e.innerHTML === dateStr) {
                arg.el.style.backgroundColor = '#f0f0f0';
                arg.el.style.cursor="pointer";
                arg.el.onclick = function() {
                    handleDateClick(dateStr);
                };
            }
           
        });
    }
    return (
        <div className={styles.container}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[koLocale]}
                locale="ko"
                // dayMaxEventRows={1} // 각 날짜 셀에 표시되는 이벤트를 1개로 제한
                // hiddenDays={[0, 6]} // 0: 일요일, 6: 토요일 안 보이게 설정
                headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'prev,today,next'
                }}
                //일정 추가 이벤트
                events={events}
               // dateClick={handleDateClick}
                dayCellDidMount={handleEventMount}

            />
        </div>
    )
}
export default Calendar;