import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useCalendarList } from "../../../../../store/store";
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import axios from "axios";
import { host } from "../../../../../config/config";


export const Side = ({ setAddOpen , setCalendarModalOpen}) => {

  // === 공통 메뉴 토글 ===
  const [FreeBoard, setFreeBoard] = useState(true);
  const [NoticeBoard, setNoticeBoard] = useState(false);
  const toggleFreeBoard = () => {
    setFreeBoard(!FreeBoard);
  };
  const toggleNoticeBoard = () => {
    setNoticeBoard(!NoticeBoard);
  };

  // === 아이콘 ===
  useEffect(() => {
    // 외부 스타일시트를 동적으로 추가
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(link);

    // 컴포넌트가 언마운트될 때 스타일시트를 제거
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  // ===== 모달창 =====
  // const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  //모달창 열기
  const handleDateClick = (arg) => {
      setSelectedDate(arg.dateStr);
      setAddOpen(true);
  };
  //모달창 닫기
  const closeModal = () => {
    setAddOpen(false);
      setSelectedDate(null);
  };


  // store
  const { calendarList, setCalendarSelectList ,publicList, setPublicList,setPrivateList} = useCalendarList();
  
  
  // ===== 전체 =====
  const fullCalendar = ()=>{
    setCalendarSelectList(calendarList)
    console.log("side 전체 캘린더: "+ JSON.stringify(calendarList));
  }


  // ===== 개인 =====
  const myCalender = ()=>{
    setCalendarSelectList(calendarList.filter((item)=>{
      console.log("myCalender :"+JSON.stringify(item))
      console.log("side 개인 캘린더:"+item.extendedProps.calendar_title);
      return item.extendedProps.calendar_title_code == '1'; 
    }))
  }


  // ===== 공유 =====
  // [+] 버튼
    const handleCalendarAddClick = () => {
      console.log("1")
      setCalendarModalOpen(true); // 모달 열기
  };

  // 목록 출력
  useEffect(() => {
    axios.get(`${host}/calendarList`)
        .then((resp) => {
            console.log('공유 일정 목록 가져오기 :'+ JSON.stringify(resp.data));

            // 새로운 배열 생성
            const newPrivateList = [];
            const newPublicList = [];

            // 각 이벤트를 분류하고 배열에 추가
            resp.data.forEach(event => {
                if (event.calendar_type === 'private') {
                    newPrivateList.push(event.calendar_name); 
                } else if (event.calendar_type === 'public') {
                    newPublicList.push(event.calendar_name); 
                }
            });

            // 최종적으로 한 번에 상태 업데이트
            setPrivateList(newPrivateList); 
            setPublicList(newPublicList); 
        })
        .catch((error) => {
            console.error("error :", error);
        });
  }, []);
  

  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={handleDateClick}>
          <i className="fa-solid fa-plus"></i>
          <p>일정추가</p>
        </button>
      </div>
      <div className={`${styles.mini} dayGridWeek`}>
        {/* 미니 주간 캘린더 */}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          headerToolbar={false}
          locales={[koLocale]}
          locale="ko"
          selectable={true}
          height="auto"
        />
      </div>
      {/* 사이드 메뉴 */}
      <div className={styles.menus}>
        <ul>
          <li onClick={toggleFreeBoard}>
            <i className="fa-solid fa-user-large"></i>캘린더
            <ul
              className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li onClick={fullCalendar}>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>전체 캘린더</span>
              </li>
              <li onClick={myCalender}>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>내 캘린더</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li onClick={toggleNoticeBoard}>
            <i className="fa-solid fa-people-group"></i>공유 일정 <i className="fa-solid fa-plus" id={styles.plus} onClick={handleCalendarAddClick}/>
            <ul className={`${styles.submenu} ${NoticeBoard ? styles.open : ""}`} onClick={preventPropagation}>
              {publicList.map((calendar, index) => ( 
                  <li key={index}> 
                      <span>
                          <i className="fa-solid fa-star fa-sm"></i>
                      </span>
                      <span>{calendar}</span> 
                  </li>
              ))}

            </ul>
          </li>
        </ul>
      </div>     
    </div>
  );
};
