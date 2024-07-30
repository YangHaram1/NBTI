import { useNavigate } from "react-router-dom";
import styles from "./LogoutPopUp.module.css";
import React, { forwardRef, useEffect } from "react";
import { host } from "../../../config/config";
import axios from "axios";
import { useAuthStore } from "../../../store/store";

export const LogoutPopUp = forwardRef(({ onClose }, ref) => {

    const {setLoginID} = useAuthStore();

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

    const handleLogout = ()=>{
        axios.delete(`${host}/auth`)
        .then((resp)=>{
            console.log(resp);
            sessionStorage.removeItem("loginId");
            setLoginID(null);
        })
        .catch((err)=>{
            console.log(err);
            alert("로그아웃 오류");
        });
    }

    return (
        <div className={`${styles.container} ${styles.show}`} ref={ref}>
            <div className={styles.body}>
                <ul>
                    <li onClick={handleItemClick}>
                        {/* <span><i className="fa-regular fa-clipboard fa-sm" /></span> */}
                        <span onClick={handleLogout}>로그아웃</span>
                    </li>
                    <li onClick={handleItemClick}>
                        {/* <span><i className="fa-regular fa-calendar-check fa-sm" /></span> */}
                        <span onClick={() => { handleNavi("mypage") }}>마이페이지</span>
                    </li>
                    {/* <li onClick={handleItemClick}>
                        <span onClick={() => { handleNavi("/") }}>스페어</span>
                    </li> */}
                </ul>
            </div>
        </div>
    );
});