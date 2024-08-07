
import styles from './Manager.module.css'
import { Content } from './Content/Content'
import { Header } from './Header/Header'

export const Manager = () => {
    return(
        <div className={styles.container}>
        <div className={styles.title}>
            <h3>승인 관리</h3>   
        </div>
        <div className={styles.content}>
            <Header/>
            <Content/>
        </div>
    </div>
    )
}