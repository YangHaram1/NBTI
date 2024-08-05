import styles from './Setting.module.css';

const Setting = ({setSetting}) => {
    const handleCancel=()=>{
        setSetting((prev)=>{
            return !prev;
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <div className={styles.div1}>
                    환경 설정
                </div>
                <div className={styles.div2}>
                    <input type="text" placeholder='' />
                </div>
                <div className={styles.div3}>
                    <button >확인</button>
                    <button onClick={handleCancel} >취소</button>
                </div>
            </div>
        </div>
    );
}
export default Setting;