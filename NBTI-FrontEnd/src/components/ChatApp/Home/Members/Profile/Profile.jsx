import styles from './Profile.module.css';
import { host } from '../../../../../config/config';
import avatar from '../../../../../images/user.jpg'
import { useEffect } from 'react';
const Profile = ({ profileRef, index, item, team, deft }) => {

    useEffect(() => {
        console.log(item)
    }, [])
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
                <div style={{ display: "flex" ,flexDirection:"column",flex:3}}>
                    <div className={styles.content} >
                        {item.name}
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={styles.content} >
                            {deft}
                        </div>
                        <div className={styles.content} >
                            {team}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.contents}>
                여기가 내용
            </div>

        </div>

    );
}
export default Profile;