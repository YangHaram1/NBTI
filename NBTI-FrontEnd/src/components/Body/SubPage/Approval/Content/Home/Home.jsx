import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axios from 'axios';
import { host } from '../../../../../../config/config';
import { format } from 'date-fns';
import { ApprovalModal } from '../ApprovalModal/ApprovalModal';
import { HomeApprovalModal } from '../HomeApprovalModal/HomeApprovalModal';


export const Home = ()=>{

    const [showModal, setShowModal] = useState(false);
    const [approvalData, setApprovalData] = useState([]);    
    
    useEffect(()=>{
        axios.get(`${host}/approval/getApprovalWait`)
        .then((resp)=>{
            setApprovalData(resp.data);
            console.log("홈 목록출력",resp.data);
        })
    },[])


    const HandleSubmit = (e) =>{
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false); // 모달 닫기
        window.location.reload();
    };

    console.log("approvalData length:", approvalData.length);


    return(
        <div className={styles.container}>
            <div className={styles.title}>전자결재</div>
            <div className={styles.bubble_box}>
                {
                    approvalData.length !== 0 ?
                    approvalData.map((approval)=>{
                        return(
                            <div className={styles.bubble}>
                                <div className={styles.bubble_state}>
                                    <div className={styles.bedge}>진행중</div>
                                </div>
                                <div className={styles.bubble_title}>
                                    {approval.title != null ? approval.title : approval.doc_sub_name}
                                </div>
                                <div className={styles.approvaler}>
                                    <div className={styles.approvaler_title}>작성자</div>
                                    <div className={styles.approvaler_content}>{approval.name}</div>
                                </div>
                                <div className={styles.approval_date}>
                                    <div className={styles.date_title}>작성일</div>
                                    <div className={styles.date_content}>
                                    {
                                        format(new Date(approval.approval_date), 'yyyy-MM-dd')
                                    }
                                    </div>     
                                </div>
                                <div className={styles.btn}>
                                    <button onClick={HandleSubmit}>결재하기</button>
                                </div>
                                {showModal && <HomeApprovalModal onClose={handleCloseModal} seq={approval.temp_seq} setlist={approval.doc_sub_name} />}
                            </div>
                        );
                    })
                    :
                    <div className={styles.bubble_empty}> 결재할 문서가 없습니다.</div>
                }

            </div>
            <hr></hr>
            <div className={styles.draft_box}>
                <div className={styles.sub_title}>
                    최근 기안 문서
                </div>
                <div className={styles.sub_content}>
                    <div className={styles.table}>
                        <div className={styles.table_head}>
                            <div className={styles.doc_number}>문서번호</div>
                            <div className={styles.doc_title}>제목</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>기안일</div>
                            <div className={styles.doc_state}>상태</div>
                        </div>
                        <div className={styles.table_body}>
                            <div className={styles.doc_number}>HR-27-001</div>
                            <div className={styles.doc_title}>27년 하반기 워크숍 일정 종합</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>2027-07-24</div>
                            <div className={styles.doc_state}>진행중</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className={styles.doc_box}>
                <div className={styles.sub_title}>
                    문서함
                </div>
                <div className={styles.sub_content}>
                    <div className={styles.table}>  
                        <div className={styles.table_head}>
                            <div className={styles.doc_number}>문서번호</div>
                            <div className={styles.doc_title}>제목</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>기안일</div>
                            <div className={styles.doc_state}>상태</div>
                        </div>
                        <div className={styles.table_body}>
                            <div className={styles.doc_number}>HR-27-001</div>
                            <div className={styles.doc_title}>27년 하반기 워크숍 일정 종합</div>
                            <div className={styles.doc_emergency}>긴급</div>
                            <div className={styles.doc_writer}>기안자</div>
                            <div className={styles.doc_write_date}>2027-07-24</div>
                            <div className={styles.doc_state}>진행중</div>
                        </div>
                        
                        </div>
                    </div>
            </div>
        </div>
    );
}