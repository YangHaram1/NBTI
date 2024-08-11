import { useEffect, useState } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../store/store";

export const Side = () => {
  // ===== 메뉴 토글 =====
  const [QnA, setQnA] = useState(false);
  const toggleQnA = () => {
    setQnA(!QnA);
  };
  const preventPropagation = (e) => {
    e.stopPropagation();
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


  const navi = useNavigate();
  const { setBoardType } = useBoardStore();

  return (
    <div className={styles.container}>
      <div className={styles.menus}>
        <ul>
          <li onClick={() => { navi("/mypage/profile") }}>
            프로필 설정
          </li>
        </ul>
        <ul>
          <li onClick={() => { navi("/mypage/security") }}>
            보안 설정
          </li>
        </ul>


        <ul>
          <li onClick={toggleQnA}>
            <i className="fa-solid fa-chevron-down fa-sm" />Q&A
            <ul
              className={`${styles.submenu} ${QnA ? styles.open : ""}`}
              onClick={preventPropagation}
            >
              <li onClick={() => { navi("/mypage/qna"); setBoardType("문의"); }}>
                문의하기
              </li>
              <li onClick={() => { navi("/mypage/qnaList"); setBoardType("문의"); }}>
                나의 문의 내역
              </li>
              <li onClick={() => { navi("/mypage/bookmarkQnA"); setBoardType("문의"); }}>
                중요 문의 내역
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
