// import { useEffect, useState } from 'react';
import { useState } from 'react';
import { useApprovalLine } from '../../../../../../../store/store';
import styles from './Header.module.css';

export const Header = ({userdata}) => {

    const { approvalLine } = useApprovalLine();
    const TimeData = new Date();
    const year = TimeData.getFullYear();
    const month = (`0${TimeData.getMonth() + 1}`).slice(-2);
    const day = (`0${TimeData.getDate()}`).slice(-2);
    const Today = `${year}-${month}-${day}`;


    return (
        <>
            <div className={styles.left}>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>기안자</div>
                    <div className={styles.writer_content}>{userdata.NAME} {userdata.JOB_NAME}</div>
                </div>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>소속</div>
                    <div className={styles.writer_content}>{userdata.DEPT_NAME} {userdata.TEAM_NAME}</div>
                </div>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>기안일</div>
                    <div className={styles.writer_content}>{Today}</div>
                </div>
                <div className={styles.writer_data}>
                    <div className={styles.writer_title}>문서번호</div>
                    <div className={styles.writer_content}></div>
                </div>
            </div>
            <div className={styles.mid}></div>
            <div className={styles.right}>
                {
                    approvalLine.map((approvaler) => {

                        return (
                            <div className={styles.approval_box}>
                                <div className={styles.approval_box_side}>
                                    {
                                        approvaler.order === '1' ? "최초" : approvaler.order === '2' ? "중간" : "최종"
                                    }
                                </div>
                                <div className={styles.approval_box_main}>
                                    <div className={styles.approval_job}>파트장</div>
                                    <div className={styles.approval_member}>{approvaler.name}</div>
                                    <div className={styles.approval_date}></div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

