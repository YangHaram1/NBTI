import { useApprovalLine, useReferLine } from '../../../../../../../store/store';
import { ApprovalEditor } from '../ApprovalEditor/ApprovalEditor';
import styles from './DocDraft.module.css';

export const DocDraft =()=>{

    const {approvalLine} = useApprovalLine();
    const {referLine} = useReferLine();


    return(
        <div className={styles.container}>
            <div className={styles.title}>업무기안서</div>
            <div className={styles.header}>
                <div className={styles.left}>
                    <div className={styles.writer_data}>
                        <div className={styles.writer_title}>기안자</div>
                        <div className={styles.writer_content}>기안중</div>
                    </div>
                    <div className={styles.writer_data}>
                        <div className={styles.writer_title}>소속</div>
                        <div className={styles.writer_content}>다섯글자팀</div>
                    </div>
                    <div className={styles.writer_data}>
                        <div className={styles.writer_title}>기안일</div>
                        <div className={styles.writer_content}>2024-07-31</div>
                    </div>
                </div>
                <div className={styles.mid}></div>
                <div className={styles.right}>
                    <div className={styles.approval_box}>
                        <div className={styles.approval_box_side}>최초</div>
                        <div className={styles.approval_box_main}>
                            <div className={styles.approval_job}>파트장</div>
                            <div className={styles.approval_member}>결재자</div>
                            <div className={styles.approval_date}>결재날자</div>
                        </div>
                    </div>
                    <div className={styles.approval_box}>
                        <div className={styles.approval_box_side}>최초</div>
                        <div className={styles.approval_box_main}>
                            <div className={styles.approval_job}>파트장</div>
                            <div className={styles.approval_member}>결재자</div>
                            <div className={styles.approval_date}>결재날자</div>
                        </div>
                    </div>
                    <div className={styles.approval_box}>
                        <div className={styles.approval_box_side}>최초</div>
                        <div className={styles.approval_box_main}>
                            <div className={styles.approval_job}>파트장</div>
                            <div className={styles.approval_member}>결재자</div>
                            <div className={styles.approval_date}>결재날자</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.submain}>
                {/* <div className={styles.submain_box}> */}
                    <div className={styles.submain_title}>시행일자</div>
                    <div className={styles.submain_content}>2024-08-01</div>
                    <div className={styles.submain_title}>협조 부서</div>
                    <div className={styles.submain_content}>다섯글자팀</div>
                {/* </div> */}
            </div>
            <div className={styles.subtitle}>
                <div className={styles.subtitle_title}> 제목 </div>
                <div className={styles.subtitle_content}> 제목 어쩌구 저쩌구 </div>
            </div>
            <div className={styles.content}>
                <ApprovalEditor/>
            </div>
        </div>
    );
}