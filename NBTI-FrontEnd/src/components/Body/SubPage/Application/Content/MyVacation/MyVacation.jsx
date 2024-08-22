import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../../../../../config/config";
import { useNavigate } from 'react-router-dom'; // 추가
import styles from './MyVacation.module.css';

const convertKeysToLowerCase = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    );
};

const convertArrayKeysToLowerCase = (arr) => {
    return arr.map(convertKeysToLowerCase);
};

const MyVacation = () => {
    const [vacationInfo, setVacationInfo] = useState({ total: '', used: '', remaining: '' });
    const [vacationHistory, setVacationHistory] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 추가

    useEffect(() => {
        const memberId = sessionStorage.getItem('loginID');

        if (memberId) {
            axios.get(`${host}/members/apply`, { params: { memberId } })
                .then(response => {
                    const totalDays = 15; // 기본 총 휴가 일수
                    const remainingDays = response.data.remaining;
                    const usedDays = totalDays - remainingDays;
                    console.log(remainingDays);
                    setVacationInfo({
                        total: totalDays.toFixed(1),
                        used: usedDays.toFixed(1),
                        remaining: remainingDays.toFixed(1),
                    });
                })
                .catch(error => {
                    setError("휴가 정보를 가져오는 데 문제가 발생했습니다.");
                });

            axios.get(`${host}/approval/history`, { params: { memberId }, withCredentials: true })
                .then(response => {
                    const historyData = convertArrayKeysToLowerCase(response.data);
                    setVacationHistory(historyData);
                })
                .catch(error => {
                    setError("휴가 신청 내역을 가져오는 데 문제가 발생했습니다.");
                });
        } else {
            setError("회원 ID를 세션에서 찾을 수 없습니다.");
        }
    }, []);

    const handleDetailClick = (seq) => {
        navigate("/approval/detail", { state: { seq, setlist: "휴가신청서", list: "기안문서함" } });
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}

            <h3 className={styles.title}>휴가 내역</h3>
            {vacationInfo.total ? (
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
            ) : (
                <p>휴가 정보를 불러오는 중입니다...</p>
            )}

            <h3 className={styles.title}>휴가 신청 내역</h3>
            {vacationHistory.length > 0 ? (
                <table className={styles.vacationHistoryTable}>
                    <thead>
                        <tr>
                            <th>휴가 종류</th>
                            <th>일수</th>
                            <th>기간</th>
                            <th>반차 여부</th>
                            <th>상태</th>
                            <th>상세</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacationHistory.map((history, index) => (
                            <tr key={index}>
                                <td>{history.category_name}</td>
                                <td>{parseFloat(history.days).toFixed(1)} 일</td> {/* 소수점 1자리까지 표시 */}
                                <td>{history.vacation_start} - {history.vacation_end}</td>
                                <td>{history.half_day}</td> {/* 반차 여부 표시 */}
                                <td>{history.status}</td>
                                <td>
                                <button 
                className={styles.detailButton} 
                onClick={() => handleDetailClick(history.seq)}
            >상세보기</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>휴가 신청 내역이 없습니다.</p>
            )}
        </div>
    );
};

export default MyVacation;
