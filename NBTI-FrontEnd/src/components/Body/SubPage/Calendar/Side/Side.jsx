import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../../../../../config/config";
import { useCalendarTitle } from "../../../../../store/store";

export const Side = ({setAddOpen}) => {

  const { setSelectedItem } = useCalendarTitle(); // 상태 업데이트 함수 가져오기


    

  const handleMyCalendarClick = () => {
    console.log("클릭")
    setSelectedItem('내 프로젝트'); // '내 프로젝트' 선택
  };

  const handleSharedCalendarClick = () => {
    console.log("클릭")
    setSelectedItem('공유 프로젝트'); // '공유 프로젝트' 선택
  };


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



  // 내 캘린더 수정하기
  // const [isEditing, setIsEditing] = useState(false); // 수정 버튼 누르면 보이는 input 창 열고 닫기
  // const [value, setValue] = useState('내 프로젝트'); // <span>의 초기 값
  // const [seq, setSeq] = useState(1); // 수정할 항목의 seq

  // // 수정 버튼을 누르면 수정 모드로 전환
  // const edit = () => {
  //   setIsEditing(true);
  // };

  // // 입력 값 변경
  // const handleChange = (e) => {
  //   console.log(e.target.value + "입력 값")
  //   console.log(e.target + "입력 값")
  //   setValue(e.target.value);
  // };

  // // 수정 완료
  // const handleBlur = () => {
  //   console.log(`${seq} : "seq" : ${value}`)
  //   const dataToSend = {
  //     seq: seq, // 수정할 schedule seq 값
  //     title: value, // 수정할 캘린더 제목
  //     scheduleTitle: {
  //       seq: 1, // 수정할 scheduleTitle의 seq 값
  //       scheduleTitle_name: value // 수정할 제목
  //     }
  //   };

  //   // API 호출
  //   axios.put(`${host}/calendar/title`, dataToSend) // PUT 요청을 보낼 API 경로를 수정
  //     .then((resp) => {
  //       console.log(resp);
  //       setIsEditing(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       setIsEditing(false);
  //     });
  //   };

    // axios.get(`${host}/calendar/title`).then((resp)=>{
    //   console.log(resp)
    // })

  

  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={handleDateClick}>
          <i className="fa-solid fa-plus"></i>
          <p>일정추가</p>
        </button>
      </div>

      <div className={styles.menus}>
        <ul>
          <li onClick={toggleFreeBoard}>
            <i className="fa-solid fa-user-large"></i>내 캘린더
            <ul
              className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
               <li>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span onClick={handleMyCalendarClick}>내 프로젝트</span>
              </li>
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
                <span onClick={handleSharedCalendarClick}>공유 프로젝트</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>           
    </div>
  );
};
