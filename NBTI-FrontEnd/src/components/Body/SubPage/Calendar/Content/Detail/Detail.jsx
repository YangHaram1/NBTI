import styles from './Detail.module.css'
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일



export const Detail = ()=>{

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    //모달창 열기
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    };
    //모달창 닫기
    const closeModal = () => {
        setModalOpen(false);
        setSelectedDate(null);
    };

        return(
            <div className={styles.calender}>
                <div className={styles.innerCalender}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[koLocale]} // 한국어 로케일 설정
                    locale="ko" // 로케일 설정
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay' //월 주 일 
                    }}
                    events={[
                        { title: 'Meeting', start: new Date() },
                        { title: "캘린더", start: "2024-07-21" },
                        { title: "실행됨", start: "2024-07-24" },
                    ]}
                    dateClick={handleDateClick}
                    />
                </div>

                {modalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>일정 추가</h2>
                        <div className={styles.modalInner}>
                            <div>
                                <p>캘린더</p>
                                <select>
                                    <option>어쩌고</option>
                                    <option>저쩌고</option>
                                </select>
                            </div>
                            <div> 
                                <p>시작</p>
                                <input type="date" className={styles.inputBox}/>
                                <div className={styles.dateBox}>
                                    <input type="time" id="startTime" name="startTime" />
                                </div>
                            </div>
                            <div> 
                                <p>종료</p>
                                <input type="date" className={styles.inputBox} />   
                                <div className={styles.dateBox}>
                                    <input type="time" id="endTime" name="endTime" />
                                </div>
                            </div>
                            <div>
                                <p>내용</p>
                                <input type="text" />
                            </div>
                            <div>
                                <button>저장</button>
                                <button onClick={closeModal}>닫기</button>
                            </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        )
}