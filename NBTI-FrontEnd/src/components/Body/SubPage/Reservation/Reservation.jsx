import styles from './Reservation.module.css'
import { Content } from './Content/Content'
import { Side } from './Side/Side'

export const Reservation = () => {
    return(
        <div className={styles.container}>
            <Side/>
            <Content/>
        </div>
    )
}