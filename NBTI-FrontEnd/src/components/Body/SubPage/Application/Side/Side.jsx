import { useEffect, useState } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import { useApprovalLine, useDocFormStore, useReferLine } from "../../../../../store/store";
import SecondModal from "../../Approval/Content/SecondModal/SecondModal";


export const Side = () => {
  // ===== 메뉴 토글 =====
//   const [FreeBoard, setFreeBoard] = useState(false);
//   const [NoticeBoard, setNoticeBoard] = useState(false);

//   const toggleFreeBoard = () => {
//     setFreeBoard(!FreeBoard);
//   };

//   const toggleNoticeBoard = () => {
//     setNoticeBoard(!NoticeBoard);
//   };

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

//   const preventPropagation = (e) => {
//     e.stopPropagation();
//   };

  const navi = useNavigate();
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // 모달 상태
  const {setDocForm} = useDocFormStore();
  const {resetReferLine} = useReferLine();
  const {resetApprovalLine} = useApprovalLine();

  const handleModal = () => {
    // 만약 기존 내용이 있다면 초기화
    resetReferLine();
    resetApprovalLine();
    // 휴가신청서 정보 입력
    setDocForm({name:"휴가신청서", id:"2", period:"1년"});
    // 모달 열기
    setIsSecondModalOpen(true);
  }

  const closeSecondModal = () => {
    setIsSecondModalOpen(false); // 모달 닫기
  };

  return (
    <div className={styles.container}>
          
      <div className={styles.mainBtn}>
        <button onClick={handleModal}>
          <i className="fa-solid fa-plus"></i>
          <p>휴가 신청</p>
        </button>
      </div>
      <div className={styles.menus}>
        
        <ul>
            <li onClick={() => { navi("/application/myvacation") }}>
                휴가 현황
            </li>
        </ul>
        <ul>
          <li onClick={()=>{navi("/attendance/monthlystats")}}>
            
          </li>
        </ul>
        <ul>
            <li onClick={() => { navi("/attendance/allattendance") }}>
                부서 근무 현황 
            </li>
        </ul>
      </div>
      {/* 결재선 모달 */}
      <SecondModal
        isOpen={isSecondModalOpen}
        onClose={closeSecondModal}
      />
    </div>
  );
};
