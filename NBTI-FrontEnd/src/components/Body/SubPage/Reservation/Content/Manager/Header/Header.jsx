import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
    const navi = useNavigate();


    return(
        <div className={styles.container}>
            <div className={styles.tab_menu}>
                <button onClick={()=> navi('wait')}>대기</button>
                <button onClick={()=> navi('approve')}>승인</button>
                <button onClick={()=> navi('reject')}>반려</button>
            </div>
        </div>
    )
}