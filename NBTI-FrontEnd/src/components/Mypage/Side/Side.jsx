import { useEffect } from "react";
import styles from "./Side.module.css";
import { useNavigate } from "react-router-dom";

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
      </div>
    </div>
  );
};
