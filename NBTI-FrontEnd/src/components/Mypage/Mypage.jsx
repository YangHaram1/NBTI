import { Content } from './Content/Content';
import styles from './Mypage.module.css';
import { Side } from './Side/Side';

export const Mypage=()=>{
    return(
        <div className={styles.container}>
            <Side/>
            <Content/>
        </div>
    );
}