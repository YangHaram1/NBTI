import styles from './Form_Detail.module.css';

export const Form_Detail = () => {
    return(
        <div className={styles.container}>
            <div className={styles.title}>상세정보</div>
            <div className={styles.content}>
                <div className={styles.common_box}>
                    <div className={styles.name}>공통 분류</div>
                    <div className={styles.value}>인사</div>
                </div>
                <div className={styles.detail_box}>
                    <div className={styles.name}>세부 분류</div>
                    <div className={styles.value}>휴가 신청서</div>
                </div>
                <div className={styles.save_box}>
                    <div className={styles.name}>보존연한</div>
                    <div className={styles.value}>5년</div>
                </div>
            </div>
        </div>
    );
}