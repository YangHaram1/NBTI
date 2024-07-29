import styles from './Modal.module.css';
import axios from 'axios';
import { host } from '../../../../../config/config';
import React from 'react';
const Modal=({modalRef,index,item})=>{

    const handleChatRoom=()=>{
        console.log(item)
        axios.post(`http://${host}/group_chat?member_id=${item.id}&&name=${item.name}`).then((resp)=>{

        })
    }
    const handleMemberIfo=()=>{
        console.log("사용자 정보")
    }

    return(
        <div className={styles.container} ref={el=>modalRef.current[index]=el}>
            <div className={styles.content} onClick={handleChatRoom}>
                채팅 하기 {index}
            </div>
            <div className={styles.content} onClick={handleMemberIfo}>
                사용자 정보
            </div>
           
        </div>


    );
}
export default Modal;