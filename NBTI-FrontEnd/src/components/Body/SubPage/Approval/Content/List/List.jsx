import styles from './List.module.css';


export const List = ({setlist}) => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.search_box}>
                <input type='text' placeholder='Seach'></input>
                <button>검색</button>
            </div>
            <div className={styles.content}>
                <div className={styles.head}> 
                    <div className={styles.date}> 기안일</div>
                    <div className={styles.form}> 결재양식</div>
                    <div className={styles.emergency}> 긴급</div>
                    <div className={styles.content_title}> 제목</div>
                    <div className={styles.file}> 첨부</div>
                    <div className={styles.writer}> 기안자</div>
                </div>
                <div className={styles.body}>

                    {/* 매핑으로 데이터 넣을 예정 */}
                    <div className={styles.date}> 2024-07-29</div>
                    <div className={styles.form}> 휴가신청서</div>
                    <div className={styles.emergency}>
                        <div className={styles.emergency_badge}>긴급</div>
                    </div>
                    <div className={styles.content_title}>휴가가 너무너무 가고싶어요</div>
                    <div className={styles.file}>Y</div>
                    <div className={styles.writer}> 기안자</div>
                </div>
            </div>
        </div>
    );
}