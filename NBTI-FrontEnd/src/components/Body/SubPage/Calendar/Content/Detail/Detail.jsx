import styles from './Detail.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일 기본 모듈 임포트
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

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
                    plugins={[ dayGridPlugin , interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[koLocale]} // 한국어 로케일 설정
                    locale="ko" // 로케일 설정

                    events={[
                        { title: "캘린더", start: "2024-07-23" },
                        { title: "실행됨", start: "2024-07-24" },
                    ]}
                    dateClick={handleDateClick}
                />
                </div>

                {modalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>일정 추가</h2>
                        <div>
                            캘린더
                            <select>
                                <option>어쩌고</option>
                                <option>저쩌고</option>
                            </select>
                        </div>
                        <div> 시작
                            <input type="date" />
                        </div>
                        <div> 종료
                            <input type="date" />   
                        </div>
                        <div>내용
                            <input type="text" />
                        </div>
                        <div>
                            <button>저장</button>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        )
}