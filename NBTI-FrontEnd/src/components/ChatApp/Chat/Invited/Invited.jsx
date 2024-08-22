import { host } from '../../../../config/config';
import { useMemberStore } from '../../../../store/store';
import styles from './Invited.module.css';
import { useState,useCallback,useEffect } from 'react';
import avatar from '../../../../images/user.jpg'
const Invited = ({ chatCheck }) => {
    const { members } = useMemberStore();
    const [list, setList] = useState([]);
    const [invited, setInvited] = useState([]);

    useEffect(() => {
        setInvited(chatCheck); //멤버리스트
    }, [])
    const handleList = useCallback(() => {
        if (invited.length > 0) { //초대된 사람 전체 멤버에서 필터로 제외시키기
            const result = members.filter((item) => {
                let check = true;
                invited.forEach(element => {
                    if (item.id === element.member_id) {
                        check = false;
                    }
                });
                if (check) return false;
                return true;
            })
            // .map((item, index) => {//검색 기능 추가
            //     if (item.name.includes(nameSearch)) {

            //         return item;
            //     }
            //     return null;
            // }).filter((item) => {
            //     return item !== null
            // })

            setList(result);
        }

    }, [invited])
    
    useEffect(() => {
        handleList();
    }, [handleList]);
    return (

        <div className={styles.container}>
            <div className={styles.header}>
                멤버 목록
            </div>
            {
                list.map((item,index)=>{
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.itemDiv1}>
                                <img src={(item.member_img === null) ? `${avatar}` : `${host}/images/avatar/${item.id}/${item.member_img}`} alt="" className={styles.avatar} />
                            </div>
                            <div className={styles.itemDiv2}>
                                {item.name}
                            </div>
                            <div className={styles.itemDiv2}>
                                {item.job_code}
                            </div>
                            <div className={styles.itemDiv2}>
                                {item.team_code}
                            </div>

                        </div>
                    );
                })
            }
        </div>


    )
}
export default Invited