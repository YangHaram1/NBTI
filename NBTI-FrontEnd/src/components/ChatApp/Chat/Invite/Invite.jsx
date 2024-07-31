import styles from './Invite.module.css';
import { useEffect, useState, useCallback, useContext } from 'react';
import avatar from '../../../../images/user.jpg'
import { useCheckList, useMemberStore } from '../../../../store/store';
import { useAuthStore } from './../../../../store/store';
import axios from 'axios';
import { ChatsContext } from '../../../../Context/ChatsContext';
import { host } from '../../../../config/config';
const Invite = ({ setInvite }) => {
    const {members} =useMemberStore();
    const {loginID} =useAuthStore();
    const [list, setList] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [isChecked, setIsChecked] = useState([]);
    const {chatSeq} =useCheckList();
    const [invited,setInvited]=useState([]);
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
    
    useEffect(()=>{
        axios.get(`${host}/group_member?group_seq=${chatSeq}`).then((resp)=>{
            //console.log(resp.data);
            setInvited(resp.data);
        })
    },[])

    const handleList = useCallback(() => {
        if(invited.length>0){
            const result= members.filter((item)=>{
                let check=false;
                invited.forEach(element => {
                
                   if(item.id===element.member_id){
                        check=true;
                   } 
                });
                if(check) return false;
                return true;
            }).map((item, index) => {
                if (item.name.includes(nameSearch)) {
    
                    return item;
                }
                return null;
            }).filter((item) => {
                return item !== null
            })
    
            setList(result);
        }
      
    }, [nameSearch,invited])

    useEffect(() => {
        handleList();
    }, [handleList]);

    const handleCancel = () => {
        setInvite(false);
    }

    const handleAdd=()=>{
        const data=list.filter((item,index)=>{
            if(isChecked[index]===true){
                return true;
            }
            return false;
        }).map((item)=>{
            return item.id;
        })
        console.log(data);
        axios.post(`${host}/group_member`,data).then((resp)=>{
            setInvite(false);
        })
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
                                    {item.name}
                                </div>
                                <div className={styles.checkbox}>
                                    <input type="checkbox" checked={isChecked[index] || false} onChange={(e) => { handleCheck(index) }}  value={item.id}/>
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