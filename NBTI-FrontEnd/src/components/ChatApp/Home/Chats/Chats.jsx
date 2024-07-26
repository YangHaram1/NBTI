import styles from './Chats.module.css';
import { useAuthStore } from '../../../../store/store';
import { ChatsContext } from './../../../../Context/ChatsContext';

import {useContext} from 'react';
const Chats = () => {
    const { loginID } = useAuthStore();
    const {setChatNavi}=useContext(ChatsContext);
    const handleNavi = () => {
        if (loginID === null) {
            setChatNavi('');
        }
        else{
            setChatNavi('chat');
        }
     
    }

    return (
        <div className={styles.container}>
            Chats
            <button onClick={handleNavi}>채팅으로</button>
        </div>
    )

}
export default Chats;