import styles from './Profile.module.css';
import { host } from '../../../../../config/config';
import avatar from '../../../../../images/user.jpg'
import { useEffect } from 'react';
const Profile = ({ profileRef, index, item, team, dept }) => {

    const handleCancel = () => {
        profileRef.current[index].style.display = 'none';
    }
    return (
        <div className={styles.container} ref={el => profileRef.current[index] = el}>
            <div className={styles.header}>
                <div className={styles.title}>
                    사용자 등록정보
                </div>
                <div className={styles.cancel}>
                    <button onClick={handleCancel}>❌</button>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.img}>
                    <img src={(item.member_img === null) ? `${avatar}` : `${host}/images/avatar/${item.id}/${item.member_img}`} alt="" />
                </div>
                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                    <div className={styles.name}>
                        {item.name}
                    </div>
                    <div className={styles.job}>
                        {item.job_name}
                    </div>
                </div>
            </div>
            <div className={styles.contents}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className={styles.dept}>
                        부서 :
                    </div>
                    <div className={styles.team}>
                        팀 :
                    </div>
                    <div>
                        성별 :
                    </div>
                    <div>
                        이메일 :
                    </div>
                    <div>
                        휴대전화 :
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className={styles.dept}>
                        {dept}
                    </div>
                    <div className={styles.team}>
                        {team}
                    </div>
                    <div>
                        {item.gender === 'F' ? '여자' : '남자'}
                    </div>
                    <div>
                        {item.email}
                    </div>
                    <div>
                        {item.member_call}
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Profile;