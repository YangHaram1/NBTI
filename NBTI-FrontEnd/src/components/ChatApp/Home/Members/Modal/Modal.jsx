import styles from './Modal.module.css';
import axios from 'axios';
import { host } from '../../../../../config/config';
import React from 'react';
import { useState, useContext } from 'react';
import { ChatsContext } from '../../../../../Context/ChatsContext';
import { useAuthStore } from './../../../../../store/store';
const Modal = ({ modalRef, index, item, profileRef ,setProfileDisplay}) => {
   // const [modalDisplay, setModalDisplay] = useState(null);
    const { setChatNaviBody, dragRef } = useContext(ChatsContext);
    const { loginID } = useAuthStore();

    const handleChatRoom = () => {
        //console.log(item)
        axios.post(`${host}/group_chat?member_id=${item.id}&&name=${item.name}`).then((resp) => {
            setChatNaviBody("chats");
        })
    }
    const handleMemberIfo = (index) => (e) => {
        const rect = dragRef.current.getBoundingClientRect(); //부모요소~ 드래그 되는애
        const x = e.clientX - rect.left+40;
        const y = e.clientY - rect.top -100;
        e.preventDefault();
        setProfileDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            profileRef.current[index].style.display = 'flex';
            profileRef.current[index].style.top = y + 'px';
            profileRef.current[index].style.left = x +'px';
            return profileRef.current[index];
        });
    }



    return (
        <div className={styles.container} ref={el => modalRef.current[index] = el}>
            <div className={styles.content} onClick={handleChatRoom}>
                {(loginID === item.id) ? '나와의 채팅하기' : '채팅 하기'}
            </div>
            <div className={styles.content} onClick={handleMemberIfo(index)}>
                사용자 정보
            </div>

        </div>


    );
}
export default Modal;