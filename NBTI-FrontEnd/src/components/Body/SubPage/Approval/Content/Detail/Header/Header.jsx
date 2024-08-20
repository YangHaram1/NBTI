// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';

import styles from './Header.module.css';
import axios from 'axios';
import { host } from '../../../../../../../config/config';
import { format } from 'date-fns';
import image_approval from '../../../../../../../images/approval.png';

import image_return from '../../../../../../../images/return.png';

export const Header = ({docCommonData, userdata, approvalData, seq}) => {

    const TimeData = new Date();
    const year = TimeData.getFullYear();
    const month = (`0${TimeData.getMonth() + 1}`).slice(-2);
    const day = (`0${TimeData.getDate()}`).slice(-2);
    const Today = `${year}-${month}-${day}`;
    const [writer, setWriter] = useState({}); 

    // console.log("header 결재라인 넘어오는지",approvalData);
    // console.log("공통정보", docCommonData);

    useEffect(()=>{
        let id = docCommonData.member_id;
        console.log("결제정보" ,approvalData);
        axios.get(`${host}/members/approvaler/${id}`)
        .then((resp)=>{
            // console.log("기안자",resp.data);
            setWriter(resp.data);
        })
    },[])


    // const extractDate = (dateTimeString) => {
    //     // 문자열에서 날짜 부분만 추출 (첫 10자)
    //     return dateTimeString.substring(0, 10);
    // };
    
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };
    
    return (
        <>
            <div className={styles.left}>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>기안자</div>
                    <div className={styles.writer_content}>{writer.NAME} {writer.JOB_NAME}</div>
                </div>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>소속</div>
                    <div className={styles.writer_content}>{writer.DEPT_NAME} {writer.TEAM_NAME}</div>
                </div>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>기안일</div>
                    <div className={styles.writer_content}>
                    {
                            format(new Date(docCommonData.approval_date),'yyyy-MM-dd')
                    }
                    </div>
                </div>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>문서번호</div>
                    <div className={styles.writer_content}>{docCommonData.approval_seq}</div>
                </div>
            </div>
            <div className={styles.mid}></div>
            <div className={styles.right}>
                {
                    approvalData.map((approvaler) => {

                        return (
                            <div className={styles.approval_box}>
                                <div className={styles.approval_box_side}>
                                    {
                                        approvaler.APPROVAL_ORDER === 1 ? "최초" : approvaler.APPROVAL_ORDER === 2 ? "중간" : "최종"
                                    }
                                </div>
                                <div className={styles.approval_box_main}>
                                    <div className={styles.approval_job}>{approvaler.JOB_NAME}</div>
                                    <div className={styles.approval_member}>
                                        <div className={styles.stamp}>
                                            {
                                                approvaler.MEMBER_STATE_CODE == 'p' ? <img src={image_approval} alt="approval" /> :  
                                                approvaler.MEMBER_STATE_CODE == 'r' ? <img src={image_return} alt="return" /> :
                                                approvaler.MEMBER_STATE_CODE == 'b' ? '' :
                                                ''
                                            }
                                        </div>
                                        <div className={styles.memberName}>{approvaler.NAME}</div>
                                    </div>
                                    <div className={styles.approval_date}>
                                        { 
                                            approvaler.APPROVAL_DATE ?  formatDate(approvaler.APPROVAL_DATE) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

