import { useEffect, useState } from 'react';
import styles from './ListDoc.module.css';
import axios from 'axios';
import { host } from '../../../../../../config/config';


export const ListDoc = ({setlist}) => {

    // DTO 하나 생성하기 -> 기안일, 결재양식, 긴급, 제목, 첨부, 기안자, 문서번호, 문서 상태, 임시번호
    const [Lists, setLists] = useState({})

    // useEffect(()=>{
    //     axios.get(`http://${host}/approval/${setlist}`)
    //     .then((resp)=>{
    //         console.log(resp.data);
    //     })
    // })

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
                    <div className={styles.content_title}> 제목</div>
                    <div className={styles.file}> 첨부</div>
                    <div className={styles.writer}> 기안자</div>
                    <div className={styles.doc_number}> 문서번호</div>
                    <div className={styles.doc_state}> 문서상태</div>
                </div>
                <div className={styles.body}>

                    {/* 매핑으로 데이터 넣을 예정 */}
                    <div className={styles.date}> 2024-07-29</div>
                    <div className={styles.form}> 휴가신청서</div>
                    <div className={styles.emergency}>
                        <div className={styles.emergency_badge}>긴급</div>
                    </div>
                    <div className={styles.content_title}>휴가가 너무너무 가고싶어요</div>
                    <div className={styles.file}>Y</div>
                    <div className={styles.writer}> 기안자</div>
                    <div className={styles.doc_number}> 문서번호</div>
                    <div className={styles.doc_state}>
                        {/* 조건에 따라서 상태가 다르게 표시되게 설정 */}
                        <div className={styles.state_badge}>결재진행중</div>
                    </div>
                    <div className={styles.temp_number}>문서 임시번호</div>
                </div>
            </div>
        </div>
    );
}