import styles from './Detail.module.css';
import { host } from '../../../../../../config/config';
import { useEffect, useState } from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일



export const Detail = ({ setAddOpen, addOpen }) => {
    // const calendarRef = useRef(); // 캘린더 내용 참조를 위한 ref
    const [modalOpen, setModalOpen] = useState(false); // 모달창 열기/닫기 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
    const [insert, setInsert] = useState({ title: 0, calendarTitle : '', contents: '', start_date: '', start_time: '', end_date: '', end_time: '' }); // 입력 데이터 상태
    const [events, setEvents] = useState([]); // 이벤트 상태
    console.log(events+ "현재 내 이벤트")
    
    //입력된 값을 insert 상태에 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsert((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // 사용자가 입력한 시작 날짜, 시작 시간, 종료 날짜, 종료 시간, 제목 가져옴 
        const { start_date, start_time, end_date, end_time, calendarTitle, contents } = insert;
    
        // 날짜와 시간이 모두 입력되었는지 확인
        if (!start_date || !start_time || !end_date || !end_time || !calendarTitle) {
            console.error('모든 필드를 입력하세요.');
            return;
        }
    
        // 날짜와 시간 합치기
        const startDate = new Date(`${start_date}T${start_time}:00`);
        const endDate = new Date(`${end_date}T${end_time}:00`);
    
        // Date 객체를 ISO 형식의 문자열로 변환하고, 이를 Timestamp로 변환
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Invalid date or time value');
            return;
        }
    
        // 서버에 데이터 전송
        const postData = {
            // seq는 클라이언트에서 보내지 않도록 설정
            member_id: sessionStorage.getItem("loginID"), // 로그인 세션에서 ID를 가져옴
            title: 0, // 초기 값, 나중에 필요에 따라 수정
            calendarTitle: calendarTitle, // 클라이언트에서 입력한 제목
            contents: contents || '', // 클라이언트에서 입력한 내용
            start_date: startDate, // Date 객체, 서버에서 Timestamp로 변환할 수 있음
            end_date: endDate // Date 객체, 서버에서 Timestamp로 변환할 수 있음
        };
    
        console.log('전송할 데이터:', postData);
    
        axios.post(`${host}/calendar`, postData)
            .then((resp) => {
                console.log(resp);
                // 이벤트 추가
                setEvents(prev => [
                    ...prev,
                    {
                        title: calendarTitle,
                        start: startDate,
                        end: endDate
                    }
                ]);
                // 모달 상태 초기화
                setInsert({ title: 0, calendarTitle: '', contents: '', start_date: '', start_time: '', end_date: '', end_time: '' });
                setModalOpen(false);
                setAddOpen(false);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    };
    
    
    // 인쇄
    const handlePrint = () => {
        window.print(); // 브라우저의 기본 인쇄 다이얼로그 표시
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


    // useEffect(() => {
    //     axios.get(`${host}/calendar`)
    //         .then((resp) => {
    //             console.log(resp + "목록");
    //         })
    // }, []);
    useEffect(() => {
        axios.get(`${host}/calendar`)
            .then((resp) => {
                console.log(resp.data + "목록 출력");
                const eventList = resp.data.map(event => ({
                    title: event.calendarTitle,
                    start: event.start_date,
                    end: event.end_date
                }));
                setEvents(eventList);
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }, []);
    
    

    return (
        <div className={styles.calender}>
            <div className={styles.innerCalender}>
                <FullCalendar
                    // ref={calendarRef} // 프린트
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locales={[koLocale]} // 한국어 로케일 설정
                    locale="ko" 
                    selectable="true" //달력 드래그 
                    headerToolbar={{
                        left: 'prev,next today print', // 전/후 달로 이동, 오늘로 이동, 인쇄
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay' // 월 주 일
                    }}
                    customButtons={{
                        print: {
                            text: '인쇄',
                            click: handlePrint // 인쇄 함수 연결
                        }
                    }}
                    //일정 추가 이벤트
                    events={events}
                    dateClick={handleDateClick}
                />
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
