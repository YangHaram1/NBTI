import { useApprovalLine, useReferLine } from '../../../../../../../store/store';
import styles from './DocDraft.module.css';

export const DocDraft =()=>{

    const {approvalLine} = useApprovalLine();
    const {referLine} = useReferLine();


    return(
        <div className={styles.container}>
            업무기안서
        </div>
    );
}