import styles from './Chats.module.css';
import { useAuthStore } from '../../../../store/store';
import { ChatsContext } from './../../../../Context/ChatsContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { host } from './../../../../config/config';
import avatar from '../../../../images/user.jpg';

const Chats = () => {
    const { loginID } = useAuthStore();
    const { setChatNavi } = useContext(ChatsContext);
    const [group_chats, setGroup_chats] = useState([]);
    const handleNavi = () => {
        if (loginID === null) {
            setChatNavi('');
        }
        else {
            setChatNavi('chat');
        }

    }
    useEffect(() => {
        axios.get(`http://${host}/group_chat`).then((resp) => {
            setGroup_chats(resp.data);
        })
    })

    return (
        <div className={styles.container}>
            {
                group_chats.map((item, index) => {

                    return (
                        <div className={styles.room} key={index}>
                            <div>
                                <img src={avatar} alt='' className={styles.avatar}></img>
                            </div>
                            <div className={styles.message}>
                                <div className={styles.name}>
                                    {item.name}
                                </div>
                                <div className={styles.content}>
                                    메세지 마지막 내용
                                </div>
                            </div>
                            <div className={styles.write_date}>
                                2024-07-08
                            </div>
                        </div>
                    );


                })

            }
            <button onClick={handleNavi}>채팅으로</button>
        </div>
    )

}
export default Chats;