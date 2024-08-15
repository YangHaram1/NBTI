import { useEffect, useState } from 'react';
import { DocDraft } from './DocDraft/DocDraft';
import { DocLeave } from './DocLeave/DocLeave';
import { DocVacation } from "./DocVacation/DocVacation";
import styles from './Write.module.css';
import { host } from '../../../../../../config/config';
import axios from 'axios';
import { useApprovalLine, useDocLeave, useDocVacation, useReferLine } from '../../../../../../store/store';
import { useNavigate } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export const Write = ({setlist})=>{

    const [userdata, setUserData] = useState({}); 
    const [docdata, setDocData] = useState({effective_date:'', cooperation_dept:'', title:'', content:'', emergency:'' });
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [dept, setDept] = useState('');
    const [title, setTitle] = useState('');
    const { referLine, resetReferLine} = useReferLine();
    const { approvalLine, resetApprovalLine } = useApprovalLine();
    const { docLeave } = useDocLeave();
    const { docVacation } = useDocVacation();
    const [refer, setRefer] = useState([]);
    const [fileInfo, setFileInfo] = useState([]);
    const [files, setFiles] = useState([]);

    const navi = useNavigate();

    // ===== 아이콘 =====
    useEffect(() => {
        // 외부 스타일시트를 동적으로 추가
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(link);

        // 컴포넌트가 언마운트될 때 스타일시트를 제거
        return () => {
        document.head.removeChild(link);
        };
    }, []);

    const handleModal = () =>{
        // 모달창 가져올 수 있게 하기 (결재선 지정)
    }

    const approvalSubmit = () =>{

        let result = window.confirm("긴급 문서로 하시겠습니까?");
        // console.log("개별", date, dept, title, content);
        let requestData;

        if(setlist === "업무기안서"){
            // docData => 업무기안서 내용 => else if 시 다른 변수로 변경 필요
            requestData = {
                docDraft: {
                    effective_date: date,
                    cooperation_dept: dept,
                    title: title,
                    content: content
                },
                approvalLine: approvalLine,
                referLine: referLine,
                emergency: result,
                docType : setlist === '업무기안서'? 1 : setlist === '휴직신청서' ? 2:3,
                files : files
            };  
        }else if(setlist === "휴가신청서"){
            requestData = {
                docVacation: docVacation,
                approvalLine: approvalLine,
                referLine: referLine,
                emergency: result,
                docType : setlist === '업무기안서'? 1 : setlist === '휴직신청서' ? 2:3,
                files : files
            };
            // console.log("휴가",docVacation);
            // console.log("휴가 신청서");
            // console.log("휴가 결재",approvalLine);
            // console.log("휴가 참조",referLine);

        }else if(setlist === "휴직신청서"){
            requestData = {
                docLeave: docLeave,
                approvalLine: approvalLine,
                referLine: referLine,
                emergency: result,
                docType : setlist === '업무기안서'? 1 : setlist === '휴직신청서' ? 2:3,
                files : files
            };
            // console.log("휴직", docLeave);
            // console.log("휴직 신청서");
            // console.log("휴직 결재",approvalLine);
            // console.log("휴직 참조",referLine);
        }
    
        axios.post(`${host}/approval`, requestData)
            .then(response => {
                resetApprovalLine();
                resetReferLine();
                console.log("성공!");
                navi("/approval");
            })
            .catch(error => {
                console.error("문서 제출 실패:", error);
            });
    }

    useEffect(()=>{
        axios.get(`${host}/members/docData`)
        .then((resp)=>{
            // console.log("정보 받아오기",resp);
            // console.log("테스트",resp.data.NAME);
            setUserData(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        console.log("참조라인 데이터 확인",referLine);
        axios.post(`${host}/members/approvalSearch`,referLine)
        .then((resp)=>{
            // console.log("데이터 확인",resp.data);
            setRefer(resp.data);
            console.log(refer);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[referLine])

    // 파일 첨부
    const handleFileChange  = (e)=>{

        const selectedFiles = Array.from(e.target.files);

        // Update files array
        setFiles((prev) => [...prev, ...selectedFiles]);

        // Update fileInfo array
        const newFileInfo = selectedFiles.map(file => ({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`, // Size in KB
            id: file.name + Date.now() // Unique identifier
        }));

        setFileInfo((prev) => [...prev, ...newFileInfo]);

    }

    const handleFileDelete = (fileId) => {
        // Remove file from files array
        const updatedFiles = files.filter((file) => file.name + Date.now() !== fileId);
        setFiles(updatedFiles);

        // Remove file info from fileInfo array
        const updatedFileInfo = fileInfo.filter((file) => file.id !== fileId);
        setFileInfo(updatedFileInfo);
    };

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {setlist}
            </div>
            <div className={styles.content_box}>
                <div className={styles.content_left}>
                    <div className={styles.btns}>
                        <div className={`${styles.approval_submit_btn} ${styles.btn}`} onClick={approvalSubmit}><i class="fa-solid fa-pen-to-square"></i>결재요청</div>
                        <div className={`${styles.approval_temp_btn} ${styles.btn}`}><i class="fa-regular fa-folder-open"></i>임시저장</div>
                        {/* <div className={`${styles.approval_prev_btn} ${styles.btn}`}>미리보기</div> */}
                        <div className={`${styles.approval_change_btn} ${styles.btn}`} onClick={handleModal}><i class="fa-solid fa-users"></i>결재선변경</div>
                    </div>
                    <div className={styles.write_box}>
                        {   
                        setlist === '휴가신청서' ?  <DocVacation userdata={userdata}/>
                        : setlist === '휴직신청서' ? <DocLeave userdata={userdata} setContent={setContent} content={content}/>
                        : <DocDraft userdata={userdata} setDocData={setDocData} setContent={setContent} content={content} setDate={setDate} setDept={setDept} setTitle={setTitle}/>
                        }   
                    </div>
                    
                    <div className={styles.files}>
                        <div className={styles.file_title}> 첨부 파일</div>
                        <div className={styles.file_content}>
                            <div className={styles.file_input}>
                                <input type="file" multiple onChange={handleFileChange}/> <span>파일 첨부는 최대 5개 까지 가능합니다.</span>
                            </div>
                            <div className={styles.file_list}>
                                {fileInfo.map((file, index) => (
                                    <div key={index} className={styles.file_item}>
                                        {file.name} ({file.size}) <button  onClick={() => handleFileDelete(file.id)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.content_right}>
                    <div className={styles.content_right_title}>참조/열람자</div>
                    <div className={styles.content_right_content}>
                    {
                        refer.map((refer)=>{
                            return(
                                <div className={styles.refer}>
                                    {refer.name} ({refer.JOB_NAME}) / {refer.DEPT_NAME} / {refer.TEAM_NAME}
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}