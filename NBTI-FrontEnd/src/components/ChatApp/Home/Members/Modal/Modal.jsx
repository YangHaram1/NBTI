import styles from './Modal.module.css';
import axios from 'axios';
import { host } from '../../../../../config/config';
import React from 'react';
import { useState, useContext } from 'react';
import { ChatsContext } from '../../../../../Context/ChatsContext';
const Modal=({modalRef,index,item,profileRef})=>{
    const [modalDisplay, setModalDisplay] = useState(null);
    const {setChatNaviBody} =useContext(ChatsContext);

    const handleChatRoom=()=>{
        //console.log(item)
        axios.post(`http://${host}/group_chat?member_id=${item.id}&&name=${item.name}`).then((resp)=>{
            setChatNaviBody("chats");
        })
    }
    const handleMemberIfo=(index) => (e) =>{
        const { clientX: x, clientY: y } = e;
         e.preventDefault();
         setModalDisplay((prev) => {
             if (prev != null) {
                 prev.style.display = 'none'
             }
             profileRef.current[index].style.display = 'flex';
         //   profileRef.current[index].style.top = y + 'px';
          //  profileRef.current[index].style.left = x;
             return profileRef.current[index];
         });
    }

  

    return(
        <div className={styles.container} ref={el=>modalRef.current[index]=el}>
            <div className={styles.content} onClick={handleChatRoom}>
                채팅 하기 {index}
            </div>
            <div className={styles.content} onClick={handleMemberIfo(index)}>
                사용자 정보
            </div>
           
        </div>


    );
}
export default Modal;