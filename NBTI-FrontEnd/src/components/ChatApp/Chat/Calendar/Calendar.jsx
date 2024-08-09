import styles from './Calendar.module.css'
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import { useState } from 'react';

const Calendar = () => {
    const [ events, setEvents ] = useState([]); // 이벤트 상태

    return(
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
                    // dateClick={여기 클릭 이벤트 주삼}
                />
        </div>
    )
}
export default Calendar;