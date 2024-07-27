import styles from './Home.module.css';
import { useState, useContext } from 'react';
import Members from './Members/Members';
import Chats from './Chats/Chats';
import Alarms from './Alarms/Alarms';
import avatar from '../../../images/user.jpg';
import axios from 'axios';
import { useAuthStore } from '../../../store/store';
import { host } from '../../../config/config'
import { ChatsContext } from './../../../Context/ChatsContext';
axios.defaults.withCredentials = true;

const Home = () => {
    //이미지는 <a href="/kr">Freeimages.com</a>에서 가져왔습니다.
    const [color, setColor] = useState({ member: false, chat: false, alarm: false });
    const { loginID, setLoginID } = useAuthStore();
    const { setChatNavi, chatNaviBody, setChatNaviBody } = useContext(ChatsContext);
    const handleMemberList = (e) => {
        setColor((prev) => {
            return { member: true, chat: false, alarm: false };
        });
        setChatNaviBody('members');

    }
    const handleChatList = (e) => {
        setColor((prev) => {
            return { member: false, chat: true, alarm: false };
        });
        setChatNaviBody('chats')

    }
    const handleAlarmList = (e) => {
        setColor((prev) => {
            return { member: false, chat: false, alarm: true };
        });
        setChatNaviBody('alarms')
    }
    const handleLogin = () => {
        axios.post(`http://${host}/auth`, "HARAM0704", {
            headers: {
                'Content-Type': 'text/plain'  // 문자열을 전송할 때, Content-Type을 text/plain으로 설정
            }
        }).then(resp => {
            sessionStorage.setItem("loginID", resp.data);
            setLoginID(resp.data);
        });
        console.log(loginID);
    }

    const handleLogin2 = () => {
        axios.post(`http://${host}/auth`, "eunmi", {
            headers: {
                'Content-Type': 'text/plain'  // 문자열을 전송할 때, Content-Type을 text/plain으로 설정
            }
        }).then(resp => {
            sessionStorage.setItem("loginID", resp.data);
            setLoginID(resp.data);
        });
        console.log(loginID);
    }


    const handleCancel = () => {
        setChatNavi('');
    }
    return (
        <div className={styles.container}>
            <div className={styles.div1}>
                <div className={styles.div1_1}>
                    <img src={avatar} alt='' className={styles.avatar}></img>
                </div>
                <div className={styles.div1_2}>
                    <div className={styles.name} onClick={handleLogin2}>
                        양하람
                    </div>
                    <div className={styles.status} onClick={handleLogin}>
                        온라인
                    </div>
                </div>
                <div className={styles.div1_3}>
                    <button className={styles.button} onClick={handleCancel}>❌</button>
                </div>
            </div>
            <div className={styles.div2}>
                <div className={color.member ? styles.white : styles.none} onClick={handleMemberList}>
                    <i className="fa-regular fa-user fa-xl"></i>
                </div>
                <div className={color.chat ? styles.white : styles.none} onClick={handleChatList}>
                    <i className="fa-regular fa-comments fa-xl"></i>
                </div>
                <div className={color.alarm ? styles.white : styles.none} onClick={handleAlarmList}>
                    <i className="fa-regular fa-bell fa-xl"></i>
                </div>
            </div>
            <div className={styles.div3}>
                {chatNaviBody === 'members' && <Members />}
                {chatNaviBody === 'chats' && <Chats />}
                {chatNaviBody === 'alarms' && <Alarms />}
            </div>
        </div>
    );
}
export default Home;