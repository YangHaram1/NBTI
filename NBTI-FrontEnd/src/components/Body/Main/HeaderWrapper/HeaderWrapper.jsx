import { useNavigate } from "react-router-dom";
import styles from "./HeaderWrapper.module.css";
import React, { useEffect } from "react";

export const HeaderWrapper = () => {
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
  const handleNavi = (name) => {
    navi(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("board");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-regular fa-clipboard fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>게시판</p>
          </div>
        </div>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("calendar");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-regular fa-calendar-check fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>일정</p>
          </div>
        </div>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("reservation");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-regular fa-clock fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>예약</p>
          </div>
        </div>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("group");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-solid fa-users-line fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>조직도</p>
          </div>
        </div>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("approval");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-solid fa-laptop-file fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>전자결재</p>
          </div>
        </div>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("application");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-solid fa-map-location-dot fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>휴가신청</p>
          </div>
        </div>
        <div
          className={styles.circle_wrap}
          onClick={() => {
            handleNavi("attendance");
          }}
        >
          <div className={styles.circle_menu}>
            <div className={styles.icon}>
              <i className="fa-solid fa-briefcase fa-xl"></i>
            </div>
          </div>
          <div className={styles.circle_name}>
            <p>근무현황</p>
          </div>
        </div>
      </div>
    </div>
  );
};
