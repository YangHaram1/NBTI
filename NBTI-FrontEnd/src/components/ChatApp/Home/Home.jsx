import styles from './Home.module.css';
import { useState, useContext, React, useEffect } from 'react';
import Members from './Members/Members';
import Chats from './Chats/Chats';
import Files from './Files/Files';
import avatar from '../../../images/user.jpg';
import axios from 'axios';
import { useAuthStore,useMemberStore } from '../../../store/store';
import { ChatsContext } from './../../../Context/ChatsContext';
import Setting from './Setting/Setting';
import { host } from '../../../config/config';
axios.defaults.withCredentials = true;

const Home = () => {

    const [color, setColor] = useState({ member: false, chat: true, file: false });
    const { loginID } = useAuthStore();
    const { members } = useMemberStore();
    const { setChatNavi, chatNaviBody, setChatNaviBody, chatNavi } = useContext(ChatsContext);
    const [settiing, setSetting] = useState(false);
    const [user,setUser] =useState([{}]);

    useEffect(()=>{
        if(loginID!=null && loginID !=='error'){
            setUser(()=>{
                return (
                    members.filter((item,index)=>{
                        if(item.id===loginID){
                            return true;
                        }
                        return false;
                    })
                );  
            })
        }

    },[loginID])
  
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
    const handleSetting = () => {
        setSetting((prev) => {
            return !prev;
        })
    }
    // if(chatNavi==='home')
    return (
        <div className={styles.container}>
            <div className={styles.div1}>
                <div className={styles.div1_1}>
                    <img src={(user[0].member_img === null) ? `${avatar}` : `${host}/images/avatar/${user[0].id}/${user[0].member_img}`} alt='' className={styles.avatar}></img>
                </div>
                <div className={styles.div1_2}>
                    <div className={styles.id}>
                        {user[0].id}
                    </div>
                    <div className={styles.name}>
                        {user[0].name}
                    </div>
                </div>
                <div className={styles.div1_3}>
                    {settiing && (<Setting setSetting={setSetting} />)}
                    {/* <button className={styles.button} onClick={handleSetting}><i className="fa-solid fa-gear fa-lg"></i></button> */}
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
                {chatNaviBody === 'members' && <Members setColor={setColor} />}
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