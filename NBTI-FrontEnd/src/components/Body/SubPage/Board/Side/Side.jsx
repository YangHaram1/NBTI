import { useState, useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../../../store/store";

export const Side = () => {
  // ===== 메뉴 토글 =====
  const [FreeBoard, setFreeBoard] = useState(false);
  const [NoticeBoard, setNoticeBoard] = useState(false);
  const { setBoardType } = useBoardStore();

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
        <button onClick={() => { navi("insert") }}>
          <i className="fa-solid fa-plus"></i>
          <p>글쓰기</p>
        </button>
      </div>

      <div className={styles.menus}>
        <ul>
          <li onClick={toggleFreeBoard}>
            <i className="fa-solid fa-chevron-down fa-sm"></i>자유 게시판
            <ul
              className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li onClick={() => { navi("free"); setBoardType('자유') }}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>자유 게시판</span>
              </li>
              <li onClick={() => { navi("myBoardList"); }}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>작성한 게시글</span>
              </li>
              <li onClick={() => { navi("bookmark"); setBoardType('자유') }}>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>중요 게시글</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li onClick={toggleNoticeBoard}>
            <i className="fa-solid fa-chevron-down fa-sm"></i>공지 게시판
            <ul
              className={`${styles.submenu} ${NoticeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li onClick={() => { navi("notice"); setBoardType('공지') }}>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>공지 게시판</span>
              </li>
              <li onClick={() => { navi("bookmark"); setBoardType('공지') }}>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>중요 게시글</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
