import { useNavigate } from 'react-router-dom';
import styles from './MainApproval.module.css';

export const MainApproval = ()=>{

    const navi = useNavigate();

    return(
        <div className={styles.container}>
            <div className={styles.title}>전자결재</div>
            <div className={styles.content}>
                <button onClick={()=>{navi("approval/listWait")}}>결재 대기</button>
                <button onClick={()=>{navi("approval/listDocWrite")}}>기안 문서</button>
            </div>
        </div>
    );

}