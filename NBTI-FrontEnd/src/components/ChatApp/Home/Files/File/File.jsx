import styles from './File.module.css';
import React from 'react';
import { useAuthStore } from '../../../../../store/store';
import axios from 'axios';
import { host } from '../../../../../config/config';

const File = ({ file, setDeleteCheck }) => {
    const { loginID } = useAuthStore();

    const handleDelete = (seq) => {
        const confirm = window.confirm("삭제하시겠습니까?");
        if (confirm) {
            axios.delete(`${host}/chat_upload?seq=${seq}`).then((resp) => {
                setDeleteCheck((prev) => {
                    return !prev;
                })
            })
        }
    }
    const handleDownload = (e) => {
        const confirm = window.confirm('다운로드를 진행하시겠습니까?');
        if (confirm) {
            return true;
        }
        e.preventDefault();
    }
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div>
                    <a href={`${host}/files/downloadChat?oriname=${file.oriname}&&sysname=${file.sysname}`} download={file.oriname} onClick={handleDownload}>{file.oriname}</a>
                </div>
                <div className={styles.name}>
                    {file.member_id}
                </div>
                <div className={styles.delete}>
                    {(loginID === file.member_id) && (<i className="fa-solid fa-trash" onClick={() => handleDelete(file.seq)}></i>)}
                </div>
            </div>
        </div>
    );

}
export default File;