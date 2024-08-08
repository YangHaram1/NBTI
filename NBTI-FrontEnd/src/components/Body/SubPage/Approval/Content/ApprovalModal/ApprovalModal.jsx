import { useState } from 'react';
import styles from './Approval.module.css';
import axios from 'axios';
import { host } from '../../../../../../config/config';

export const ApprovalModal = ({onClose, approvalYN, seq})=>{

    const [comment, setComment] = useState(''); 

    const handleComment = (e) => {
        console.log(e.target.value);
        setComment(e.target.value);
    }

    const handleSubmit = () => {
        const data = {temp_seq:seq, comment:comment, approvalYN:approvalYN};
        axios.put(`${host}/approvalLine/insertComment`,data)
        .then((resp)=>{
            console.log(resp);
        })
        .catch((err)=>{
            console.log(err);
        })

        onClose();
    }

    return(
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h3>{approvalYN}</h3>
                <div className={styles.comment_box}>
                    <div className={styles.comment_title}>결재 의견</div>
                    <textarea className={styles.comment_content} onChange={handleComment}></textarea>
                </div>
                {/* 확인시 데이터 전송 후 onclose */}
                <div className={styles.btns}>
                    <button className={`${styles.btn} ${styles.ok}`} onClick={handleSubmit}>확인</button>
                    <button className={`${styles.btn} ${styles.cancle}`} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
}