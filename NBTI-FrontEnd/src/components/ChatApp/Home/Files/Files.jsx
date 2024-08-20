import styles from './Files.module.css';
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { host } from './../../../../config/config';
import File from './File/File';
import { useCheckList } from '../../../../store/store';
const Files = () => {
    const [listDisplay, setListDisplay] = useState([]);
    const [filesList, setFilesList] = useState([]);
    const { onMessage } = useCheckList();
    const [deleteCheck,setDeleteCheck] =useState(true);

    useEffect(() => {
        axios.get(`${host}/chat_upload`).then((resp) => {
           // console.log(resp.data);
            setListDisplay(() => {
                return (
                    resp.data.filter((temp)=>{
                        if (temp.list.length === 0)
                            return false;
                        return true;
                    }).map((item, index) => {
                        return true;
                    })
                );
            })
            setFilesList(resp.data);
        })
    }, [deleteCheck])

    const handleList = (lIndex) => {
        setListDisplay((prev)=>{
            return (
                prev.map((item,index)=>{
                    if(index===lIndex){
                        return !item;
                    }
                    return item;
                })
            );
        })
    }
    return (
        <div className={styles.container}>
            <ul className={styles.ul}>
                {
                    filesList.filter((temp) => {
                        if (temp.list.length === 0)
                            return false;
                        return true;
                    }).map((item,lIndex) => {
                        const list = item.list;
                        return (
                            <React.Fragment key={lIndex}>
                                <div className={styles.name} onClick={()=>handleList(lIndex)}>
                                    {!listDisplay[lIndex]&&('➕')}
                                    {listDisplay[lIndex]&&('➖')}
                                    {lIndex+1}. {item.name}
                                </div> 
                                {
                                    listDisplay[lIndex]&&(list.map((file, index) => {
                                        return (
                                            <File file={file} setDeleteCheck={setDeleteCheck} key={index}></File>
                                        );
                                    }))
                                }
                            </React.Fragment>
                        );
                    })
                }
            </ul>
        </div>
    );
}
export default Files;