import { useEffect, useState } from 'react';
import { useApprovalLine, useAuthStore, useReferLine } from '../../../../../../../store/store';
import styles from './Header.module.css';
import axios from 'axios';
import { host } from '../../../../../../../config/config';

export const Header = ({userdata}) => {

    const { approvalLine } = useApprovalLine();
    const { referLine } = useReferLine();
    const TimeData = new Date();
    const Today = `${TimeData.getFullYear()}-${TimeData.getMonth() + 1}-${TimeData.getDate()}`;


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
            </div>
            <div className={styles.mid}></div>
            <div className={styles.right}>
                {
                    approvalLine.slice(1).map((approvaler) => {

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

