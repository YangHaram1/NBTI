import styles from './Car.module.css';
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import { useEffect, useState } from 'react';
import { host } from '../../../../../../config/config';
import axios from 'axios';

export const Car = () => {
    const [events, setEvents] = useState([]); // 이벤트 상태

    useEffect(() => {
        axios.get(`${host}/reserve/carList`)
            .then((resp) => {
                console.log("목록출력" + JSON.stringify(resp.data));
                const list = resp.data.map(e => {
                    return {
                        seq: e.seq, 
                        title: e.member_id,
                        start: e.start_time, // ISO 형식
                        end: e.end_time, // ISO 형식
                        color: 'pink', 
                    }
                });
                setEvents(list); // 이벤트 상태 업데이트
            })
            .catch((error) => {
                console.error('Error fetching car list:', error);
            });
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    return (
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
                        right: 'prev,today,next'
                    }}
                    slotMinTime="07:00:00"
                    slotMaxTime="23:00:00"
                    slotDuration="00:30:00" // 슬롯의 간격을 30분으로 설정
                    slotLabelInterval="00:30:00" // 라벨 간격을 30분으로 설정
                    allDaySlot={false} // 종일 슬롯 비활성화
                    selectMirror={true}
                    events={events} // 이벤트 상태
                    displayEventEnd={true} // 끝 시간 표시 
                />
            </div>
        </div>
    )
}
