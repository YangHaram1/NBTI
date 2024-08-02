import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../../../../../config/config";
import { useCalendarList } from "../../../../../store/store";
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 보기 플러그인
import { default as koLocale } from '@fullcalendar/core/locales/ko'; // 한국어 로케일

export const Side = ({ setAddOpen , setCalendarModalOpen }) => {

  const handleCalendarAddClick = () => {
    console.log("캘린더 추가 버튼 클릭됨");
    setCalendarModalOpen(true); // 모달 열기
};
  
const { selectedItem, setSelectedItem  } = useCalendarList();

  // ===== 메뉴 토글 =====
  const [FreeBoard, setFreeBoard] = useState(false);
  const [NoticeBoard, setNoticeBoard] = useState(false);

  const toggleFreeBoard = () => {
    setFreeBoard(!FreeBoard);
  };

  const toggleNoticeBoard = () => {
    setNoticeBoard(!NoticeBoard);
  };

  // ===== 아이콘 =====
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

  const navi = useNavigate();

  // ==== 모달창/ ====
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
  // === /모달창 ===

  const fetchCalendarList = () => {
    axios.get(`${host}/calendarList`)
        .then((resp) => {
            console.log(JSON.stringify(resp.data) + " List 가져오기");
            setCalendarList(resp.data); // 응답 데이터를 상태에 저장
            setSelectedItem(resp.data);
        })
        .catch((error) => {
            console.error("Error", error);
        });
};

    const [calendarList, setCalendarList] = useState([]); // 캘린더 목록 상태
    useEffect(() => {
      // 목록 가져오기
      
      fetchCalendarList(); // 데이터 가져오기 함수 호출
  }, []); // 빈 배열을 주면 컴포넌트가 처음 마운트될 때만 실행



  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={handleDateClick}>
          <i className="fa-solid fa-plus"></i>
          <p>일정추가</p>
        </button>
      </div>
      <div className={styles.mini}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          headerToolbar={false}
          locales={[koLocale]}
          locale="ko"
          selectable={true}
          height="auto"
          color="#FFCC00"
        />
      </div>

      <div className={styles.menus}>
        <ul>
          <li onClick={toggleFreeBoard}>
            <i className="fa-solid fa-user-large"></i>내 캘린더 <i className="fa-solid fa-plus" id={styles.plus} onClick={handleCalendarAddClick}/>
            <ul
              className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
               {/* <li>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>내 프로젝트</span>
              </li> */}
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
        <ul>
          <li onClick={toggleNoticeBoard}>
            <i className="fa-solid fa-people-group"></i>공유 일정
            <ul
              className={`${styles.submenu} ${NoticeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>공유 프로젝트</span>
              </li>


            </ul>
          </li>
        </ul>
      </div>     
   
    </div>
  );
};
