import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import { host } from "../../../../../config/config";
import axios from "axios";
import { useReservationList } from "../../../../../store/store";
import Swal from "sweetalert2";

export const Side = () => {
  const navi = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(false); // 권한 여부 상태
  const {selectedDate,modalOpen,setModalOpen, setSelectedDate, setReservations } = useReservationList();

  // 입력 데이터 상태
  const [reserveData, setReserveData] = useState({ 
    reserve_title_code: '', // 선택된 자원 이름을 저장
    start_time: '', // 시작 시간
    end_time: '', // 종료 시간
    purpose: '', // 사용 용도
    state: 'N' // 기본 상태 'N'
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
      const { name, value } = e.target;
      setReserveData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  // 날짜 변경 핸들러
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
  };

  // 저장 처리
  const handleSave = () => {
    const { reserve_title_code, start_time, end_time, purpose, state } = reserveData;

    // 날짜와 시간을 합쳐서 Timestamp로 변환
    const fullStartTime = selectedDate ? `${selectedDate}T${reserveData.start_time}` : null;
    const fullEndTime = selectedDate ? `${selectedDate}T${reserveData.end_time}` : null;

    // 데이터 검증
    if (!reserve_title_code || !fullStartTime || !fullEndTime || !purpose || !start_time || !end_time) {
        alert('모든 필드를 입력하세요.');
        return;
    }
    // const selectedDateObj = new Date(selectedDate);
    const now = new Date();
    const startTimeObj = new Date(fullStartTime);
    const endTimeObj = new Date(fullEndTime);

    // // 과거 날짜 체크
    // if (selectedDateObj < now) {
    //     alert('과거 날짜는 예약할 수 없습니다.');
    //     return;
    // }

    // 현재 시간 체크
    if (startTimeObj < now) {
        // alert('시작 시간은 현재 시간 이후여야 합니다.');
        Swal.fire({
          icon: "error",
          title: "예약",
          text: "시작 시간은 현재 시간 이후여야 합니다.",
        }); 
        return;
    }

    // 종료 시간 체크
    if (endTimeObj <= startTimeObj) {
        // alert('종료 시간은 시작 시간 이후여야 합니다.');
        Swal.fire({
          icon: "error",
          title: "예약",
          text: "종료 시간은 시작 시간 이후여야 합니다.",
        }); 
        return;
    }

    // AJAX 요청
    axios.post(`${host}/reserve`, {
        reserve_title_code,
        start_time: fullStartTime, // ISO 문자열 형식으로 변환
        end_time: fullEndTime, // ISO 문자열 형식으로 변환
        purpose,
        state // 'N' 
    })
    .then((resp) => {
        // console.log(JSON.stringify(resp.date))
        fetchReservations(); // 새 예약 추가 후 목록 갱신
        closeModal(); // 모달 닫기
    })
    .catch((error) => {
        console.error('예약 실패:', error);
        // alert('예약에 실패했습니다.');
        Swal.fire({
          icon: "error",
          title: "예약",
          text: "예약에 실패했습니다.",
        }); 
        
    });
  };

  // 예약 목록 갱신
  const fetchReservations = () => {
    axios.get(`${host}/reserve`)
        .then((resp) => {
            // console.log(JSON.stringify(resp.data))
            setReservations(resp.data); // 주스탠드 상태 업데이트
        })
        .catch((error) => {
            console.error('Error :', error);
        });
  };

  // 모달창 열기
  const handleDateClick = (arg) => {
      setSelectedDate(arg.dateStr);
      setModalOpen(true);
  };
  // 모달창 닫기
  const closeModal = () => {
      setModalOpen(false);
      setSelectedDate(null);
      setReserveData({ reserve_title_code: '', start_time: '', end_time: '', purpose: '', state: 'N' }); // 초기화
  };

  // ========== 로그인 한 사용자 정보 및 reservation 권한 확인 ==========
  useEffect(() => {
    axios.get(`${host}/members/memberInfo`).then((resp) => {
      if (resp.data.member_level === "2" || resp.data.member_level === "4") {
        // reservation 권한 확인
        axios.get(`${host}/members/selectLevel`).then((resp1) => {
          // console.log(resp1.data[parseInt(resp.data.member_level) - 1]?.reservation)
          const reservationStatus = resp1.data[parseInt(resp.data.member_level) - 1]?.reservation; // 배열의 n번째 요소에서 hr 확인

          if (reservationStatus === "Y") {
            setIsAdmin(true); // Y일 때 true
          }
        });
      }
    });
  }, []);
  // ========== 로그인 한 사용자 정보 및 reservation 권한 확인 ==========


  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={ handleDateClick }>
          <i className="fa-solid fa-plus"></i>
          <p>예약하기</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={()=> {navi('list')}}>
          <p>예약 목록</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={()=> {navi('meetingRoom')}} >
          <p>회의실</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={()=> {navi('supplies')}} >
          <p>노트북</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={()=> {navi('car')}} >
          <p>차량</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        {isAdmin &&(
          <button onClick={()=> {navi('manager')}} >
            <p>승인 관리</p>
          </button>
        )
        }
      </div>

      {modalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.title}>예약하기</h2>
                        <div className={styles.modalInner}>
                            <div>
                                <p>자원이름</p>
                                <select name="reserve_title_code" value={reserveData.reserve_title_code} onChange={handleChange}>
                                    <option value="">선택하세요</option>
                                    <option value="1">회의실</option>
                                    <option value="2">노트북</option>
                                    <option value="3">차량</option>
                                </select>
                            </div>
                            <div>
                                <p>날짜</p>
                                <input type="date" name="date" onChange={handleDateChange} />
                            </div>
                            <div>
                                <p>시작</p>
                                <input type="time" id="startTime" name="start_time" value={reserveData.start_time} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>종료</p>
                                <input type="time" id="endTime" name="end_time" value={reserveData.end_time} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>사용 용도</p>
                                <input type="text" name="purpose" value={reserveData.purpose} onChange={handleChange}/>
                            </div>
                            <div>
                                <button onClick={handleSave}>저장</button>
                                <button onClick={closeModal}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

    </div>
  );
};
