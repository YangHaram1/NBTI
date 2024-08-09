import styles from './Profile.module.css';
import { host } from '../../../../../config/config';
import avatar from '../../../../../images/user.jpg'
const Profile = ({ profileRef, index, item }) => {

    const handleCancel = () => {
        profileRef.current[index].style.display = 'none';
    }
    return (
        <div className={styles.container} ref={el => profileRef.current[index] = el}>
            <div className={styles.img}>
                <img src={(item.member_img === null) ? `${avatar}` : `${host}/images/avatar/${item.id}/${item.member_img}`} alt="" />
            </div>
            <div className={styles.contents}>
                <div className={styles.content}>
                    <button onClick={handleCancel}>❌</button>
                </div>
                <div className={styles.content} >
                    {item.name}
                </div>
                <div className={styles.content} >
                    멤버 정보
                </div>
            </div>

        </div>

    );
}
export default Profile;