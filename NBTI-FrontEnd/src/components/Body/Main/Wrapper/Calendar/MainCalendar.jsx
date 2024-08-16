import styles from './MainCalendar.module.css'
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCalendarList } from '../../../../../store/store';
import { host } from '../../../../../config/config';


export const MainCalendar = () => {

    const { setCalendarList } = useCalendarList();
    const [ events, setEvents ] = useState([]); // 이벤트 상태

        // 캘린더 목록 출력
        useEffect(() => {
            axios.get(`${host}/calendar`)
                .then((resp) => {
                    const eventList = resp.data.map(event => {

                        let color = '';
                        // calendar_title_code에 따른 색상 설정
                        if(event.calendar_name == 1 ){
                            color='#33A150';
                        }else{
                            color='#E04038';
                        }
    
                        return {
                            seq: event.seq,
                            title: event.title,
                            start: event.start_date,
                            end: event.end_date,
                            color : color,
                        }
                    });
                    
                    setEvents(eventList);
                    setCalendarList(eventList); //사이드 목록
                })
                .catch((error) => {
                    console.error('calendar Error :', error);
                });
        }, []); 

        // 이벤트 내용 커스터마이징
        const renderEventContent = (eventInfo) => {
            const isSingleDay = eventInfo.event.startStr === eventInfo.event.endStr; // 하루 일정인지 확인

            if (isSingleDay) {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ backgroundColor: eventInfo.event.backgroundColor, borderRadius: '50%', width: '10px', height: '10px', margin: '0 auto' }}></div>
                        <div>{eventInfo.event.title}</div> 
                    </div>
                );
            } else {
                // 하루 이상 일정일 경우 원래처럼 표시
                return (
                    <div>
                        <div style={{ backgroundColor: eventInfo.event.backgroundColor, borderRadius: '5px', padding: '5px' }}>
                            {eventInfo.event.title}
                        </div>
                    </div>
                );
            }
        };

        return(
            <div className={`${styles.calendar_container} mini_calendar_container`}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[koLocale]} 
                    locale="ko" 
                    dayMaxEventRows={1} // 각 날짜 셀에 표시되는 이벤트를 1개로 제한
                    hiddenDays={[0, 6]} // 0: 일요일, 6: 토요일 안 보이게 설정
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'prev,today,next' 
                    }}
                    //일정 추가 이벤트
                    events={events}
                    eventContent={renderEventContent} // 이벤트 내용 커스터마이징
                />
            </div>
        )
}