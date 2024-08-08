import { format } from 'date-fns';
import styles from './DocDraft.module.css';
import parse from 'html-react-parser';



export const DocDraft = ({setDocDraft, docDraft})=>{

    console.log("데이터 확인",docDraft);
   
    const date = format(new Date(docDraft.effective_date),'yyyy-MM-dd');

    return(
        <div className={styles.container}>
            <div className={`${styles.row}`}>
                <div className={styles.date}>시행시작일자</div>
                <div className={styles.date_value}>
                    <input type='date' value='date' disabled></input>
                </div>
                <div className={styles.dept}>협조부서</div>
                <div className={styles.dept_value}>{docDraft.cooperation_dept}</div>
            </div>
            <div className={`${styles.row}`}>
                <div className={styles.title}>제목</div>
                <div className={styles.title_value}>{docDraft.title}</div>
            </div>
            <div className={styles.content}>
                {parse(docDraft.content)}
            </div>
        </div>
    );
}