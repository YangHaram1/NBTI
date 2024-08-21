import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../../../../../config/config";
import styles from './MyVacation.module.css';
 const MyVacation = () => {
    const [vacationInfo, setVacationInfo] = useState({ total: '', used: '', remaining: '' });
    const [vacationHistory, setVacationHistory] = useState([]);

    useEffect(() => {
        const memberId = sessionStorage.getItem('loginID');

        if (memberId) {
            console.log("Member ID from sessionStorage:", memberId);

            // 휴가 정보 가져오기
            axios.get(`${host}/members/apply`, { params: { memberId, days: 0 } })
                .then(response => {
                    console.log("Vacation info response:", response.data);
                    setVacationInfo(response.data);
                })
                .catch(error => {
                    console.error("Error fetching vacation info:", error);
                });

            // 휴가 신청 내역 가져오기
         // 휴가 신청 내역 가져오기
         axios.get(`${host}/approval/history`, { params: { memberId },withCredentials: true  })
         .then(response => {
             console.log("Vacation history response:", response.data);
             const historyData = response.data.map(history => ({
                 ...history,
                 vacationType: mapVacationType(history.vacationType),
                 days: calculateVacationDays(history.vacation_start, history.vacation_end),
             }));
             setVacationHistory(historyData);
         })
         .catch(error => {
             console.error("Error fetching vacation history:", error);
             
         });
        } else {
            console.error("No memberId found in sessionStorage.");
        }
    }, []);

    const mapVacationType = (type) => {
        switch (type) {
            case 1: return "연차";
            case 2: return "경조";
            case 3: return "공가";
            case 4: return "질병휴가";
            default: return "기타";
        }
    };

    const calculateVacationDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    };

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
                            <td>{history.days} 일</td>
                            <td>{history.vacation_start} - {history.vacation_end}</td>
                            <td>{history.status}</td>
                            <td><button>상세보기</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default MyVacation;