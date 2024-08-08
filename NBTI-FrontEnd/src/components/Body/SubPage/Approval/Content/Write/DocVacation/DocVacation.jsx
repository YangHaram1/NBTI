import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import styles from './DocVacation.module.css';
import { host } from '../../../../../../../config/config';
import axios from 'axios';
import { useDocVacation } from '../../../../../../../store/store';

export const DocVacation = ({userdata})=>{

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [total, setTotal] = useState(0);
    const [vPeriod, setVPeriod] = useState('');
    const [category, setCategory] = useState(0);
    const [halfStart, setHalfStart] = useState(false);
    const [halfEnd, setHalfEnd] = useState(false);
    const [halfStartAP, setHalfStartAP] = useState('');
    const [halfEndAP, setHalfEndAP] = useState(''); 
    const {setDocVacation} = useDocVacation();

    const handleStartDate = (e) => {
        const startDate = e.target.value;
        setStart(startDate);
        setEnd(null);
        setTotal(0);
        setHalfStart(false);
        setHalfEnd(false);
        setHalfStartAP('n');
        setHalfEndAP('n');
    };

    const handleCategory = (e)=>{
        console.log("휴가카테고리", e.target.value);
        setCategory(e.target.value);
    }

    const handleEndDate = (e) => {
        const selectedEndDate = e.target.value;
        setEnd(selectedEndDate);
        if (start) {
            const startDate = new Date(start);
            const endDate = new Date(selectedEndDate); // 변경된 부분
            const differenceInDays = (endDate - startDate) / (1000 * 3600 * 24) + 1;
            setTotal(differenceInDays);
        }
    };

    const handleHalfDay = (e) => {
        const { name, checked } = e.target;
        console.log(name, checked);
        if (name === 'startHalf') {
            setHalfStart(checked);
        } else if (name === 'endHalf') {
            setHalfEnd(checked);
        }
    };

    const handleHalfStartAP = (e)=>{
        console.log(halfStart,e.target.value);
        setHalfStartAP(e.target.value);
    } 

    const handleHalfEndAP = (e)=>{
        console.log(halfEnd,e.target.value);
        setHalfEndAP(e.target.value);
    } 

    useEffect(() => {
        axios.get(`${host}/members/selectVacation`)
            .then((resp) => {
                setVPeriod(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (start && end) {
            let calculatedTotal = (new Date(end) - new Date(start)) / (1000 * 3600 * 24) +1;
            if (halfStart) {
                calculatedTotal -= 0.5;
            }
            if (halfEnd) {
                calculatedTotal -= 0.5;
            }
            setTotal(calculatedTotal);
        }
    }, [halfStart, halfEnd, start, end]);

    useEffect(() => {
        if (start || end) {
            setHalfStart(false);
            setHalfEnd(false);
            setHalfStartAP('n');
            setHalfEndAP('n');
        }
    }, [start, end]);

    useEffect(() => {
        setDocVacation({
            category: category, 
            start: start, 
            halfStart: halfStart, 
            halfStartAP: halfStartAP,
            end: end,
            halfEnd: halfEnd, 
            halfEndAP: halfEndAP
        });
    }, [end, start, category, halfEnd, halfStart, halfEndAP, halfStartAP]);


    const isOneDay = total <= 1;
    const isMoreThanOneDay = total > 1;

    return (
        <div className={styles.container}>
            <div className={styles.title}>휴가신청서</div>
            <div className={styles.header}>
                <Header userdata={userdata} />
            </div>

            <div className={`${styles.subtitle} ${styles.top}`}>
                <div className={styles.subtitle_title}>휴가 종류</div>
                <div className={`${styles.subtitle_content} ${styles.align}`}>
                    <select onChange={handleCategory}>
                        <option value="0">선택</option>
                        <option value="1">연차</option>
                        <option value="2">경조</option>
                        <option value="3">공가</option>
                        <option value="4">질병휴가</option>
                    </select>
                </div>
            </div>
            <div className={styles.submain}>
                <div className={styles.submain_title}>휴가 기간</div>
                <div className={styles.submain_content}>
                    <input className={styles.submain_input} type="date" value={start || ''} onChange={handleStartDate} />
                    <div className={styles.inputtext_inner}>~</div>
                    <input className={styles.submain_input} type="date" value={end || ''} min={start || ''} onChange={handleEndDate}  disabled={!start} />
                    <div className={styles.submain_input}> 총&nbsp; {total !== 0 ? `${total}일` : '0일'} </div>
                </div>
            </div>
            <div className={styles.subtitle}>
                <div className={styles.subtitle_title}>반차 여부</div>
                <div className={`${styles.subtitle_content} ${styles.align}`}>
                    <input  type='checkbox'  name="startHalf" disabled={!start || !end}  checked={halfStart} onChange={handleHalfDay} /> 시작일 (
                    <input type='radio' name="startPeriod" value="AM" disabled={!halfStart || isMoreThanOneDay} checked={halfStartAP === 'AM'} onChange={handleHalfStartAP} /> 오전
                    <input type='radio' name="startPeriod" value="PM" disabled={!halfStart} checked={halfStartAP === 'PM'} onChange={handleHalfStartAP}/> 오후 )
                    <input className={styles.half_check} type='checkbox' name="endHalf" disabled={!start || !end || isOneDay} checked={halfEnd} onChange={handleHalfDay}/> 종료일 (
                    <input type='radio' name="endPeriod" value="AM" disabled={!halfEnd || isOneDay} checked={halfEndAP === 'AM'} onChange={handleHalfEndAP} /> 오전
                    <input type='radio' name="endPeriod" value="PM" disabled={!halfEnd || isOneDay  || isMoreThanOneDay} checked={halfEndAP === 'PM'} onChange={handleHalfEndAP} /> 오후 )
                </div>
            </div>
            <div className={styles.subtitle}>
                <div className={styles.subtitle_title}>연차 일수</div>
                <div className={`${styles.subtitle_content} ${styles.align}`}>
                    <div className={styles.vacation_day}> 잔여연차 : </div>
                    <div className={styles.vacation_day_b}> 15일 </div>
                    <div className={styles.half_check}> 신청 연차 : </div>
                    <div className={styles.vacation_day_b}> {total === 0 ? "0일" : `${total}일`} </div>
                </div>
            </div>
            <div className={styles.text}>
                <div className={styles.innertext}>
                    <p> ※ "휴가 사유" 작성란은 삭제되었습니다. </p>
                    <p className={styles.empty}>&nbsp;</p>
                    <p> 1. 연차의 사용은 근로기준법에 따라 개인별 연차에 한하여 사용함을 원칙으로 한다.</p>
                    <p> 2. 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는 등본, 청첩장 등 제출 </p>
                    <p> 3. 공가(예비군/민방위)는 사전에 통지서를, 사후에 참석증을 반드시 제출</p>
                </div>
            </div>
        </div>
    );
}