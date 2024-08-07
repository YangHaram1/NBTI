import styles from './Content.module.css';
import { useEffect, useState } from 'react';
import { host } from '../../../../../config/config';
import avatar from '../../../../../images/user.jpg'
const Content = ({ member, top, name }) => {
    const [newTop, setNewTop] = useState(0);

    useEffect(() => {
        // newTop 계산 및 상태 업데이트
        const calculatedTop = (top % 100) * 200 + top;
        setNewTop(calculatedTop);
        console.log(calculatedTop);
    }, [top]); // top이 변경될 때마다 다시 계산

    return (
        <div className={styles.container}>
            <div className={styles.member}>
                <div className={styles.div1}>
                    <img src={(member.member_img===null)?`${avatar}`:`${host}/avatar/${member.id}/${member.member_img}`} alt="" />
                </div>
                <div className={styles.div2}>
                    <div>
                        {member.name}
                    </div>
                    <div>
                        {name}
                    </div>
                    <div>
                        {member.job_name}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Content;