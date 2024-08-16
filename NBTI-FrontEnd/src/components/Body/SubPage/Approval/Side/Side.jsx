import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "../Content/Modal/Modal";
import SecondModal from "../Content/SecondModal/SecondModal";
import DocTree from "../Content/Modal/DocTree/DocTree";
import { FormDetail } from "../Content/FormDetail/FormDetial";
import { useApprovalLine, useDocFormStore, useReferLine } from "../../../../../store/store";

export const Side = () => {
  // ===== 메뉴 토글 =====
  const [FreeBoard, setFreeBoard] = useState(false);
  const [NoticeBoard, setNoticeBoard] = useState(false);
 
  const [isModalOpen, setIsModalOpen] = useState(false); // 첫 번째 모달 상태
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // 두 번째 모달 상태

  const {docForm, setDocForm} = useDocFormStore();

  const {resetReferLine} = useReferLine();
  const {approvalLine, resetApprovalLine } = useApprovalLine();

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

  const handlePopupForm = () => {
    console.log(approvalLine.length);
    // 결재 라인 1번에 이름이 없을 시 => 작서
    if(approvalLine.length > 1){
      // 알림창 이쁘게 바꾸기
      const result = window.confirm("글 내용이 삭제됩니다.");
      if(result){
        resetApprovalLine();
        resetReferLine();
        setDocForm({name:"", id:"", period:""});
        console.log(docForm.name);
        setIsModalOpen(true); // 첫 번째 모달 열기
      }
    }else{
      setIsModalOpen(true);
    }
  };

  const closeFirstModal = () => {
    setIsModalOpen(false); // 첫 번째 모달 닫기
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false); // 두 번째 모달 닫기
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    if(docForm.id !== ''){
      // 첫 번째 모달 닫기
      setIsModalOpen(false);
      // 두 번째 모달 열기
      setIsSecondModalOpen(true);
    }else{
      alert("문서 종류를 선택해주세요.");
    }
    
  };

  const navi = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={handlePopupForm}>
          <i className="fa-solid fa-plus"></i>
          <p>글쓰기</p>
        </button>
      </div>

      <div className={styles.menus}>
        <ul>
          <li onClick={toggleFreeBoard}>
            <i className="fa-solid fa-chevron-down fa-sm"></i>결재하기
            <ul
              className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li onClick={()=>{navi("listWait")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>결재 대기</span>
              </li>
              <li onClick={()=>{navi("listReserved")}}>
                <span>
                <i class="fa-regular fa-clock"></i>
                </span>
                <span>결재 예정</span>
              </li>
              <li onClick={()=>{navi("listAll")}}>
                <span>
                <i class="fa-solid fa-users"></i>
                </span>
                <span>참조/열람 대기</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li onClick={toggleNoticeBoard}>
            <i className="fa-solid fa-chevron-down fa-sm"></i>문서함
            <ul
              className={`${styles.submenu} ${NoticeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              {/* <li onClick={()=>{navi("listDocAll")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>전체 문서함</span>
              </li> */}
              <li onClick={()=>{navi("listDocWrite")}}>
                <span>
                  <i class="fa-solid fa-file-pen"></i>
                </span>
                <span>기안 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocApproval")}}>
                <span>
                <i class="fa-solid fa-clipboard-check"></i>
                </span>
                <span>결재 문서함</span>
              </li>
              {/* <li onClick={()=>{navi("listDocReceive")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>수신 문서함</span>
              </li> */}
              <li onClick={()=>{navi("listDocReference")}}>
                <span>
                <i class="fa-solid fa-users"></i>
                </span>
                <span>참조/열람 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocBan")}}>
                <span>
                  <i class="fa-solid fa-rotate-left"></i>
                </span>
                <span>반려 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocCancle")}}>
                <span>
                  <i class="fa-solid fa-square-xmark"></i>
                </span>
                <span>상신취소 문서함</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
            <li onClick={()=>{navi("listDocTemp")}}>
                임시 저장 문서함
            </li>
        </ul>
        {/* <ul>
            <li onClick={()=>{navi("listDocSetting")}}>
                전자결재 관리
            </li>
        </ul> */}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeFirstModal}>
        {/* 첫 번째 모달 내용 */}
        <h2>결재 양식</h2>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.form_box}>
            <div className={styles.form_menu}>
              <div className={styles.form_menu_title}> 문서 종류 </div>
              <div className={styles.form_menu_tree}>
                {/* 양식 선택 리스트 출력 (트리형식) */}
                <DocTree/>
              </div>
            </div>
            <div className={styles.form_check}>
              {/* <div>상세정보</div>
              <div className="form_detail_title"></div> */}
              <FormDetail />
            </div>
          </div>
          <div className={styles.form_btns}>
            <button type="submit">다음</button>
            {/* <button type="button" onClick={closeFirstModal}>닫기</button> */}
          </div>
        </form>
      </Modal>

      <SecondModal
        isOpen={isSecondModalOpen}
        onClose={closeSecondModal}
      />

    </div>
  );
};
