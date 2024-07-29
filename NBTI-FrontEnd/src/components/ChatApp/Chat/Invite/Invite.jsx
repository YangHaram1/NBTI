import styles from './Invite.module.css';
import { useEffect, useState } from 'react';
import avatar from '../../../../images/user.jpg'
const Invite = () => {
    const [list, setList] = useState(['양하람', '전은미', '송유나', '김지연', '서상혁']);
    const [nameSearch, setNameSearch] = useState();
    const [isChecked, setIsChecked] = useState([]);
    const handleNameSearch = (e) => {
        setNameSearch(e.target.value);
    }
    useEffect(()=>{
        for(let i; i<list.length;i++){
            setIsChecked((prev)=>{
                return [...prev,false];
            })
        }
    },[])
    return (
        <div className={styles.container}>
            <div>
                🔍 <input type="text" placeholder='이름 검색' value={nameSearch} onChange={handleNameSearch} />
            </div>
            {
                list.map((item, index) => {
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.itemDiv1}>
                                <img src={avatar} alt="" className={styles.avatar} />
                            </div>
                            <div className={styles.itemDiv2}>
                                {item}
                            </div>
                            <div className={styles.checkbox}>
                                <input type="checkbox" />
                            </div>
                        </div>

                    );
                })
            }
        </div>
    )
}
export default Invite;