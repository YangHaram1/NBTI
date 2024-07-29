import styles from './ListDoc.module.css';


export const ListDoc = ({setlist}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.content}>
                <div className={styles.head}> 제목 열 </div>
                <div className={styles.Body}> 내용 열 </div>
            </div>
        </div>
    );
}