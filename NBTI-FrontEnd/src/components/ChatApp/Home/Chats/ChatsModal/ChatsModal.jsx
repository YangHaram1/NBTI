import styles from './ChatsModal.module.css';
import axios from 'axios';
import { host } from '../../../../../config/config';
import NameModal from '../NameModal/NameModal';
import React,{ useState,useEffect } from 'react';

axios.defaults.withCredentials = true;
const ChatsModal = ({ modalRef, index, item, setGroup_chats }) => {
    const group_seq = item.seq;
    const [nameModal, setNameModal] = useState(false);

  

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
        })
    }

    const handleName = () => {
        setNameModal((prev) => { //name modal 창 띄우기
            return !prev;
        })
    }
    const handleAlarm = () => {
        axios.patch(`${host}/group_member?group_seq=${group_seq}&&type=alarm`).then((resp)=>{
           
            setGroup_chats((prev)=>{
                console.log('update alarm');
                return(
                    prev.map((temp)=>{
                        if(temp.seq===group_seq){
                            if(temp.alarm==='Y')temp.alarm='N';
                            else if(temp.alarm==='N')temp.alarm='Y';
                          
                        }
                        return temp;
                    })
                );
            })
        })

    }
    const handleBookmark = () => {

    }

    return (
        <React.Fragment>
            <div className={styles.container} ref={el => modalRef.current[index] = el}>
                <div className={styles.content} onClick={handleName}>
                    이름 변경
                </div>
                <div className={styles.content} onClick={handleAlarm} >
                    알림 끄기
                </div>
                <div className={styles.content} onClick={handleBookmark} >
                    즐겨찾기 등록
                </div>
                <div className={styles.content} onClick={handleDelete}>
                    나가기
                </div> 
            </div>
            {nameModal && (<NameModal setNameModal={setNameModal} group_seq={group_seq} setGroup_chats={setGroup_chats}></NameModal>)}
        </React.Fragment>



    );
}
export default ChatsModal;