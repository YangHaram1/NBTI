
import { Header } from '../Header/Header';
import styles from './DocLeave.module.css';

export const DocLeave = ({setlist,docCommonData,userdata, approvalData, referData, DocLeave})=>{

    return(

        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.header}>
                <Header docCommonData={docCommonData} userdata={userdata} approvalData={approvalData}/>
            </div>
            <div className={styles.content}>

            </div>
        </div>

    );

}