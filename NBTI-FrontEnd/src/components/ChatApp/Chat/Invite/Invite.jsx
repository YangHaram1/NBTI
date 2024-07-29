import styles from './Invite.module.css';
import { useEffect, useState, useCallback } from 'react';
import avatar from '../../../../images/user.jpg'
const Invite = ({ setInvite }) => {
    const defaultList = ['양하람', '전은미', '송유나', '김지연', '서상혁'];
    const [list, setList] = useState(defaultList);
    const [nameSearch, setNameSearch] = useState('');
    const [isChecked, setIsChecked] = useState([]);
    const handleNameSearch = (e) => {
        setNameSearch(e.target.value);
    }
    const handleCheck = (index) => {
        setIsChecked((prev) =>
            prev.map((checked, i) => (i === index ? !checked : checked))
        );
    }
    useEffect(() => {
        const initialCheckedState = list.map(() => false);
        setIsChecked(initialCheckedState);
    }, [list]);


    const handleList = useCallback(() => {
        const result = defaultList.map((item, index) => {
            if (item.includes(nameSearch)) {

                return item;
            }
            return null;
        }).filter((item) => {
            return item !== null
        })

        setList(result);
    }, [nameSearch])

    useEffect(() => {
        handleList();
    }, [handleList])

    const handleCancel = () => {
        setInvite(false);
    }
    return (
        <div className={styles.container}>
            <div>
                🔍 <input type="text" placeholder='이름 검색' value={nameSearch} onChange={handleNameSearch} />
            </div>
            <div className={styles.list}>
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
                                    <input type="checkbox" checked={isChecked[index] || false} onChange={(e) => { handleCheck(index) }} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.button}>
                <div>
                    <button className={styles.btn1}>➕</button>
                </div>
                <div>
                    <button className={styles.btn2} onClick={handleCancel}>❌</button>
                </div>
            </div>

        </div>
    )
}
export default Invite;