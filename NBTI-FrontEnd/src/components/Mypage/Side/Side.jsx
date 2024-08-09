import { useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../store/store";

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
          <li onClick={() => { navi("/mypage/qna"); setBoardType("문의"); }}>
            문의하기
          </li>
        </ul>
        <ul>
          <li onClick={() => { navi("/mypage/qnaList"); setBoardType("문의"); }}>
            나의 문의 내역
          </li>
        </ul>
      </div>
    </div>
  );
};
