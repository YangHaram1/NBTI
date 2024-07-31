import { DocDraft } from './DocDraft/DocDraft';
import { DocLeave } from './DocLeave/DocLeave';
import { DocVacation } from './DocVacation/DocVacation';
import styles from './Write.module.css';

export const Write = ({setlist})=>{
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {setlist}
            </div>
            <div className={styles.content}>
                <div className={styles.btns}>
                    결재요청, 임시저장, 미리보기, 결재정보
                </div>
                <div className={styles.write_box}>
                    {   
                    setlist === '휴가신청서' ?  <DocVacation/>
                    : setlist === '휴직신청서' ? <DocLeave/>
                    : <DocDraft/>
                    }   
                </div>
                <div className={styles.files}>
                    첨부파일 넣기
                </div>
            </div>
        </div>
    );
}