import styles from './Content.module.css';


export const Content = ()=>{
    return(
        <div className={styles.container}> 
            <div className={styles.title}>
             프로필 설정 
            </div>
            <div className={styles.content}>
               <div className={`${styles.photo_box} ${styles.box}`}>
                    <div className={styles.name}>사진</div>
                    <div className={styles.value}>
                        <div className={styles.photo}>사진 영역</div>
                    </div>
               </div>
               <div className={`${styles.name_box} ${styles.box}`}>
                    <div className={styles.name}>이름</div>
                    <div className={styles.value}>가나다</div>
               </div>
               <div className={`${styles.dept_box} ${styles.box}`}>
                    <div className={styles.name}>부서</div>
                    <div className={styles.value}>생산부 생산1팀</div>
               </div>
               <div className={`${styles.job_code_box} ${styles.box}`}>
                    <div className={styles.name}>직위</div>
                    <div className={styles.value}>팀장</div>
                </div>
               <div className={`${styles.birth_box} ${styles.box}`}>
                    <div className={styles.name}>생일</div>
                    <div className={styles.value}>85-01-01</div>
               </div>
               <div className={`${styles.address_box} ${styles.box}`}>
                    <div className={styles.name}>주소</div>
                    <div className={styles.value}>비밀인데요</div>
                </div>
               <div className={`${styles.call_box} ${styles.box}`}>
                    <div className={styles.name}>사내 번호</div>
                    <div className={styles.value}>123-4567</div>
                </div>
            </div>
            <div className={styles.btns}>
                <button>저장</button>
                <button>취소</button>
            </div>
        </div>
    );
}