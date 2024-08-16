import { useState, useEffect, useRef } from "react";
import styles from "./Side.module.css";
import { useCalendarList } from "../../../../../store/store";
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import axios from "axios";
import { host } from "../../../../../config/config";


export const Side = ({ setAddOpen , setCalendarModalOpen, calendarModalOpen}) => {
  const { calendarList, setCalendarSelectList, publicList, setPublicList } = useCalendarList();
  const sharedCalendarCount = useRef(0); 
  const loginID = localStorage.getItem('loginID') || sessionStorage.getItem('loginID'); 


  // ======================== 공통 메뉴 토글 ========================
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
  // ==============================================================


  
  // 전체 캘린더 출력
  const fullCalendar = ()=>{
    // console.log("side 전체 캘린더: "+ JSON.stringify(calendarList));
    setCalendarSelectList(calendarList)
  }
  
  // 개인 캘린더만 출력
  const myCalender = ()=>{
    setCalendarSelectList(calendarList.filter((item)=>{
      // console.log("side 개인 캘린더:"+item.extendedProps.calendar_name);
      return item.extendedProps.calendar_name === '1'; 
    }))
  }

  // 공유 캘린더 출력
  const sharedCalendar = (calendar)=>{
    // console.log("side 전체 캘린더: "+ JSON.stringify(calendarList));
    // console.log("calendar_name의 JSON 문자열:", JSON.stringify(calendar));
    
    setCalendarSelectList(calendarList.filter((item) => {
      return item.extendedProps.calendar_name === calendar;
    }));
  }


  // 공유 [+] 버튼
    const handleCalendarAddClick = () => {
      if (sharedCalendarCount.current >= 7) { // 공유 캘린더 개수 체크
        alert("공유 캘린더는 최대 7개까지 추가될 수 있습니다."); 
        return;
      }
      setCalendarModalOpen(true); // 모달 열기
  };


  // 목록 출력
  const sideCalendarList = () =>{
    axios.get(`${host}/calendarList`)
        .then((resp) => {
            const privateList = [];
            const publicList = [];
  
            // 각 이벤트를 분류하고 배열에 추가
            resp.data.forEach(event => {
                if (event.calendar_type === 'private') {
                    privateList.push({
                      calendar_name:event.calendar_name, 
                      member_id:event.member_id
                    }); 
                } else if (event.calendar_type === 'public') {
                    publicList.push({
                      calendar_name:event.calendar_name,
                      member_id:event.member_id
                    }); 
                }
            });
  
            // 최종적으로 상태 업데이트
            sharedCalendarCount.current = publicList.length; // useRef를 사용하여 값 업데이트
            setPublicList(publicList);
        })
        .catch((error) => {
            console.error("error :", error);
        });
  };

  useEffect(()=>{
    sideCalendarList();
    // console.log("publicList");
  },[publicList.length])

// 삭제 핸들러
const handleDeleteSharedCalendar = (calendarName) => {
  const confirmDelete = window.confirm(`${calendarName} 캘린더를 정말 삭제하시겠습니까?`);
  if (!confirmDelete) return;

  axios.delete(`${host}/calendarList/${calendarName}`) // 삭제 요청
  .then(() => {
    // 삭제 성공 후 서버에서 목록 가져오기 
    return axios.get(`${host}/calendarList`);
  })
  .then((resp) => {
    // 서버에서 받은 최신 데이터를 이용해 publicList를 업데이트
    const updatedPublicList = resp.data.filter(event => event.calendar_type === 'public');
    setPublicList(updatedPublicList);

    // 공유 캘린더 개수 업데이트
    sharedCalendarCount.current = updatedPublicList.length;

    alert(`${calendarName} 캘린더가 삭제되었습니다.`);
  })
  .catch((error) => {
    console.error("캘린더 삭제 실패:", error);
    alert("캘린더 삭제에 실패했습니다.");
  });
};
  

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
            <ul className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`} onClick={preventPropagation}>
              <li onClick={fullCalendar}>
                <span><i className="fa-solid fa-circle"></i></span>
                <span>전체 캘린더</span>
              </li>
              <li onClick={myCalender}>
                <span><i className="fa-solid fa-circle" style={{ color: '#33A150' }}></i></span>
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
                  <li key={index} onClick={()=>sharedCalendar(calendar.calendar_name)}> 
                      <span>
                          <i className="fa-solid fa-circle" style={{ color: '#E04038' }}></i>
                      </span>
                      <span>{calendar.calendar_name}</span> 

                      {calendar.member_id === loginID && ( // 공유캘린더 생성자만 삭제 버튼
                        <button onClick={() => handleDeleteSharedCalendar(calendar.calendar_name)}><i className="fa-solid fa-trash"></i></button>
                      )}

                  </li>
              ))}

            </ul>
          </li>
        </ul>
      </div>     
    </div>
  );
};
