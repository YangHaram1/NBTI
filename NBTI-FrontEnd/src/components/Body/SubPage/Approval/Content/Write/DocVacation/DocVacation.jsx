import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import styles from './DocVacation.module.css';
import { host } from '../../../../../../../config/config';
import axios from 'axios';

export const DocVacation =({userdata})=>{

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [total, setTotal] = useState(null);
    const [vPeriod, setVPeriod] = useState('');

    const handleStartDate = (e) => {
        const startDate = e.target.value;
        console.log(startDate);
        setStart(startDate);
        // Reset end date and total if start date changes
        setEnd(null);
        setTotal(null);
    };

    const handleEndDate = (e) => {
        const endDate = e.target.value;
        console.log(endDate);
        setEnd(endDate);
        if (start) {
            const startDate = new Date(start);
            const endDate = new Date(e.target.value);
            const differenceInTime = endDate - startDate;
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            // const differenceInMonths = (differenceInDays / 30);
            setTotal(differenceInDays);
            console.log(differenceInDays);
        }
    };

    const handleAdress = (e)=>{
        console.log(e.target.innerText);
        // setDept(e.target.innerText);
    }
     
    const handlePhone = (e)=>{
        console.log(e.target.innerText);
        // setTitle(e.target.innerText);
    }
    
    const handleReason = (e)=>{
        console.log(e.target.value);
    }
    
    useEffect(()=>{
        axios.get(`${host}/members/selectVacation`)
        .then((resp)=>{
            console.log(resp);
            setVPeriod(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[vPeriod])

    return (
        <div className={styles.container}>
            <div className={styles.title}>휴가신청서</div>
            <div className={styles.header}>
                <Header userdata={userdata}/>
            </div>
            
            <div className={`${styles.subtitle} ${styles.top}`}>
                <div className={styles.subtitle_title}>휴가 종류</div>
                <div className={`${styles.subtitle_content} ${styles.align}`}>
                    <select>
                        <option value="1">연차</option>
                        <option value="2">경조</option>
                        <option value="3">공가</option>
                        <option value="4">질병휴가</option>
                    </select>
                </div>
            </div>
            <div className={styles.submain}>
                {/* <div className={styles.submain_box}> */}
                <div className={styles.submain_title}>휴가 기간</div>
                <div className={styles.submain_content}>
                    <input className={styles.submain_input} type="date" value={start || ''} onChange={handleStartDate}/>
                    <div className={styles.inputtext_inner}>~</div>
                    <input className={styles.submain_input} type="date" value={end || ''} min={start || ''} onChange={handleEndDate} disabled={!start}/>
                <div className={styles.submain_input}> 총&nbsp; {total !== null ? `${total}일` : ' 0일'} </div>
                </div>
            </div>
            <div className={styles.subtitle}>
                <div className={styles.subtitle_title}>반차 여부</div>
                <div className={`${styles.subtitle_content} ${styles.align}`} contentEditable="true" onInput={handleAdress} suppressContentEditableWarning='true'> </div>
            </div>
            <div className={styles.subtitle}>
                <div className={styles.subtitle_title}>연차 일수</div>
                <div className={`${styles.subtitle_content} ${styles.align}`} contentEditable="true" onInput={handlePhone} suppressContentEditableWarning='true'></div>
            </div>
            <div className={styles.text}>
                <div className={styles.innertext}>
                     - 첨부서류: 휴직 사유에 대한 증빙 서류 (예 : 질병으로 인한 휴직인 경우 진단서 등)
                </div>
            </div>
        </div>
    );
}