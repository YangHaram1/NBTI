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
                        color: '#A4C3B2', 
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
            <div className={styles.reservationContent}>
                <div className={styles.customTitle}>
                    차량
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridDay"
                    locales={[koLocale]} // 한국어 로케일 설정
                    locale="ko"
                    height="auto"
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'prev,today,next'
                    }}
                    slotDuration="00:30:00"
                    slotLabelInterval="00:30:00"
                    allDaySlot={false}
                    selectMirror={true}
                    events={events}
                    displayEventEnd={true}
                />
            </div>
        </div>

        
    );
    
}
