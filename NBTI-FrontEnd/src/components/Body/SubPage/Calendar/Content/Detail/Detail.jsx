import styles from './Detail.module.css';
import { host } from '../../../../../../config/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCalendarList } from '../../../../../../store/store';

import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주 및 일 보기 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 이벤트를 위한 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import Members from './Members/Members';



export const Detail = ({ setAddOpen, addOpen, calendarModalOpen,setCalendarModalOpen}) => {
    // 사이드 바 메뉴 공유 일정 상태
    const { setSelectedItem , setCalendarList , calendarSelectList } = useCalendarList();

    // const calendarRef = useRef(); // 캘린더 내용 참조를 위한 ref
    const [modalOpen, setModalOpen] = useState(false); // 모달창 열기/닫기 상태
    const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
    const [insert, setInsert] = useState({ title: '', calendar_title_code : '', contents: '', start_date: '', start_time: '', end_date: '', end_time: '' }); // 입력 데이터 상태
    const [events, setEvents] = useState([]); // 이벤트 상태
    const [selectedEvent, setSelectedEvent] = useState(null); // 캘린더 (일정/일정추가) 선택된 이벤트 상태

    // 내 일정을 수정하는 걸 관리해주는 상태 
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태 추가
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContents, setEditedContents] = useState('');

    // 인쇄
    const handlePrint = () => {
        window.print(); // 브라우저의 기본 인쇄 다이얼로그 표시
    };


    // 모달창 [열기]
    const handleDateClick = (arg) => {
        setModalOpen(true);  // 모달창 열기
        setSelectedDate(arg.dateStr); // 현재 날짜 받아오기
        setInsert((prev) => ({ ...prev, start_date: arg.dateStr}));
        setAddOpen(true); // 일정 추가 모달 열기
        setSelectedEvent(null); // 일정 추가할 때 선택된 이벤트 초기화
        setCalendarModalOpen(true); // 공유 일정 모달창
    };
    // 모달창 [닫기]
    const closeModal = () => {
        setModalOpen(false); // 모달창 닫기
        setSelectedDate(null);
        setAddOpen(false); // 일정 추가 모달 닫기 
        setSelectedEvent(null); // 선택된 이벤트 초기화
        setCalendarModalOpen(null) // 공유 일정 모달창
    };


    // 입력된 값을 insert 상태에 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsert((prev) => ({
            ...prev,
            [name]: name === 'calendar_title_code' ? Number(value) : value // title은 number 타입으로 변환
        }));
    };

    // 일정 추가
    const handleSave = () => {
        console.log(JSON.stringify(insert));
        // 사용자가 입력한 시작 날짜, 시작 시간, 종료 날짜, 종료 시간, 제목 등 가져와서
        const { start_date, start_time, end_date, end_time, calendar_title_code, title, contents } = insert;
        // 모두 입력되었는지 확인
        if (!start_date || !start_time || !end_date || !end_time || !calendar_title_code || !title) {
            alert('모든 필드를 입력!');
            return;
        }
    
        // 날짜와 시간 합치기
        const startDate = new Date(`${start_date}T${start_time}:00`);
        const endDate = new Date(`${end_date}T${end_time}:00`);
    
        // Date 객체를 ISO 형식의 문자열로 변환하고, 이를 Timestamp로 변환
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('time');
            return;
        }

        // 현재 시간 구하기
        const now = new Date();
        // 과거 날짜 체크
        if (startDate < now) {
            alert('시작 날짜와 시간은 현재 시간 이후여야 합니다.');
            return;
        }
        // 종료 시간 체크
        if (endDate <= startDate) {
            alert('종료 시간은 시작 시간 이후여야 합니다.');
            return;
        }
        // Date 객체를 ISO 형식의 문자열로 변환하고, 이를 Timestamp로 변환
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('time');
            return;
        }
    
        // 서버에 데이터 전송
        const postData = {
            title: title, 
            calendar_title_code: calendar_title_code, 
            contents: contents || '', 
            start_date: startDate, 
            end_date: endDate 
        };
        //console.log('전송할 데이터:', postData);
    
        axios.post(`${host}/calendar`, postData)
            .then((resp) => {
                // console.log(`${resp.data} 응답` );

                // 캘린더에 이벤트 추가 (UI)
                setEvents(prev => [
                    ...prev,
                    {
                    
                        color : calendar_title_code == 1 ? "rgba(164, 195, 178, 10)" : calendar_title_code === 2 ? "rgba(255, 178, 44, 10)" : "rgba(255, 178, 44, 10)",
                        // seq: seq,
                        title: title, //제목
                        start: startDate, //사작
                        end: endDate, //끝
                        extendedProps: { //내용
                            contents: contents
                        }
                    }
                ]);

                // 모달 상태 초기화
                setInsert({ title: '', calendar_title_code: '', contents: '', start_date: '', start_time: '', end_date: '', end_time: '' });
                setModalOpen(false);
                setAddOpen(false);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    };


    // 내 일정 수정
    const updateBtn = () => {
        setIsEditing(true); // 편집 모드로 전환
        setEditedTitle(selectedEvent.calendarTitle); // 선택된 이벤트의 제목을 편집 제목 상태로 설정
        setEditedContents(selectedEvent.extendedProps.contents || ''); // 선택된 이벤트의 내용을 편집 내용 상태로 설정
    };
    const handleSaveClick = () => {
        console.log(JSON.stringify(selectedEvent));
        // console.log(selectedEvent.extendedProps.seq + ":" + editedTitle + ":" +editedContents);

        const updateData = {
            seq: selectedEvent.extendedProps.seq,
            calendarTitle: editedTitle,
            contents: editedContents
        };
    
        axios.put(`${host}/calendar`, updateData)
            .then((resp) => {
                console.log(resp.data + " 수정 완료");
    
                selectedEvent.setProp('title', editedTitle);
                selectedEvent.setExtendedProp('contents', editedContents);
    
                setIsEditing(false); // 편집 모드 종료
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // 목록 출력
    useEffect(() => {
        axios.get(`${host}/calendar`)
            .then((resp) => {
                console.log(JSON.stringify(resp.data) + "목록 출력!");
                const eventList = resp.data.map(event => {
                    let color = '';
                    if(event.calendar_title_code == 1 ){
                        color='rgba(164, 195, 178, 10)';
                    }else{
                        color='rgba(255, 178, 44, 10)';
                    }

                    return {
                        seq: event.seq,
                        title: event.title,
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

    // 상세 내용 보기 
    const handleEventClick = (info) => {
        console.log("info:" + JSON.stringify(info.event));
    
        setSelectedEvent(info.event); // 선택한 이벤트 저장
        setModalOpen(true); // 상세보기 모달 열기
        setAddOpen(false); // 일정 추가 모달 닫기
    };

    useEffect(() => {
        console.log(selectedEvent);
        if (selectedEvent) {
            setEditedTitle(selectedEvent.title);
            setEditedContents(selectedEvent.extendedProps.contents || '');
        }
    }, [selectedEvent]);
    
    
    //삭제
    const delModal = () => {
        console.log(JSON.stringify(selectedEvent) + ": del 콘솔찍기");
        const seq = selectedEvent.extendedProps.seq; // seq 가져오기
        console.log(seq + "del 테스트");
        
        axios.delete(`${host}/calendar/${seq}`)
            .then((resp) => {
                console.log("삭제 성공: " + resp.data);
                // 이벤트 목록에서 삭제된 이벤트 제거
                setEvents((prevEvents) => prevEvents.filter(event => event.seq !== seq));
                closeModal(); // 모달 닫기
            })
            .catch((error) => {
                console.error("삭제 실패:", error);
            });
    }
    


    //사이드 캘린더 추가
    const [calendarName, setCalendarName] = useState(''); // 캘린더 이름 상태
    const handleCalendarNameChange = (e) => {
        setCalendarName(e.target.value); // 입력값을 상태에 저장
    };

    useEffect(()=>{
        setEvents(calendarSelectList)
    },[calendarSelectList]) 

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

                    // 기본 (월)
                    dayMaxEventRows={3} // 각 날짜 셀에 표시되는 이벤트를 5개로 제한
                    moreLinkText="..." // "+n more" 링크에 표시되는 텍스트
                    // 뷰가 변경될 때마다 호출되는 핸들러 (주/일)
                    datesSet={(info) => {
                        if (info.view.type === 'dayGridMonth') {
                            // 월 뷰에서는 dayMaxEventRows와 moreLinkText 활성화
                            info.view.calendar.setOption('dayMaxEventRows', 3);
                            info.view.calendar.setOption('moreLinkText', '...');
                        } else {
                            // 주 뷰 또는 일 뷰에서는 해당 옵션 비활성화
                            info.view.calendar.setOption('dayMaxEventRows', false);
                            info.view.calendar.setOption('moreLinkText', '');
                        }
                    }}

                    headerToolbar={{
                        left: 'print dayGridMonth,dayGridWeek,dayGridDay', // 전/후 달로 이동, 오늘로 이동, 인쇄
                        center: 'title',
                        right: 'prev,today,next' // 월 주 일
                    }}

                    customButtons={{
                        print: {
                            text: '인쇄하기',
                            click: handlePrint // 인쇄 함수 연결
                        }
                    }}

                    //일정 추가 이벤트
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick} // 이벤트 클릭 시 상세 정보 보기
                />
            </div>
            {/* 일정추가 모달창과 제목수정 서로 충돌방지 조건 */}
            {(addOpen || modalOpen) && !calendarModalOpen &&(
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    {selectedEvent ? ( // 이벤트가 선택된 경우
                        <>
                            <h2>일정 상세보기</h2>
                            {isEditing ? ( //수정 누르면 수정
                                <div className={styles.modalInner}>
                                    <div className={styles.detail}>
                                        <p>{selectedEvent.extendedProps.calendar_title_code === 1 ? '내 캘린더' : '공유 캘린더'}</p>
                                        <hr/>
                                        <p>
                                            제목 : <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                                        </p>
                                        <p>시작 : {selectedEvent.start.toLocaleString()}</p>
                                        <p>종료 : {selectedEvent.end ? selectedEvent.end.toLocaleString() : '없음'}</p>
                                        <p>
                                            내용 : <input type="text" value={editedContents} onChange={(e) => setEditedContents(e.target.value)} />
                                        </p>
                                        <div className={styles.detailBtn}>
                                            <button onClick={() => setIsEditing(false)}>취소</button>
                                            <button onClick={handleSaveClick}>저장</button>
                                        </div>
                                    </div>
                                </div>
                            ) : ( // 수정 누르기 전 
                                <div className={styles.modalInner}>
                                <div className={styles.detail}>
                                    <p>{selectedEvent.extendedProps.calendar_title_code === 1 ? '내 캘린더' : '공유 캘린더'}</p>
                                    <hr/>
                                    <p>제목 : {selectedEvent.title}</p>
                                    <p>시작 : {selectedEvent.start.toLocaleString()}</p>
                                    <p>종료 : {selectedEvent.end ? selectedEvent.end.toLocaleString() : '없음'}</p>
                                    <p>내용 : {selectedEvent.extendedProps.contents || '없음'}</p>
                                    <div className={styles.detailBtn}>
                                        <button onClick={closeModal}>닫기</button>
                                        <button onClick={delModal}>삭제</button>
                                        <button onClick={updateBtn}>수정</button>
                                    </div>
                                </div>
                            </div>
                            
                            )}
                        </>
                    ) : ( // 이벤트가 선택되지 않은 경우, 일정 추가
                        <>
                            <h2>일정 추가</h2>
                            <div className={styles.modalInner}>
                                <div>
                                    <p>캘린더</p>
                                    <select value={insert.calendar_title_code} name="calendar_title_code" onChange={handleChange}>
                                        <option value="0" >선택하세요</option>
                                        <option value="1">내 캘린더</option>
                                        <option value="2">공유 캘린더</option>
                                    </select>
                                </div>
                                <div>
                                    <p>제목</p>
                                    <input type="text" value={insert.title} name="title" onChange={handleChange}/>
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
                        </>
                    )}
                    </div>
                </div>
            )}
            {/* 캘린더 추가 모달 */}
            {calendarModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>공유 캘린더</h2>
                        <input type="text" placeholder="캘린더 이름" value={calendarName} onChange={handleCalendarNameChange}/>
                        <p>공유 대상</p>
                        <div className={styles.groupAdd}><Members/></div>
                        <button onClick={handleSave}>추가</button>
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}

        </div>
    );
};
