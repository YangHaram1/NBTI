import styles from './ChatsModal.module.css';
import axios from 'axios';
import { host } from '../../../../../config/config';
import NameModal from '../NameModal/NameModal';
import React, { useContext, useState } from 'react';
import { ChatsContext } from '../../../../../Context/ChatsContext';
import { useCheckList } from '../../../../../store/store';
import SweetAlert from '../../../../../function/SweetAlert';

axios.defaults.withCredentials = true;
const ChatsModal = ({ modalRef, index, item, setGroup_chats, setCountBookmark, setCountTotal }) => {
    const group_seq = item.seq;
    const [nameModal, setNameModal] = useState(false);
    const { ws } = useContext(ChatsContext);
    const { setChatController } = useCheckList();
    
    const handleDelete = () => {
        axios.delete(`${host}/group_member?group_seq=${group_seq}`).then((resp) => {
            setGroup_chats((prev) => {
                return (
                    prev.filter((temp) => {
                        if (temp.seq === group_seq) {
                            return false;
                        }
                        return true;
                    })
                )

            });
            ws.current.send("chatController");
            //setChatController();
            setCountTotal((prev1) => {
                return prev1 - item.unread;
            })

        })
    }

    const handleName = () => {
        setNameModal((prev) => { //name modal 창 띄우기
            return !prev;
        })
    }
    const handleAlarm = () => {
        axios.patch(`${host}/group_member?group_seq=${group_seq}&&type=alarm`).then((resp) => {
            setGroup_chats((prev) => {
                return (
                    prev.map((temp) => {
                        if (temp.seq === group_seq) {
                            return { ...temp, alarm: temp.alarm === 'Y' ? 'N' : 'Y' }
                        }
                        return temp;
                    })
                );
            })
        })

    }
    const handleBookmark = () => {
        axios.patch(`${host}/group_member?group_seq=${group_seq}&&type=bookmark`).then((resp) => {
            let check = true;
            setGroup_chats((prev) => {
                return (
                    prev.map((temp) => {
                        if (temp.seq === group_seq) {
                            if (check) {
                                setCountBookmark((prevBookmark) => {
                                    return temp.bookmark === 'Y' ? prevBookmark - 1 : prevBookmark + 1;
                                })
                                check = false;
                            }
                            return { ...temp, bookmark: temp.bookmark === 'Y' ? 'N' : 'Y' }
                        }
                        return temp;
                    })
                );
            })
        })
    }

    return (
        <React.Fragment>
            <div className={styles.container} ref={el => modalRef.current[index] = el}>
                <div className={styles.content} onClick={handleName}>
                    이름 변경
                </div>
                <div className={styles.content} onClick={handleAlarm} >
                    {item.alarm === 'Y' ? '알림 끄기' : '알림 켜기'}
                </div>
                <div className={styles.content} onClick={handleBookmark} >
                    {item.bookmark === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 등록'}
                </div>
                <div className={styles.content} onClick={()=>SweetAlert('warning','채팅방','채팅방을 나가시겠습니까?',handleDelete)}>
                    나가기
                </div>
            </div>
            {nameModal && (<NameModal setNameModal={setNameModal} group_seq={group_seq} setGroup_chats={setGroup_chats}></NameModal>)}
        </React.Fragment>



    );
}
export default ChatsModal;