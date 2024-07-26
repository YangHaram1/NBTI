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
        <button onClick={() => { navi("insert") }}>
          <i className="fa-solid fa-plus"></i>
          <p>일정추가</p>
        </button>
      </div>

      <div className={styles.menus}>
        <ul>
          <li onClick={toggleFreeBoard}>
            <i className="fa-solid fa-chevron-down fa-sm"></i>내 캘랜더 
            <ul
              className={`${styles.submenu} ${FreeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>1</span>
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>2</span>
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>3</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li onClick={toggleNoticeBoard}>
            <i className="fa-solid fa-chevron-down fa-sm"></i>공유 캘린더
            <ul
              className={`${styles.submenu} ${NoticeBoard ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li>
                <span>
                  <i className="fa-solid fa-clipboard fa-sm"></i>
                </span>
                <span>1</span>
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-star fa-sm"></i>
                </span>
                <span>2</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
