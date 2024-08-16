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

    // 기안하기
    const approvalSubmit = () =>{

        let result = window.confirm("긴급 문서로 하시겠습니까?");
        // console.log("개별", date, dept, title, content);
        let requestData;

         // 파일 업로드 처리
         const formData = new FormData();
        
         if (files && files.length > 0) {
             files.forEach(file => {
                 formData.append('files', file); // 'files' is the expected part name on the server side
             });
         } else {
             console.error("업로드할 파일이 없습니다.");
            //  return;
         }

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
                docType : 1
            };  
        }else if(setlist === "휴가신청서"){
            requestData = {
                docVacation: docVacation,
                approvalLine: approvalLine,
                referLine: referLine,
                emergency: result,
                docType : 3
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
                docType : 2
            };
            // console.log("휴직", docLeave);
            // console.log("휴직 신청서");
            // console.log("휴직 결재",approvalLine);
            // console.log("휴직 참조",referLine);
        }
    
        formData.append('requestData', JSON.stringify(requestData));

        files.forEach(fileObj => {
            formData.append('files', fileObj.file); // 파일 객체를 FormData에 추가
        });

        // Send the request
        axios.post(`${host}/approval`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            resetReferLine();
            resetApprovalLine();
            console.log("성공!");
            navi("/approval");
        })
        .catch(error => {
            console.error("문서 제출 실패:", error);
        });
    }

    // 임시저장
    const tempSubmit = () =>{

        let result = window.confirm("첨부 파일은 저장되지 않습니다.");
        // console.log("개별", date, dept, title, content);
        let requestData;

        if(result){
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
                emergency: false,
                docType : 1
            };  
        }else if(setlist === "휴가신청서"){
            requestData = {
                docVacation: docVacation,
                approvalLine: approvalLine,
                referLine: referLine,
                emergency: false,
                docType : 3
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
                emergency: false,
                docType : 2
            };
            // console.log("휴직", docLeave);
            // console.log("휴직 신청서");
            // console.log("휴직 결재",approvalLine);
            // console.log("휴직 참조",referLine);
        }

        // Send the request
        axios.post(`${host}/approval/tempSave`, requestData)
        .then(response => {
            resetReferLine();
            resetApprovalLine();
            console.log("성공!");
            // navi("/approval");
        })
        .catch(error => {
            console.error("문서 제출 실패:", error);
        });

        }
    }


     // 파일 첨부
     const handleFileChange  = (e)=>{

        const selectedFiles = Array.from(e.target.files);
        const currentFileNames = files.map(fileObj => fileObj.file.name);
        // const count = 0;
        console.log("파일 목록 보기", selectedFiles);
        const date = Date.now();

        // 중복 파일 체크 및 필터링
        const nonDuplicateFiles = selectedFiles.filter(file => !currentFileNames.includes(file.name));
        
        if (nonDuplicateFiles.length === 0) {
            alert("이미 선택된 파일입니다.");
            return;
        }

        const newFileInfo = selectedFiles.map(file => ({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`, // Size in KB
            id: file.name + date // Unique identifier
        }));

        const newFile = selectedFiles.map(file => ({
            file, // 원본 파일 객체
            id: file.name + date // 고유 식별자
        }));

        if (files.length + newFile.length > 5) {
            alert("파일은 최대 5개까지 첨부할 수 있습니다.");
            return;
        }

        setFiles(prev => [...prev, ...newFile]); // 파일 객체를 그대로 저장

        setFileInfo(prev => {
            const updatedFileInfo = [...prev, ...newFileInfo];
            console.log("업데이트된 파일 정보 배열:", updatedFileInfo);
            console.log("setfiles데이터", files);
            return updatedFileInfo;
        });
    }

    const handleFileDelete = (fileId) => {
        // Remove file from files array
        console.log(fileId);
        const updatedFiles = files.filter((file) => file.id !== fileId);
        setFiles(updatedFiles);

        // Remove file info from fileInfo array
        const updatedFileInfo = fileInfo.filter((file) => file.id !== fileId);
        setFileInfo(updatedFileInfo);
    };

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
        // console.log("참조라인 데이터 확인",referLine);
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

    useEffect(()=>{
        console.log("파일",files);
        console.log("파일 정보",fileInfo);
    },[files, fileInfo])

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {setlist}
            </div>
            <div className={styles.content_box}>
                <div className={styles.content_left}>
                    <div className={styles.btns}>
                        <div className={`${styles.approval_submit_btn} ${styles.btn}`} onClick={approvalSubmit}><i class="fa-solid fa-pen-to-square"></i>결재요청</div>
                        <div className={`${styles.approval_temp_btn} ${styles.btn}`} onClick={tempSubmit}><i class="fa-regular fa-folder-open"></i>임시저장</div>
                        {/* <div className={`${styles.approval_prev_btn} ${styles.btn}`}>미리보기</div> */}
                        <div className={`${styles.approval_change_btn} ${styles.btn}`} onClick={handleModal}><i class="fa-solid fa-users"></i>결재선변경</div>
                        {/* <div className={`${styles.approval_change_btn} ${styles.btn}`} onClick={handleModal}><i class="fa-solid fa-users"></i>임시저장</div> */}
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
                                <input type="file" multiple onChange={handleFileChange} /> <span>파일 첨부는 최대 5개 까지 가능합니다.</span>
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