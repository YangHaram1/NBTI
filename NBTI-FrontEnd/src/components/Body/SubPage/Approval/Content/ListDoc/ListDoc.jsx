import { useEffect, useState } from 'react';
import styles from './ListDoc.module.css';
import axios from 'axios';
import { host } from '../../../../../../config/config';
import { format } from 'date-fns';
import { Await, useNavigate } from 'react-router-dom';


export const ListDoc = ({setlist}) => {

    // DTO 하나 생성하기 -> 기안일, 결재양식, 긴급, 제목, 첨부, 기안자, 문서번호, 문서 상태, 임시번호
    const [lists, setLists] = useState([]);
    const navi = useNavigate();
    const [fileExistenceMap, setFileExistenceMap] = useState({});

    useEffect(()=>{
        let url = '';
        console.log(setlist);
        switch (setlist) {
            // case '전체 문서함':
            //     // url = `http://${host}/approval/getAllDoc`;
            //     break;
            case '기안 문서함':
                console.log("기안문서");
                url = `${host}/approval/getWriterIsMe`;
                break;
            case '결재 문서함':
                console.log("결재문서")
                url = `${host}/approval/getApprovalIsMe`;
                break;
            // case '수신 문서함':
            case '참조/열람 문서함':
                console.log("참조/열람 문서함");
                url = `${host}/approval/getReferIsMe`
                break;
            case '반려 문서함':
                console.log("반려 문서함");
                url = `${host}/approval/getReturn`
                break;
            case '상신취소 문서함':
                console.log("상신취소 문서함");
                url = `${host}/approval/getCancle`
                break;
            case '임시 저장 문서함':
                console.log("임시 저장 문서함");
                url = `${host}/approval/getTemp`
                break;
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


    const renderDocStateBadge = (docState) => {
        switch (docState) {
            case 'p':
                return <div className={styles.state_badge_gray}>결재 완료</div>;
            case 'r':
                return <div className={styles.state_badge_red}>결재 반려</div>;
            case 'c':
                return <div className={styles.state_badge_red}>상신 취소</div>;
            case 't':
            return <div className={styles.state_badge_red}>임시 저장</div>;
            default:
                return <div className={styles.state_badge_green}>결재진행중</div>;
        }
    };

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
                    <div className={styles.date}>기안일</div>
                    <div className={styles.form}> 결재양식</div>
                    <div className={styles.emergency}> 긴급</div>
                    <div className={styles.content_title}> 제목</div>
                    <div className={styles.file}> 첨부</div>
                    {setlist !== '반려 문서함' && setlist !== '상신취소 문서함' && setlist !== '임시 저장 문서함'? (
                        <>
                        <div className={styles.writer}> 기안자</div>
                        <div className={styles.doc_number}> 문서번호</div>
                        <div className={styles.doc_state}> 문서상태</div>
                        </>
                    ) : null}
                </div>
                <div className={styles.body}>
                { 
                    lists.map((list)=>{
                        return(
                            <div className={styles.list}>
                                <div className={styles.date}>
                                {
                                    format(new Date(list.approval_date),'yyyy-MM-dd')
                                }
                                </div>
                                <div className={styles.form}>{list.doc_sub_name}</div>
                                <div className={styles.emergency}>
                                        {
                                            list.emergency == "Y  " ?  <div className={styles.emergency_badge}>긴급</div> :"" 
                                        }
                                </div>
                                <div className={styles.content_title} onClick={() => handleMove(list.temp_seq, list.doc_sub_name)}>
                                    {
                                        list.title !== null ? list.title : list.doc_sub_name 
                                    }
                                    <input type='hidden' value={list.temp_seq}></input>
                                    <input type='hidden' value={list.doc_sub_name}></input>
                                </div>
                                <div className={styles.file}>
                                    {console.log("콘솔로 찍어보깅",fileExistenceMap[list.temp_seq])}
                                    {
                                    fileExistenceMap[list.temp_seq] != undefined
                                    ? Array.from(fileExistenceMap[list.temp_seq]).length > 0 ? <i class="fa-solid fa-paperclip"></i> : ''
                                    : '...'} {/* 로딩 중일 때는 '...' 표시 */}
                                </div>
                                {setlist !== '반려 문서함' && setlist !== '상신취소 문서함' && setlist !== '임시 저장 문서함' ? (
                                <>
                                <div className={styles.writer}> {list.name}</div>
                                <div className={styles.doc_number}>{list.approval_seq}</div>
                                <div className={styles.doc_state}>
                                    {renderDocStateBadge(list.doc_state)}
                                </div>
                                </>
                            ) : null}
                            </div>
                        );

                    }) 
                } 
                </div>
            </div>
        </div>
    );
}