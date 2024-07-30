import styles from './ChatsModal.module.css';
import axios from 'axios';
import { host } from '../../../../../config/config';
axios.defaults.withCredentials = true;
const ChatsModal = ({ modalRef, index, item, setGroup_chats }) => {
    const group_seq = item.seq;


    const handleDelete = () => {
        axios.delete(`http://${host}/group_member?group_seq=${group_seq}`).then((resp) => {
            setGroup_chats((prev) => {
                return (
                    prev.filter((temp) => {
                        if(temp.seq===group_seq){
                            return false;
                        }
                        return true;
                    })
                )

            });
        })
    }

    return (
        <div className={styles.container} ref={el => modalRef.current[index] = el}>
            <div className={styles.content}>
                이름 변경
            </div>
            <div className={styles.content} >
                알림 끄기
            </div>
            <div className={styles.content} >
                즐겨찾기 등록
            </div>
            <div className={styles.content} onClick={handleDelete}>
                나가기
            </div>

        </div>


    );
}
export default ChatsModal;