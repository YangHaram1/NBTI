import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";

export const Side = () => {

  const navi = useNavigate();

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
          <p>비품</p>
        </button>
      </div>
      <div className={styles.mainBtn}>
        <button onClick={()=> {navi('car')}} >
          <p>차량</p>
        </button>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className="title">예약하기</h2>
            <div className={styles.modalInner}>
                <div>
                    <p>자원이름</p>
                    <select>
                        <option>어쩌고</option>
                        <option>저쩌고</option>
                    </select>
                </div>
                <div> 
                    <p>날짜</p>
                    <input type="date" />
                </div>
                <div>
                    <label htmlFor="startTime">시작 시간: </label>
                    <input type="time" id="startTime" name="startTime" />
                </div>
                <div>
                    <label htmlFor="endTime">종료 시간: </label>
                    <input type="time" id="endTime" name="endTime" />
                </div>

                <div>
                    <p>사용 용도</p>
                    <input type="text" />
                </div>
                <div>
                    <button>저장</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </div>
        </div>
      )}

    </div>
  );
};
