import { useState, useEffect, useRef, useContext } from 'react';
import styles from "./Header.module.css";
import image from "../../images/user.jpg";
import { useNavigate } from 'react-router-dom';
import { PopUp } from "./PopUp/PopUp";
import { ChatsContext } from './../../Context/ChatsContext';
import { LogoutPopUp } from './LogoutPopUp/LogoutPopUp';
import { useAuthStore, useMemberStore } from './../../store/store';
import { host } from '../../config/config';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const Header = () => {

    /* PopUp 관련 */
    const [showPopUp, setShowPopUp] = useState(false);
    const menuRef = useRef(null);
    const popupRef = useRef(null);
    const [user, setUser] = useState([{ member_img: '' }]);
    const { loginID } = useAuthStore();
    const { members } = useMemberStore();
    const location = useLocation(); // 현재 경로를 가져오는 useLocation 훅

    useEffect(() => {
        if (loginID != null && loginID !== 'error') {
            if (members.length > 0)
                setUser(() => {
                    return (
                        members.filter((item, index) => {
                            if (item.id === loginID) {
                                return true;
                            }
                            return false;
                        })
                    );
                })
        }

    }, [loginID, members])

    const togglePopUp = () => {
        setShowPopUp(prevState => !prevState); // 상태를 토글
    };

    // 로그아웃 & 마이페이지 팝업 관련 
    const [showNewPopup, setShowNewPopup] = useState(false);
    const newMenuRef = useRef(null);
    const newPopupRef = useRef(null);

    // 다른 곳 click시 popUp창 hide
    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            popupRef.current &&
            !popupRef.current.contains(event.target)
        ) {
            setShowPopUp(false);
        }
    };

    // 로그아웃 & 마이페이지 팝업 토글
    const toggleNewPopup = () => {
        setShowNewPopup(prevState => !prevState);
    }

    // 다른 곳 click시 popUp창 hide
    const handleClickOutsideNew = (event) => {
        if (
            newMenuRef.current &&
            !newMenuRef.current.contains(event.target) &&
            newPopupRef.current &&
            !newPopupRef.current.contains(event.target)
        ) {
            setShowNewPopup(false);
        }
    };
    const [memberLevel, setMemberLevel] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    // Fetch user and member level
    useEffect(() => {
        if (loginID != null && loginID !== 'error') {
            if (members.length > 0) {
                const currentUser = members.find(item => item.id === loginID);
                if (currentUser) {
                    setUser([currentUser]);

                    // Fetch user level
                    axios.get(`${host}/members/memberInfo`)
                        .then((resp) => {
                            setMemberLevel(resp.data.member_level);
                            if (resp.data.member_level === "2" || resp.data.member_level === "3") {
                                axios.get(`${host}/members/selectLevel`)
                                    .then((resp1) => {
                                        const hrstatus = resp1.data[parseInt(resp.data.member_level) - 1]?.hr;
                                        if (hrstatus === "y") {
                                            setIsAdmin(true); // Adjust if necessary
                                        }
                                    });
                            }
                        })
                        .catch(error => {
                            console.error("There was an error fetching the member info!", error);
                        });
                }
            }
        }
    }, [loginID, members]);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideNew);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideNew);
        };
    }, []);

    /* Font Awesome */
    useEffect(() => {
        // 스타일시트 추가
        const faLink = document.createElement("link");
        faLink.rel = "stylesheet";
        faLink.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(faLink);

        // 컴포넌트가 언마운트될 때 스타일시트 제거
        return () => {
            document.head.removeChild(faLink);
        };
    }, []);

    const navi = useNavigate();

    const { setChatNavi, chatAppRef, dragRef, setChatNaviBody } = useContext(ChatsContext);
    const handleChat = () => {
        setChatNavi((prev) => {
            chatAppRef.current.style.display = "flex";
            dragRef.current.style.display = "flex";
            return 'home'
        });
        setChatNaviBody("chats");

    }

    // 현재 경로에 따라 헤더 텍스트 변경
    const getHeaderTitle = () => {
        switch (location.pathname) {
            case "/board":
                return "게시판";
            case "/calendar":
                return "일정";
            case "/reservation":
                return "예약";
            case "/group":
                return "조직도";
            case "/approval":
                return "전자결재";
            case "/application":
                return "휴가신청";
            case "/attendance":
                return "근무현황";
            default:
                return "오피스 홈"; // 기본 텍스트
        }
    };





    return (
        <div className={styles.container}>
            <div className={`${styles.left} ${showPopUp ? styles.dropdownActive : ''}`}>
                <div className={styles.logo} onClick={() => { navi("/") }}>NBTI</div>
                <div className={styles.menu_dropdown} onClick={togglePopUp} ref={menuRef}>
                    {/* <p>오피스 홈</p> */}
                    <p>{getHeaderTitle()}</p>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </div>
            <div className={styles.right}>
                {memberLevel === "2" || memberLevel === "3" ? (
                    <div className={styles.user_admin}>
                        <i className="fa-solid fa-user-cog fa-xl" onClick={() => { navi("/useradmin") }}></i>
                    </div>
                ) : null}
                <div className={styles.chat}>
                    <i className="fa-regular fa-comments fa-xl" onClick={handleChat}></i>
                </div>
                {/* <div className={styles.alarm}>
                    <i className="fa-regular fa-bell fa-xl"></i>
                </div> */}
                <div className={`${styles.user_info} ${showNewPopup ? styles.dropdownActive : ''}`}>
                    <div className={styles.user_profile_img} onClick={toggleNewPopup} ref={newMenuRef}>
                        <img src={(user[0].member_img === null) ? `${image}` : `${host}/images/avatar/${user[0].id}/${user[0].member_img}`} alt="" />
                    </div>
                </div>
            </div>
            {showPopUp && <PopUp ref={popupRef} onClose={() => setShowPopUp(false)} />} {/* 조건부 렌더링 */}
            {showNewPopup && <LogoutPopUp ref={newPopupRef} onClose={() => setShowNewPopup(false)} />} {/* 조건부 렌더링 */}

        </div>
    );
};