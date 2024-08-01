import styles from './NameModal.module.css';
import { host } from '../../../../../config/config';
import axios from 'axios';
import { useState } from 'react';

const NameModal = ({setNameModal,group_seq,setGroup_chats}) => {
    const [name,setName]=useState();
    
    const handleName=()=>{
        axios.patch(`${host}/group_member?group_seq=${group_seq}&&name=${name}`).then((resp)=>{
            setNameModal((prev)=>{
                setGroup_chats((prev)=>{
                    return(
                        prev.map((item)=>{
                            if(item.seq===group_seq){
                                item.name=name
                            }
                            return item;
                        })
                    );
                })
                return !prev;
            })
        })
    }
    const handleCancel=()=>{
        setNameModal((prev)=>{
            return !prev;
        })
    }
    const handleNameState=(e)=>{
        setName(e.target.value);
    }
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <div className={styles.div1}>
                    채팅방 이름 설정
                </div>
                <div className={styles.div2}>
                    <input type="text" placeholder='채팅방 이름을 입력해주세요' value={name} onChange={handleNameState}/>
                </div>
                <div className={styles.div3}>
                    <button onClick={handleName}>확인</button>
                    <button onClick={handleCancel}>취소</button>
                </div>
            </div>
        </div>

    );
}
export default NameModal;