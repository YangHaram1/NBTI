import styles from './Home.module.css';

export const Home = ()=>{
    return(
        <div className={styles.container}>
            <div className={styles.title}>전자결재</div>
            <div className={styles.bubble_box}>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
                <div className={styles.bubble}>
                </div>
            </div>
            <hr></hr>
            <div className={styles.draft_box}>
                <div className={styles.sub_title}>
                    기안 진행 문서
                </div>
                <div className={styles.sub_content}>
                    <div className={styles.table}>
                        <div className={styles.table_head}>
                            <div className={styles.doc_number}>문서번호</div>
                            <div className={styles.doc_title}>제목</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>기안일</div>
                            <div className={styles.doc_state}>상태</div>
                        </div>
                        <div className={styles.table_body}>
                            <div className={styles.doc_number}>HR-27-001</div>
                            <div className={styles.doc_title}>27년 하반기 워크숍 일정 종합</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>2027-07-24</div>
                            <div className={styles.doc_state}>진행중</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className={styles.doc_box}>
                <div className={styles.sub_title}>
                    문서함
                </div>
                <div className={styles.sub_content}>
                    <div className={styles.table}>  
                        <div className={styles.table_head}>
                            <div className={styles.doc_number}>문서번호</div>
                            <div className={styles.doc_title}>제목</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>기안일</div>
                            <div className={styles.doc_state}>상태</div>
                        </div>
                        <div className={styles.table_body}>
                            <div className={styles.doc_number}>HR-27-001</div>
                            <div className={styles.doc_title}>27년 하반기 워크숍 일정 종합</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>2027-07-24</div>
                            <div className={styles.doc_state}>진행중</div>
                        </div>
                        
                        </div>
                    </div>
            </div>
        </div>
    );
}