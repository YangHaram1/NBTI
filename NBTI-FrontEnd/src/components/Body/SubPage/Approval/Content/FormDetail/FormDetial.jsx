import { useEffect } from 'react';
import { useDocFormStore } from '../../../../../../store/store';
import styles from './FormDetail.module.css';

export const FormDetail = () => {

    const {docForm} = useDocFormStore();

    useEffect(()=>{
        // console.log("데이터 변동 중");
    },[docForm])

    return(
        <div className={styles.container}>
            <div className={styles.title}>상세정보</div>
            <div className={styles.content}>
                <div className={styles.common_box}>
                    <div className={styles.name}>공통 분류</div>
                    <div className={styles.value}>{docForm.id}</div>
                </div>
                <div className={styles.detail_box}>
                    <div className={styles.name}>세부 분류</div>
                    <div className={styles.value}>{docForm.name}</div>
                </div>
                <div className={styles.save_box}>
                    <div className={styles.name}>보존연한</div>
                    <div className={styles.value}>{docForm.period}</div>
                </div>
            </div>
        </div>
    );
}