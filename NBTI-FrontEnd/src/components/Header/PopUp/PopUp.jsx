import { useNavigate } from "react-router-dom";
import styles from "./PopUp.module.css";
import React, { forwardRef, useEffect } from "react";

export const PopUp = forwardRef(({ onClose }, ref) => {

    useEffect(() => {
        // 외부 스타일시트를 동적으로 추가
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(link);

        // 컴포넌트가 언마운트될 때 스타일시트를 제거
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const handleItemClick = () => {
        if (onClose) {
            onClose();
        }
    };

    const navi = useNavigate();
    const handleNavi = (name) => {
        navi(name);
    };

    return (
        <div className={`${styles.container} ${styles.show}`} ref={ref}>
            <div className={styles.header}>
                <p>전체메뉴</p>
            </div>
            <div className={styles.body}>
                <ul>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-regular fa-clipboard fa-sm" /></span>
                        <span onClick={() => { handleNavi("board") }}>게시판</span>
                    </li>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-regular fa-calendar-check fa-sm" /></span>
                        <span onClick={() => { handleNavi("calendar") }}>일정</span>
                    </li>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-regular fa-clock fa-sm" /></span>
                        <span onClick={() => { handleNavi("reservation") }}>예약</span>
                    </li>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-solid fa-users-line fa-sm" /></span>
                        <span onClick={() => { handleNavi("group") }}>조직도</span>
                    </li>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-solid fa-laptop-file fa-sm" /></span>
                        <span onClick={() => { handleNavi("approval") }}>전자결재</span>
                    </li>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-solid fa-map-location-dot fa-sm" /></span>
                        <span onClick={() => { handleNavi("application") }}>휴가/외출신청</span>
                    </li>
                    <li onClick={handleItemClick}>
                        <span><i className="fa-solid fa-briefcase fa-sm" /></span>
                        <span onClick={() => { handleNavi("workProcessing") }}>근무현황</span>
                    </li>
                </ul>
            </div>
        </div>
    );
});