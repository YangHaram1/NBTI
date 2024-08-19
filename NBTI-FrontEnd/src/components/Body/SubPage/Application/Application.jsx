import styles from './Application.module.css'

import { Content } from "./Content/Content"
import { Side } from "./Side/Side"
export const Application = () => {
    return(    
        <div className={styles.container}>
            <Side/>
            <Content/>
        </div>
    )
}