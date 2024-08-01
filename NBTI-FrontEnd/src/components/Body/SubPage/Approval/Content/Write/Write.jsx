import { useEffect, useState } from 'react';
import { DocDraft } from './DocDraft/DocDraft';
import { DocLeave } from './DocLeave/DocLeave';
import { DocVacation } from './DocVacation/DocVacation';
import styles from './Write.module.css';
import { host } from '../../../../../../config/config';
import axios from 'axios';
import { useReferLine } from '../../../../../../store/store';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export const Write = ({setlist})=>{

    const [userdata, setUserData] = useState({}); 
    const [docdata, setDocData] = useState({effective_date:'', cooperation_dept:'', title:'', content:''});
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [dept, setDept] = useState('');
    const [title, setTitle] = useState('');
    const { referLine } = useReferLine();

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
        console.log("개별", date, dept, title, content);
        setDocData({effective_date:'', cooperation_dept:'', title:'', content:''});
        console.log("토탈",docdata);
    }

    useEffect(()=>{
        axios.get(`${host}/members/docData`)
        .then((resp)=>{
            console.log("정보 받아오기",resp);
            console.log("테스트",resp.data.NAME);
            setUserData(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

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
                        : setlist === '휴직신청서' ? <DocLeave userdata={userdata}/>
                        : <DocDraft userdata={userdata} setDocData={setDocData} setContent={setContent} content={content} setDate={setDate} setDept={setDept} setTitle={setTitle}/>
                        }   
                    </div>
                    <div className={styles.files}>
                        첨부파일 넣기
                    </div>
                </div>
                <div className={styles.content_right}>
                    {
                        referLine.map((refer)=>{
                            return(
                                <div className={styles.refer}> {refer.name}</div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}