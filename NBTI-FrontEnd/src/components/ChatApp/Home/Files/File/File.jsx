import styles from './File.module.css';
import React from 'react';
import { useAuthStore } from '../../../../../store/store';
import axios from 'axios';
import { host } from '../../../../../config/config';
const File = ({ file ,setDeleteCheck}) => {
    const { loginID } = useAuthStore();

    const handleDelete=(seq)=>{
        const confirm=window.confirm("삭제하시겠습니까?");
        if(confirm){
            axios.delete(`${host}/chat_upload?seq=${seq}`).then((resp)=>{
                setDeleteCheck((prev)=>{
                    return !prev;
                })
            })
        } 
    }
    return (
        <div className={styles.container}>
            <ul>
                {
                    <li className={styles.item}>
                        <div>
                            {file.oriname}
                        </div>
                        <div>
                            {file.member_id}
                        </div>
                        <div className={styles.delete}>
                            {(loginID===file.member_id)&&(<i className="fa-solid fa-trash" onClick={()=>handleDelete(file.seq)}></i>)}
                        </div>
                    </li>
                }

            </ul>
        </div>
    );

}
export default File;