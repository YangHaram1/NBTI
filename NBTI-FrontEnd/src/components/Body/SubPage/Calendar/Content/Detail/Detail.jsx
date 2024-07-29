import styles from './Detail.module.css';
import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import axios from 'axios';
import { host } from '../../../../../../config/config';

export const Detail = ({ setAddOpen, addOpen }) => {

    const [modalOpen, setModalOpen] = useState(false); // 모달창 열기/닫기 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
    const [insert, setInsert] = useState({ title: 0, calendarTitle : '', contents: '', start_date: '', start_time: '', end_date: '', end_time: '' }); // 입력 데이터 상태
    
    //입력된 값을 insert 상태에 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsert((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {

        // 사용자가 입력한 시작 날짜, 시작 시간, 종료 날짜, 종료 시간 가져옴 
        const { start_date, start_time, end_date, end_time } = insert;
    
        // 날짜와 시간이 모두 입력되었는지 확인
        if (!start_date || !start_time || !end_date || !end_time) {
            return;
        }
    
        // 날짜와 시간 합치기
        const startDate = new Date(`${start_date}T${start_time}:00`);
        const endDate = new Date(`${end_date}T${end_time}:00`);

        // Date 객체를 ISO 형식의 문자열로 변환하고 변환된 문자열에서 'Z' 제거
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Invalid date or time value');
            return;
        }
    
        const updatedInsert = {
            ...insert,
            start_date: startDate.toISOString().replace('Z', ''),
            end_date: endDate.toISOString().replace('Z', '')
        };
    
        console.log('입력 data:', updatedInsert);
        axios.post(`http://192.168.1.8/calendar`, updatedInsert)
            .then((resp) => {
                console.log(resp)
                setInsert({ title: 0, calendarTitle : '', contents: '', start_date: '', start_time: '', end_date: '', end_time: '' });
                setModalOpen(false);
                setAddOpen(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    
    
    
    

    // 모달창 열기
    const handleDateClick = (arg) => {
        setModalOpen(true);
        setSelectedDate(arg.dateStr); // 현재 날짜 받아오기
        setInsert((prev) => ({ ...prev, start_date: arg.dateStr}));
        setAddOpen(true);
    };

    // 모달창 닫기
    const closeModal = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setAddOpen(false);
    };
    // 인쇄할 내용을 담을 ref 추가
    const calendarRef = useRef();
    // 인쇄 기능
    const handlePrint = () => {
        const printWindow = window.open('', '_blank'); // 새 창 열기
        const content = calendarRef.current.innerHTML; // 현재 캘린더 내용 가져오기
        printWindow.document.write(`
            <html>
                <head>
                    <title>캘린더 인쇄</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        h1 {
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <h1>캘린더 인쇄</h1>
                    ${content}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print(); // 인쇄 창 띄우기
    };


    

    return (
        <div className={styles.calender}>
            <div className={styles.innerCalender}>
            <div className={styles.innerCalender} ref={calendarRef}> {/* ref 추가 */}
                <button onClick={handlePrint}>인쇄하기</button> {/* 인쇄 버튼 추가 */}
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[koLocale]} // 한국어 로케일 설정
                    locale="ko" // 로케일 설정
                    selectable="true" //달력일자 드래그 설정  
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay' // 월 주 일
                    }}
                    //일정 추가 이벤트
                    events={[
                        { title: 'Meeting', start: new Date() },
                        { title: "캘린더", start: "2024-07-21" },
                        { title: "실행됨", start: "2024-07-24" },
                    ]}
                    dateClick={handleDateClick}
                />
                </div>
            </div>

            {(addOpen || modalOpen) && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>일정 추가</h2>
                        <div className={styles.modalInner}>
                            <div>
                                <p>캘린더</p>
                                <select value={insert.title} name="title" onChange={handleChange}>
                                    <option value="">선택하세요</option>
                                    <option value="1">어쩌고</option>
                                    <option value="2">저쩌고</option>
                                </select>
                            </div>
                            <div>
                                <p>제목</p>
                                <input type="text" value={insert.calendarTitle} name="calendarTitle" onChange={handleChange}/>
                            </div>
                            <div>
                                <p>시작</p>
                                <input type="date" className={styles.inputBox} value={insert.start_date} name="start_date" onChange={handleChange}/>
                                <div className={styles.dateBox}>
                                    <input type="time" id="startTime" name="start_time" value={insert.start_time} onChange={handleChange}/>
                                </div>
                            </div>
                            <div>
                                <p>종료</p>
                                <input type="date" className={styles.inputBox} value={insert.end_date} name="end_date" onChange={handleChange}/>
                                <div className={styles.dateBox}>
                                    <input type="time" id="endTime" name="end_time" value={insert.end_time} onChange={handleChange}/>
                                </div>
                            </div>
                            <div>
                                <p>내용</p>
                                <input type="text" value={insert.contents} name="contents" onChange={handleChange}/>
                            </div>
                            <div>
                                <button onClick={handleSave}>저장</button>
                                <button onClick={closeModal}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
