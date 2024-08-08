import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useCalendarList } from "../../../../../store/store";
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일


export const Side = ({ setAddOpen , setCalendarModalOpen }) => {

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

  // === 모달창 ===
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
  const { selectedItem, setSelectedItem , calendarList, setCalendarList , setCalendarSelectList } = useCalendarList();
  
  // 공유 일정 [+]
    const handleCalendarAddClick = () => {
      setCalendarModalOpen(true); // 모달 열기
  };

  //전체 캘린더
  const fullCalendar = ()=>{
    setCalendarSelectList(calendarList)
    // console.log("calendarList: "+ JSON.stringify(calendarList));
  }
  
  //내 캘린더
  const myCalender = ()=>{
      setCalendarSelectList(calendarList.filter((item)=>{
        console.log(JSON.stringify(item))
        return item.extendedProps.calendar_title_code === 1; 
      }))
  }

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
            <ul
              className={`${styles.submenu} ${NoticeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              {selectedItem.map((item) => ( 
            <li key={item.seq}> {/* seq는 고유 식별자로 사용 */}
              <span>
                <i className="fa-solid fa-star fa-sm"></i>
              </span>
              <span>{item.name}</span> 
            </li>
          ))}
            </ul>
          </li>
        </ul>
      </div>     
    </div>
  );
};
