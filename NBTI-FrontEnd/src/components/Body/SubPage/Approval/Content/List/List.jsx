import styles from './List.module.css';


export const List = ({setlist}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.content}>리스트 출력 예정</div>
        </div>
    );
}