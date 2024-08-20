import { useEffect } from 'react';
import styles from './ApprovalCommentModal.module.css';

export const ApprovalCommentModal = ({approvalData, onClose}) =>{

    // const handleClose = () => {
    //     onClose();
    // }

    // useEffect(()=>{
    //     console.log("결재정보",approvalData);
    // },[approvalData]);

    const formatDate = (dateTimeString) => {
        if(dateTimeString != null){
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
        } else{
            return '';
        }
    };

    return(
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h3>결재정보</h3>
                <div className={styles.comment_box}>
                    {
                    approvalData.map((data, index)=>{
                        return(
                            <>
                            <div className={styles.comment_title}>
                                {index == 0 ? '최초' : index == 1 ?'중간' : '최종'} 결재자 : {data.NAME}({data.JOB_NAME}) / {data.TEAM_NAME}
                                        {
                                                data.MEMBER_STATE_CODE === 'p' ? ' ( 승인 날짜 : ':  
                                                data.MEMBER_STATE_CODE === 'r' ? ' ( 반려 날짜 : ':
                                                ''
                                        }
                                        { 
                                            data.APPROVAL_DATE !== null ?  formatDate(data.APPROVAL_DATE): ''
                                        }
                                        {
                                            data.APPROVAL_DATE != null ? ' )':''
                                        }
                            </div>
                            <div className={styles.comment_content}>결재 의견 : { data.COMMENTS != null ? data.COMMENTS : '미작성'} </div>
                            </>
                        );
                    })
                    }
                </div>
                {/* 확인시 데이터 전송 후 onclose */}
                <div className={styles.btns}>
                    {/* <button className={`${styles.btn} ${styles.ok}`} onClick={handleClose}>확인</button> */}
                    <button className={`${styles.btn} ${styles.cancle}`} onClick={onClose}>확인</button>
                </div>
            </div>
        </div>
    );


}