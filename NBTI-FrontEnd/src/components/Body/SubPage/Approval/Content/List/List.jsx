import styles from './List.module.css';


export const List = ({setlist}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.search_box}>검색</div>
            <div className={styles.content}>
                <div className={styles.head}> 
                    <div className={styles.head_date}> 기안일</div>
                    <div className={styles.head_form}> 결재양식</div>
                    <div className={styles.head_emergency}> 긴급</div>
                    <div className={styles.head_title}> 제목</div>
                    <div className={styles.head_file}> 첨부</div>
                    <div className={styles.head_writer}> 기안자</div>
                </div>
                <div className={styles.Body}> 내용 열 </div>
            </div>
        </div>
    );
}