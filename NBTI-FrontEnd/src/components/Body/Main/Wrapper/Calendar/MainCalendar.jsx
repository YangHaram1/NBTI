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
    const [events, setEvents] = useState([]); // 이벤트 상태
        // 캘린더 목록 출력
        useEffect(() => {
            axios.get(`${host}/calendar`)
                .then((resp) => {
                    console.log(JSON.stringify(resp.data) + "목록 출력!");
                    const eventList = resp.data.map(event => {
                        let color = '';
                        if(event.calendar_title_code == 1 ){
                            color='rgba(164, 195, 178, 0.4)';
                        }else{
                            color='rgba(255, 178, 44, 0.4)';
                        }
    
                        return {
                            seq: event.seq,
                            title: event.calendar_title_code,
                            start: event.start_date,
                            end: event.end_date,
                            extendedProps: {
                                contents: event.contents,
                                calendar_title_code :event.calendar_title_code
                            },
                            color : color,
                        }
                    });
                    setEvents(eventList);
                    setCalendarList(eventList); //사이드 목록
                })
                .catch((error) => {
                    console.error('Error', error);
                });
        }, []); // selectedItem이 변경될 때마다 호출
        
        return(
            <div className={styles.calendar_container}>
                <FullCalendar
                    // ref={calendarRef} // 프린트
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[koLocale]} // 한국어 로케일 설정
                    locale="ko" 
                    dayMaxEventRows={1} // 각 날짜 셀에 표시되는 이벤트를 5개로 제한
                    moreLinkText="..." // "+n more" 링크에 표시되는 텍스트
                    
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'prev,today,next' // 월 주 일
                    }}
                    //일정 추가 이벤트
                    events={events}
                />
            </div>
        )
}