import styles from './Reservation.module.css'
import { Content } from './Content/Content'
import { Side } from './Side/Side'
import { useReservationStore } from '../../../../store/store';

export const Reservation = () => {
    return(    
        <div className={styles.container}>
            <Side/>
            <Content/>
        </div>
    )
}