import styles from './MeetingRoom.module.css'

import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일


export const MeetingRoom = () => {
    return(
        <div className={styles.container}>
            <div className='reservationContent'>
                <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                locales={[koLocale]} // 한국어 로케일 설정
                locale="ko"
                headerToolbar={{
                    left: '', 
                    center: 'title',
                    right: 'prev,today,next' // 월 주 일
                }}
                slotMinTime="07:00:00"
                slotMaxTime="23:00:00"
                slotDuration="00:30:00" // 슬롯의 간격을 30분으로 설정
                slotLabelInterval="00:30:00" // 라벨 간격을 30분으로 설정 (시간 슬롯의 레이블을 30분 간격으로 표시)
                allDaySlot={false} // 종일 슬롯 비활성화
            />
            </div>
        </div>
    )
}