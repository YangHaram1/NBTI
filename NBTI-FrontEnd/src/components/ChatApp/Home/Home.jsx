import styles from './Home.module.css';
import { useState, useContext, React } from 'react';
import Members from './Members/Members';
import Chats from './Chats/Chats';
import Files from './Files/Files';
import avatar from '../../../images/user.jpg';
import axios from 'axios';
import { useAuthStore } from '../../../store/store';
import { ChatsContext } from './../../../Context/ChatsContext';
axios.defaults.withCredentials = true;

const Home = () => {

    //이미지는 <a href="/kr">Freeimages.com</a>에서 가져왔습니다.
    const [color, setColor] = useState({ member: false, chat: false, file: false });
    const [name, setName] = useState();
    const { loginID, setLoginID } = useAuthStore();
    const { setChatNavi, chatNaviBody, setChatNaviBody, chatNavi } = useContext(ChatsContext);
    const handleMemberList = (e) => {
        setColor((prev) => {
            return { member: true, chat: false, file: false };
        });
        setChatNaviBody('members');

    }
    const handleChatList = (e) => {
        setColor((prev) => {
            return { member: false, chat: true, file: false };
        });
        setChatNaviBody('chats')

    }
    const handleFileList = (e) => {
        setColor((prev) => {
            return { member: false, chat: false, file: true };
        });
        setChatNaviBody('files')
    }


    const handleCancel = () => {
        setChatNavi('');
    }
    // if(chatNavi==='home')
    return (
        <div className={styles.container}>
            <div className={styles.div1}>
                <div className={styles.div1_1}>
                    <img src={avatar} alt='' className={styles.avatar}></img>
                </div>
                <div className={styles.div1_2}>
                    <div className={styles.name}>
                        {loginID}
                    </div>
                    <div className={styles.status}>
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
                <div className={color.file ? styles.white : styles.none} onClick={handleFileList}>
                    <i className="fa-regular fa-file fa-xl"></i>
                </div>
            </div>
            <div className={styles.div3}>
                {chatNaviBody === 'members' && <Members setName={setName} />}
                {chatNaviBody === 'chats' && <Chats />}
                {chatNaviBody === 'files' && <Files />}
            </div>
        </div>
    );

    /*
    else {
       return(
        <Chats />
       );
    }*/
}
export default Home;