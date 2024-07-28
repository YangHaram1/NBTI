import { useRef, useState } from 'react';
import styles from './Profile.module.css';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


export const Profile = () =>{

    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChangeClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    return(
        <div className={styles.container}> 
            <div className={styles.title}>
             프로필 설정 
            </div>
            <div className={styles.content}>
               <div className={`${styles.photo_box} ${styles.box}`}>
                    <div className={`${styles.name} ${styles.photo_name}`}>사진</div>
                    <div className={`${styles.value} ${styles.photo_value_box}`}>
                    <div className={styles.photo}>
                            {previewImage ? (
                                <img src={previewImage} alt="미리 보기" className={styles.preview} />
                            ) : (
                                '사진 영역'
                            )}
                        </div>
                        <div className={styles.change}>
                            <button className={styles.change_btn} onClick={handleChangeClick}>변경하기</button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
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
                <button className={styles.save_btn}>저장</button>
                <div className={styles.empty_box}></div>
                <button className={styles.cancle_btn}>취소</button>
                <div className={styles.empty_box}></div>
            </div>
        </div>
    );
};