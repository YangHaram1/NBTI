
import { format } from 'date-fns';
import { Header } from '../Header/Header';
import styles from './DocLeave.module.css';
import { useEffect, useState } from 'react';

export const DocLeave = ({docLeave, setDocLeave})=>{

    // console.log(docLeave);
    
    const [leaveStart, setLeaveStart] = useState();
    const [leaveEnd, setLeaveEnd] = useState();

    useEffect(()=>{
        if(docLeave.leave_start){
        setLeaveStart(format(new Date(docLeave.leave_start),'yyyy-MM-dd'));
        }
        if(docLeave.leave_end){
        setLeaveEnd(format(new Date(docLeave.leave_end),'yyyy-MM-dd'));
        }
    },[docLeave.leave_start,docLeave.leave_end])



    return(
            <div className={styles.container}>
                <div className={`${styles.period}  ${styles.row}`}>
                    <div className={styles.title}> 휴직 기간</div>
                    <div className={`${styles.content}  ${styles.row}`}>
                        <input type="date" value={leaveStart} disabled></input>
                        <div className={styles.wave}>~</div>
                        <input type="date" value={leaveEnd} disabled></input>
                    </div>
                </div>
                <div className={`${styles.reason}  ${styles.row}`}>
                    <div className={styles.title}> 사유 </div>
                    <textarea className={styles.content} value={docLeave.leave_reason} disabled>
                    </textarea>
                </div>
                <div className={`${styles.address}  ${styles.row}`}>
                    <div className={styles.title}> 주소 </div>
                    <div className={styles.content}> {docLeave.address} </div>
                </div>
                <div className={`${styles.phone}  ${styles.row}`}>
                    <div className={styles.title}> 연락처 </div>
                    <div className={styles.content}>{docLeave.phone}</div>
                </div>
                <div className={`${styles.text}  ${styles.row}`}></div>
            </div>
    );

}