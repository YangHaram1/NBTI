import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './Members.module.css';
import axios from 'axios';
import Modal from './Modal/Modal';
import { useMemberStore } from '../../../../store/store';
import { useAuthStore } from './../../../../store/store';
import Profile from './Profile/Profile';
import { ChatsContext } from '../../../../Context/ChatsContext';

const Members = ({setName}) => {
    const [list, setList] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(null);
    const { members } = useMemberStore();
    const { loginID } = useAuthStore();
    const {dragRef} =useContext(ChatsContext);

    const modalRef = useRef([]);
    const profileRef =useRef([]);

    useEffect(() => {
        setList(members);
        members.filter((item)=>{

            if (item.id === loginID) {
                setName(item.name);
            }
            return false;
        })
    }, [])
    const handleRightClick = (index) => (e) => {
        const rect = dragRef.current.getBoundingClientRect(); //부모요소~ 드래그 되는애
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.preventDefault();
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            modalRef.current[index].style.display = 'flex';
            modalRef.current[index].style.top = y + 'px';
            modalRef.current[index].style.left = x+'px';
            return modalRef.current[index];
        });
    };

    const handleClick = () => {
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            return null;
        })
    }
    return (
        <div className={styles.container} onClick={handleClick}>
            {
                list.filter((item) => {
                    if (item.id === loginID) {
                        return false;
                    }
                    return true;
                }).map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div onContextMenu={handleRightClick(index)} >
                                {item.name}
                            </div>
                            <Profile profileRef={profileRef} index={index} item={item}></Profile>
                            <Modal modalRef={modalRef} index={index} item={item} profileRef={profileRef}></Modal>
                           
                        </React.Fragment>
                    );
                })
            }
        </div>
    );
}
export default Members;