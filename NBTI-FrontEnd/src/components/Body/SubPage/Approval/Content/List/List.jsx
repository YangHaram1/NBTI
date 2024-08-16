import { useEffect, useState } from 'react';
import styles from './List.module.css';
import { format } from 'date-fns';
import { host } from '../../../../../../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const List = ({setlist}) => {

    const navi = useNavigate();
    const [lists, setLists] = useState([]);
    const [fileExistenceMap, setFileExistenceMap] = useState({});

    useEffect(()=>{
        let url = '';
        console.log(setlist);
        switch (setlist) {
            case '결재 대기':
                console.log("결재대기");
                url = `${host}/approval/getApprovalWait`;
                break;
            case '결재 예정':
                console.log("결재 예정")
                url = `${host}/approval/getApprovalBook`;
                break;
            case '참조/열람 대기':
                console.log("참조/열람 대기");
                url = `${host}/approval/getReferIsMeWait`
                break;
            // case '반려 문서함':
            default:
                return;
        }
        axios.get(url)
        .then(async (resp) => {
            console.log(resp.data);
            setLists(resp.data);

            const filePromises = resp.data.map(async (list) => {
                try {
                    let seq = list.temp_seq;
                    const fileResp = await axios.get(`${host}/files/getFiles/${seq}`);
                    return { temp_seq: seq, files: fileResp.data };
                } catch (err) {
                    console.error(err);
                    return { temp_seq: list.temp_seq, files: false };
                }
            });
            
            const files = await Promise.all(filePromises);
            const fileMap = files.reduce((acc, { temp_seq, files }) => ({
                ...acc, [temp_seq]: files
            }), {});
            
            setFileExistenceMap(fileMap);
        })
        .catch((error) => {
            console.error(error);
        });
    },[setlist])

    const handleMove = (tempSeq, docSubName) => {
        navi("/approval/detail", {state:{seq:tempSeq, setlist:docSubName, list:setlist}});
    };

    return(
        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.search_box}>
                <input type='text' placeholder='Seach'></input>
                <button>검색</button>
            </div>
            <div className={styles.content}>
                <div className={styles.head}> 
                    <div className={styles.date}> 기안일</div>
                    <div className={styles.form}> 결재양식</div>
                    <div className={styles.emergency}> 긴급</div>
                    <div className={`${styles.content_title} ${styles.align}`}> 제목</div>
                    <div className={styles.file}> 첨부</div>
                    <div className={styles.writer}> 기안자</div>
                </div>
                <div className={styles.body}>

                    {
                        lists.map((list)=>{
                            return(
                            <div className={styles.lists}>
                                <div className={styles.date}>
                                {
                                    format(new Date(list.approval_date),'yyyy-MM-dd')
                                }
                                </div>
                                <div className={styles.form}> {list.doc_sub_name}</div>
                                <div className={styles.emergency}>
                                        {
                                            list.emergency == "Y  " ?  <div className={styles.emergency_badge}>긴급</div> :"" 
                                        }
                                </div>
                                <div className={`${styles.content_title} ${styles.content_title_hover}`} onClick={() => handleMove(list.temp_seq, list.doc_sub_name)}>
                                     {
                                        list.title !== null ? list.title : list.doc_sub_name 
                                    }
                                </div>
                                <div className={styles.file}>
                                    {console.log("콘솔로 찍어보깅",fileExistenceMap[list.temp_seq])}
                                    {
                                    fileExistenceMap[list.temp_seq] != undefined
                                    ? Array.from(fileExistenceMap[list.temp_seq]).length > 0 ? <i class="fa-solid fa-paperclip"></i> : ''
                                    : '...'} {/* 로딩 중일 때는 '...' 표시 */}
                                </div>
                                <div className={styles.writer}> {list.name}</div>
                            </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}