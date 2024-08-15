import styles from './File.module.css';
import React from 'react';
import { useAuthStore } from '../../../../../store/store';
import axios from 'axios';
import { host } from '../../../../../config/config';
import SweetAlert from '../../../../../function/SweetAlert';
const File = ({ file, setDeleteCheck }) => {
    const { loginID } = useAuthStore();

    const handleDelete = (seq) => {
    
            axios.delete(`${host}/chat_upload?seq=${seq}`).then((resp) => {
                setDeleteCheck((prev) => {
                    return !prev;
                })
            })
        
    }
    const handleDownload = () => {
        const linkElement = document.createElement('a');
        // 2. 링크 속성 설정
        linkElement.href = `${host}/files/downloadChat?oriname=${file.oriname}&&sysname=${file.sysname}`;
        linkElement.download = file.oriname;
        linkElement.click();
    }
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div  className={styles.oriname} onClick={()=>SweetAlert('warning', '파일', '다운로드를 진행하시겠습니까?', handleDownload)}>
                   {file.oriname}
                </div>
                <div className={styles.name}>
                    {file.member_id}
                </div>
                <div className={styles.delete} onClick={(loginID === file.member_id)?() => SweetAlert('warning', '파일', '삭제 하시겠습니까?', ()=>handleDelete(file.seq)):undefined}>
                    {(loginID === file.member_id) && (<i className="fa-solid fa-trash"></i>)}
                </div>
            </div>
        </div>
    );

}
export default File;