import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../../../../../config/config";
import styles from './MyVacation.module.css'

export const MyVacation = () => {
    const [vacationInfo, setVacationInfo] = useState({ total: '', used: '', remaining: '' });
    const [vacationHistory, setVacationHistory] = useState([]);

    useEffect(() => {
        const memberId = sessionStorage.getItem('loginID'); // 세션 스토리지에서 loginID 가져오기
    
        if (memberId) {
            axios.get(`${host}/members/apply`, { params: { memberId, days: 0 } }) // 초기 로딩 시 남은 휴가일수만 로드
                .then(response => {
                    setVacationInfo(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the vacation info!", error);
                });

            axios.get(`${host}/members/vacationHistory`, { params: { memberId } }) // 휴가 신청 내역 가져오기
                .then(response => {
                    setVacationHistory(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the vacation history!", error);
                });
        } else {
            console.error("No memberId found in sessionStorage.");
        }
    }, []);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>휴가내역</h3>
            <table className={styles.vacationTable}>
                <thead>
                    <tr>
                        <th>총 휴가 일수</th>
                        <th>사용 휴가 일수</th>
                        <th>잔여 휴가 일수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{vacationInfo.total} 일</td>
                        <td>{vacationInfo.used} 일</td>
                        <td>{vacationInfo.remaining} 일</td>
                    </tr>
                </tbody>
            </table>

            <h3 className={styles.title}>휴가 신청 내역</h3>
            <table className={styles.vacationHistoryTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>신청자</th>
                        <th>휴가 종류</th>
                        <th>일수</th>
                        <th>기간</th>
                        <th>상태</th>
                        <th>상세</th>
                    </tr>
                </thead>
                <tbody>
                    {vacationHistory.map((history, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{history.applicant}</td>
                            <td>{history.vacationType}</td>
                            <td>{history.days}</td>
                            <td>{history.period}</td>
                            <td>{history.status}</td>
                            <td><button>상세보기</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
