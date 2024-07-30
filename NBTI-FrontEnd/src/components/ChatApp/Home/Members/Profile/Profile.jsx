import styles from './Profile.module.css';
const Profile =({profileRef,index})=>{

    const handleCancel=()=>{

    }
    return (
            <div className={styles.container} ref={el=>profileRef.current[index]=el}>
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <button onClick={handleCancel}>❌</button>
                    </div>   
                </div>
                <div className={styles.content} >
                    멤버 이름
                </div>
                <div className={styles.content} >
                    멤버 정조
                </div>
               
            </div>
   
    );
}
export default Profile;