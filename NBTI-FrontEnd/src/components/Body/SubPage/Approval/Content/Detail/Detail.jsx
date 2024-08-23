import axios from 'axios';
import { host } from '../../../../../../config/config';
import styles from './Detail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApprovalLine, useDocLeave, useDocVacation, useEditorCheck, useReferLine } from '../../../../../../store/store';
// import html2pdf from 'html2pdf.js';
import { DocLeave } from './DocLeave/DocLeave';
import { Header } from './Header/Header';
import { DocDraft } from './DocDraft/DocDraft';
import { DocVacation } from './DocVacation/DocVacation';
import { ApprovalModal } from '../ApprovalModal/ApprovalModal';
import { ApprovalCommentModal } from '../ApprovalCommentModal/ApprovalCommentModal';
import Swal from 'sweetalert2';
import SweetAlert from '../../../../../../function/SweetAlert';

export const Detail=()=>{

    const [userdata, setUserData] = useState({}); 
    // const [docdata, setDocData] = useState({effective_date:'', cooperation_dept:'', title:'', content:'', emergency:'' });
    //useLoaction으로 값 받아오기 => 객체이기 때문에 구조분할로 받는것이 용이
    const location = useLocation();
    const { seq, setlist, list } = location.state || {};
    const navi = useNavigate();
    // console.log("seq:", seq);
    // console.log("setlist:", setlist);
    // console.log("list:", list);

    const [approvalData, setApprovalData] = useState([]);
    const [referData, setReferData] = useState([]); 
    const [docCommonData, setDocCommonData] = useState({}); 
    const [docLeaves, setDocLeaves] = useState({}); 
    const [docVacations, setDocVacations] = useState({}); 
    const [docDrafts, setDocDrafts] = useState({}); 
    const [approvalYN, setApprovalYN] = useState('');
    const [fileData, setFileData] = useState([]); 
    const [refer, setRefer] = useState([]);

    // 모달 표시 여부
    const [showModal, setShowModal] = useState(false);
    const [showApprovalComment, setShowApprovalComment] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkFA, setCheckFA] = useState(false);

    const { approvalLine, setApprovalLine ,resetApprovalLine } = useApprovalLine();
    const { referLine, setReferLine, resetReferLine } = useReferLine();
    const { setEditorCheck } = useEditorCheck();
    // const { docVacation, setDocVacation } = useDocVacation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userDataResponse = await axios.get(`${host}/members/docData`);
                setUserData(userDataResponse.data);

                // 문서 공통 정보 받아오기
                const docDataResponse = await axios.get(`${host}/approval/${seq}`)
                setDocCommonData(docDataResponse.data);
                let form_code = docDataResponse.data.doc_sub_seq;
                // 문서양식 별 데이터 받아오기
                if(form_code == 1){
                    // 업무기안
                    const docMainDataResponse = await axios.get(`${host}/docDraft/${seq}`);
                    setDocDrafts(docMainDataResponse.data);
                }
                else if(form_code == 2){
                    // 휴직 신청서
                    const docMainDataResponse = await axios.get(`${host}/docLeave/${seq}`);
                    setDocLeaves(docMainDataResponse.data);
                }else if(form_code == 3){
                    // 휴가 신청서
                    const docMainDataResponse = await axios.get(`${host}/docVacation/${seq}`);
                    setDocVacations(docMainDataResponse.data);
                }
                else{
                    console.log("값이 안나오는 중");
                }
                const approvalLineResponse = await axios.get(`${host}/approvalLine/${seq}`);
                setApprovalData(approvalLineResponse.data);
                if(approvalLineResponse.data[0].APPROVAL_DATE == null){
                    setCheckFA(true);
                }
                // console.log("결재라인 체크",approvalLineResponse.data);

                // 참조라인 정보 받아오기
                const referLineResponse = await axios.get(`${host}/referLine/${seq}`);
                setReferData(referLineResponse.data);
                // console.log("참조라인확인",referLineResponse.data);

                if(list == '참조/열람 대기'){
                    axios.put(`${host}/referLine/read/${seq}`);
                }

                // 첨부파일 정보 받아오기
                const fileResponse = await axios.get(`${host}/files/getFiles/${seq}`);
                setFileData(fileResponse.data);
                // console.log(fileResponse.data);
            
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [seq]);

    useEffect(()=>{
        // console.log("referData 참조라인 데이터 확인",referData);
        if(referData.length > 0){
        axios.post(`${host}/members/approvalSearch`,referData)
        .then((resp)=>{
            // console.log("refer데이터 확인",resp.data);
            setRefer(resp.data);
            // console.log(refer);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    },[referData])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    const HandleSubmit = (e) =>{
        // console.log("이름값 확인",e.target.innerText);
        setApprovalYN(e.target.innerText);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false); // 모달 닫기
        // navi("/approval");
        window.location.reload();
    };

    const handleCloseCommentModal = () => {
        setShowApprovalComment(false); // 모달 닫기
    };
    

    // 제목 클릭시 sysname, oriname 받아오기
    const handleFileDownload = (sysname, oriname) =>{

        axios.get(`${host}/files/downloadApproval?oriname=${encodeURIComponent(oriname)}&sysname=${encodeURIComponent(sysname)}&temp_seq=${seq}`, { responseType: 'blob' })
        .then(response => {
            const contentType = response.headers['content-type'];
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', oriname);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error("파일 다운로드 실패:", error);
        });
    }

    const handleApprovalCancle = ()=>{
        
        SweetAlert('question', '전자결제', '기안 문서를 취소하겠습니까?', () => {
            axios.put(`${host}/approval/cancleByMe/${seq}`)
                .then((resp) => {
                    navi("/approval/listDocWrite");
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    const handleRewrite = () =>{

        // console.log("======재기안========")
        setEditorCheck(false);
        resetApprovalLine();
        resetReferLine();

        // console.log("approval",approvalData);
        approvalData.map((data) => {
           const array = {
                id: data.APPROVAL_ID,
                name: data.NAME,
                order: data.APPROVAL_ORDER
            }
            setApprovalLine(array);
        });

        // resetReferLine();
        // console.log("refer",refer);
        const newRefer = refer.map((data)=>{
            const referdata = { id: data.ID, name: data.NAME, order: "4" }
            setReferLine(referdata);
        })

        setEditorCheck(true);
        navi("/approval/write", { state: { setlist: setlist, temp_seq: docCommonData.temp_seq } });
    }


    const handlePrint = () => {
        const printContent = document.getElementById('content-to-print').innerHTML;
        const originalContent = document.body.innerHTML;
    
        // Apply print styles
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                @page {
                    margin: 15mm;
                }
                #content-to-print {
                    margin: 0;
                    padding: 0;
                }
                .no-print {
                    display: none;
                }
                .no-break {
                    page-break-inside: avoid; /* 페이지 내부에서 나누기 방지 */
                }
                body {
                    font-size: 15pt; /* 글자 크기 조정 */
                }
            }
        `;
        document.head.appendChild(style);
    
        // Update content for print
        document.body.innerHTML = printContent;
    
        // Trigger print dialog
        window.print();
    
        // Restore original content after printing
        window.location.reload(); // Refresh page to restore state
       
    };

    const handleDelete = () => {

        Swal.fire({
            icon: "question",
            title: "전자결재",
            text: "임시 저장 문서를 삭제하시겠습니까?",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            customClass: {
                popup: 'custom-swal-popup',  // 커스텀 클래스 이름 지정
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼을 클릭한 경우
                Swal.fire({
                    icon: 'success',
                    title:  'comfirm!',
                }
                ).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${host}/approval/deleteTemp?seq=${seq}&setlist=${setlist}`)
                        .then(()=>{
                            console.log("문서삭제완료");
                            navi("/approval/listDocTemp")
                        })
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // 취소 버튼을 클릭한 경우
                Swal.fire({
                    icon:'error',
                    title:  'Cancelled'
                }
                  
                ).then((result) => {
                        //취소후 로직 
                });
    
            }
        });

    }

    return(
        <div className={styles.container} >
            <div className={styles.title}>
                {setlist}
            </div>
            <div className={styles.content_box}>
                <div className={styles.content_left}>
                    {
                        list == '기안 문서함' || list == '결재 문서함' ||list == '참조/열람 문서함'||list == '반려 문서함' ||list == '상신취소 문서함'||list == '결재 예정'||list == '참조/열람 대기'?
                        <>
                        <div className={styles.btns}>
                            <div className={`${styles.approval_prev_btn} ${styles.btn}`} onClick={()=>{setShowApprovalComment(true)}}><i className="fa-solid fa-user-pen"></i>결재정보</div>
                            <div className={`${styles.approval_change_btn} ${styles.btn}`} onClick={handlePrint}><i className="fa-solid fa-users"></i>인쇄하기</div>
                            {checkFA == true && list == '기안 문서함'? <div className={`${styles.approval_cancle_btn} ${styles.btn}`} onClick={handleApprovalCancle}> <i className="fa-regular fa-circle-xmark"></i>상신취소</div> : <></>}
                        </div>
                        </>
                        : list == '결재 대기' ?
                        <>
                        <div className={styles.btns}>
                            <div className={`${styles.approval_submit_btn} ${styles.btn}`} onClick={HandleSubmit}><i className="fa-solid fa-pen-to-square"></i>결재승인</div>
                            <div className={`${styles.approval_back_btn} ${styles.btn}`} onClick={HandleSubmit}><i className="fa-regular fa-folder-open"></i>결재반려</div>
                            <div className={`${styles.approval_prev_btn} ${styles.btn}`} onClick={()=>{setShowApprovalComment(true)}}><i className="fa-solid fa-user-pen"></i>결재정보</div>
                            <div className={`${styles.approval_copy_btn} ${styles.btn}`} onClick={handlePrint}><i className="fa-solid fa-users"></i>인쇄하기</div>
                        </div>
                        </>
                        :
                        <>
                        <div className={styles.btns}>
                            <div className={`${styles.approval_submit_btn} ${styles.btn}`} onClick={handleRewrite}><i className="fa-solid fa-pen-to-square"></i>재기안</div>
                            { list !== '임시 저장 문서함'? 
                            <div className={`${styles.approval_prev_btn} ${styles.btn}`} onClick={()=>{setShowApprovalComment(true)}}><i className="fa-solid fa-user-pen"></i>결재정보</div>:''
                            }
                            <div className={`${styles.approval_copy_btn} ${styles.btn}`} onClick={handlePrint}><i className="fa-solid fa-users"></i>복사하기</div>
                            <div className={`${styles.approval_copy_btn} ${styles.btn}`} onClick={handleDelete}><i className="fa-solid fa-trash-can"></i>삭제하기</div>
                        </div>
                        </>
                    }
                    <div className={styles.write_box} id='content-to-print'>
                        <div className={styles.write_title}>{setlist}</div>
                        <div className={styles.write_header}>
                            <Header docCommonData={docCommonData} approvalData={approvalData}/>
                        </div>
                        <div className={styles.write_container}>
                        {   
                        setlist === '휴가신청서' ?  <DocVacation docVacation={docVacations} setDocVacation ={setDocVacations}/>
                        : setlist === '휴직신청서' ? <DocLeave docLeave={docLeaves} setDocLeave={setDocLeaves}/>
                        : <DocDraft setDocDraft={setDocDrafts} docDraft={docDrafts}/>
                        }   
                        </div>
                    </div>
                    <div className={styles.files}>
                        <div className={styles.files_left}>첨부파일 ({fileData.length})</div>
                        <div className={styles.files_right}>
                        {
                            fileData.length > 0 ? 
                                fileData.map((file)=>{
                                    return(
                                        <div key={file.sysname} >
                                            <div className={styles.file_text} onClick={() => handleFileDownload(file.sysname, file.oriname)}>{file.oriname}</div>
                                            <input type='hidden' value={file.sysname} />
                                        </div>
                                    );
                                })
                            :
                            <>
                            </>
                        }
                        </div>
                    </div>
                </div>
                <div className={styles.content_right}>
                    <div className={styles.content_right_title}>참조/열람자</div>
                    <div className={styles.content_right_content}>
                    {
                        refer.map((refer)=>{
                            return(
                                <div className={styles.refer} key={refer.ID}>
                                    {refer.NAME} ({refer.JOB_NAME}) / {refer.DEPT_NAME} / {refer.TEAM_NAME}
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
            {/* <div id="Loading" style={{ display: 'none' }}>Loading...</div> */}
            {showApprovalComment && <ApprovalCommentModal approvalData={approvalData} onClose={handleCloseCommentModal}/>}
            {showModal && <ApprovalModal approvalYN={approvalYN} onClose={handleCloseModal} seq={seq} setlist={setlist} />}
        </div>
    );

}