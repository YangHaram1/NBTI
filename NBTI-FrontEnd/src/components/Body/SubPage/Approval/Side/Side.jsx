import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";

export const Side = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.mainBtn}>
        <button onClick={() => { navi("write") }}>
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
              <li onClick={()=>{navi("listAll")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>결재전체</span>
              </li>
              <li onClick={()=>{navi("listWait")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>결재대기</span>
              </li>
              <li onClick={()=>{navi("listReserved")}}>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>결재예정</span>
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
              <li onClick={()=>{navi("listDocAll")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>전체 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocWrite")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>기안 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocApproval")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>결재 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocReceive")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>수신 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocReference")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>참조/열람 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocBan")}}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>반려 문서함</span>
              </li>
              <li onClick={()=>{navi("listDocCancle")}}>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
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
        <ul>
            <li onClick={()=>{navi("listDocSetting")}}>
                전자결재 관리
            </li>
        </ul>
      </div>
    </div>
  );
};
