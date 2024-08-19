import styles from './Invite.module.css';
import { useEffect, useState, useCallback, useContext } from 'react';
import avatar from '../../../../images/user.jpg'
import { useCheckList, useMemberStore } from '../../../../store/store';
import { useAuthStore } from './../../../../store/store';
import axios from 'axios';
import { ChatsContext } from '../../../../Context/ChatsContext';
import { host } from '../../../../config/config';
const Invite = ({ setInvite, chatCheck }) => {
    const { members } = useMemberStore();
    const { loginID } = useAuthStore();
    const [list, setList] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [isChecked, setIsChecked] = useState([]);
    const { chatSeq } = useCheckList();
    const [invited, setInvited] = useState([]);
    const [allInvited, setAllInvited] = useState(false);

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

    useEffect(() => {
        setInvited(chatCheck); //멤버리스트
    }, [])

    const handleList = useCallback(() => {
        if (invited.length > 0) { //초대된 사람 전체 멤버에서 필터로 제외시키기
            const result = members.filter((item) => {
                let check = false;
                invited.forEach(element => {
                    if (item.id === element.member_id) {
                        check = true;
                    }
                });
                if (check) return false;
                return true;
            }).map((item, index) => {//검색 기능 추가
                if (item.name.includes(nameSearch)) {

                    return item;
                }
                return null;
            }).filter((item) => {
                return item !== null
            })

            setList(result);
        }

    }, [nameSearch, invited])

    useEffect(() => {
        handleList();
    }, [handleList]);

    const handleCancel = () => {
        setInvite(false);
    }

    const handleAdd = () => {
        const data = list.filter((item, index) => {
            if (isChecked[index] === true) {
                return true;
            }
            return false;
        }).map((item) => {
            return item.id;
        })
        //console.log(data);
        axios.post(`${host}/group_member`, data).then((resp) => {
            setInvite(false);
        })
    }

    const handelAllCheck = () => {
        setAllInvited((prev) => {
            if (prev === false) {//전이 false니까 현재는 true가 되는거고
                setIsChecked((prev) => {
                    return (
                        prev.map((item) => {
                            if (item === false) {
                                return !item;
                            }
                            return item;
                        })
                    )
                })
            }
            else { //이건 전이 true니까 현재는 fasle가 되는거
                setIsChecked((prev) => {
                    return (
                        prev.map((item) => {
                            if (item === true) {
                                return !item;
                            }
                            return item;
                        })
                    )
                })
            }
            return !prev
        });

    }

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <div>
                    🔍
                </div>
                <div>
                    <input type="text" placeholder='이름 검색' value={nameSearch} onChange={handleNameSearch} />
                </div>
                <div>
                    <input type="checkbox" checked={allInvited} onChange={handelAllCheck} />
                </div>
            </div>
            <div className={styles.list}>
                {
                    list.map((item, index) => {
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
                                <div className={styles.checkbox}>
                                    <input type="checkbox" checked={isChecked[index] || false} onChange={(e) => { handleCheck(index) }} value={item.id} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.button}>
                <div>
                    <button className={styles.btn1} onClick={handleAdd}>➕</button>
                </div>
                <div>
                    <button className={styles.btn2} onClick={handleCancel}>❌</button>
                </div>
            </div>
        </div>
    )
}
export default Invite;