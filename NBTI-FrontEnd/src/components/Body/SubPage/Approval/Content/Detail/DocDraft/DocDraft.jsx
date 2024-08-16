import { format } from 'date-fns';
import styles from './DocDraft.module.css';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';



export const DocDraft = ({setDocDraft, docDraft})=>{

    const [date, setDate] = useState();

    console.log("데이터 확인",docDraft);
    useEffect(() => {
        if (docDraft.effective_date) {
            setDate(format(new Date(docDraft.effective_date), 'yyyy-MM-dd'));
        }
    }, [docDraft.effective_date]);

    return(
        <div className={styles.container}>
            <div className={`${styles.row}`}>
                <div className={styles.date}>시행시작일자</div>
                <div className={styles.date_value}>
                    <input type='date' value={date} disabled></input>
                </div>
                <div className={styles.dept}>협조부서</div>
                <div className={styles.dept_value}>{docDraft.cooperation_dept}</div>
            </div>
            <div className={`${styles.row}`}>
                <div className={styles.title}>제목</div>
                <div className={styles.title_value}>{docDraft.title}</div>
            </div>
            <div className={styles.content}>
                {
                    docDraft.content !== null?
                parse(docDraft.content):''}
            </div>
        </div>
    );
}