import styles from './Chats.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/store';
const Chats = () => {
    const { loginID } = useAuthStore();
    const navi = useNavigate();
    const handleNavi = () => {
        if (loginID === null) {
            navi("/");
        }
        else{
            navi('/chat');
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