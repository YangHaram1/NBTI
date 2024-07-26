import styles from './Calendar.module.css'
import { Content } from './Content/Content';
import { Side } from './Side/Side';

export const Calendar = () => {
    return(
        <div className={styles.container}>
            <Side/>
            <Content/>
        </div>
    )
};
