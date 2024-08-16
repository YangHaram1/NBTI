import { useEffect, useState } from 'react';
import styles from './DocVacation.module.css';
import axios from 'axios';
import { host } from '../../../../../../../config/config';
import { format } from 'date-fns';

export const DocVacation = ({setDocVacation, docVacation})=>{

    const category = docVacation.vacation_category;
    const [categoryName, setCategoryName] = useState(''); 
    const [vPeriod, setVPeriod] = useState('');
    const [vacationStart, setVacationStart] = useState();
    const [vacationEnd, setVacationEnd] = useState(); 

    useEffect(()=>{
        axios.get(`${host}/vacationCategroy/${category}`)
        .then((resp)=>{
            console.log(resp);
            setCategoryName(resp.data);
        })
    },[docVacation])

    useEffect(()=>{
        if(docVacation.vacation_start){
            setVacationStart(format(new Date(docVacation.vacation_start),'yyyy-MM-dd'));
        }
        if(docVacation.vacation_end){
            setVacationEnd(format(new Date(docVacation.vacation_end),'yyyy-MM-dd'));
        }
    },[docVacation.vacation_start, docVacation.vacation_end])

    const { start_half, end_half, start_half_ap, end_half_ap } = docVacation;
    const isChecked = (value) => {
        if(value != null){
            return (value.trim() === 'true');
        }
        else{return (false);}
    };
    const isSelected = (apValue, expectedValue) => {
        if(apValue != null){
            return (apValue.trim() === expectedValue);
        }
        else{return (false);}
    }
    //잔여 연차
    useEffect(() => {
        axios.get(`${host}/members/selectVacation`)
            .then((resp) => {
                setVPeriod(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return(
        <div className={styles.container}>
            <div className={`${styles.row}`}>
                <div className={styles.title}>휴가 종류</div>
                <div className={styles.content}>{categoryName}</div>
            </div>

            <div className={`${styles.row}`}>
                <div className={styles.title}>휴가 기간</div>
                <div className={`${styles.content} ${styles.date}`}>
                    <input type='date' value={vacationStart} disabled></input>
                    <div className={styles.wave}>~</div>
                    <input type='date' value={vacationEnd} disabled></input>
                </div>
            </div>

            <div className={`${styles.row}`}>
                <div className={styles.title}>반차 여부</div>
                <div className={`${styles.content} ${styles.half_box}`}>
                    <input className={styles.indent_date} type='checkbox' checked={isChecked(start_half)} disabled/> 시작일 (
                    <input type='radio' name='start_half_ap' checked={isSelected(start_half_ap, 'AM')} disabled/> 오전
                    <input type='radio' name='start_half_ap' checked={isSelected(start_half_ap, 'PM')} disabled/> 오후 )
                    <input className={styles.indent_date} type='checkbox' checked={isChecked(end_half)} disabled/> 종료일 (
                    <input type='radio' name='end_half_ap' checked={isSelected(end_half_ap, 'AM')} disabled/> 오전
                    <input type='radio' name='end_half_ap' checked={isSelected(end_half_ap, 'PM')} disabled/> 오후 )
                </div>
            </div>

            <div className={`${styles.row}`}>
                <div className={styles.title}>연차 일수</div>
                <div className={styles.content}>
                    <div className={styles.vPeriod}>잔여 연차 :</div>
                    <div className={styles.vPeriod_value}>{vPeriod}</div>

                </div>
            </div>

            <div className={`${styles.text}`}>
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