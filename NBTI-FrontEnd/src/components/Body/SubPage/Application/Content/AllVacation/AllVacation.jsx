import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../../../../../config/config";
import { useNavigate } from 'react-router-dom'; // 추가
import styles from './AllVacation.module.css';
import ReactPaginate from 'react-paginate';

const convertKeysToLowerCase = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    );
};

const convertArrayKeysToLowerCase = (arr) => {
    return arr.map(convertKeysToLowerCase);
};


export const AllVacation = () => {

const [vacationHistory, setVacationHistory] = useState([]);
const [error, setError] = useState(null);
const navigate = useNavigate(); // 추가

const [cpage, setCpage] = useState(1);
const [page_total_count, setPage_total_count] = useState(1);
const [search, setSearch] = useState(false);

const record_count_per_page = 10;
const navi_count_per_page = 5;

useEffect(() => {

    const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
    const end = cpage * record_count_per_page; //10
  

            axios.get(`${host}/approval/allhistory?start=${start}&end=${end}`)
            .then(response => {
                const { history, totalRecordCount } = response.data;
                const historyData = convertArrayKeysToLowerCase(history);
                setVacationHistory(historyData);
                console.log(historyData);

                // 총 레코드 수에 기반하여 페이지 총 개수 계산
                const pageCount = Math.ceil(totalRecordCount / record_count_per_page);
                setPage_total_count(pageCount);
            })
            .catch(error => {
                setError("휴가 신청 내역을 가져오는 데 문제가 발생했습니다.");
            });
    
}, [cpage]);

const handleDetailClick = (seq) => {
    navigate("/approval/detail", { state: { seq, setlist: "휴가신청서", list: "기안문서함" } });
};

const handlePage = (selectedPage) => {
    setCpage(selectedPage.selected + 1);
}

    return (
        <div className={styles.container}>

<h3 className={styles.title}>휴가 신청 내역</h3>
            {vacationHistory.length > 0 ? (
                <table className={styles.vacationHistoryTable}>
                    <thead>
                        <tr>
                            <th>휴가 종류</th>
                            <th>신청자</th>
                            <th>부서</th>
                            <th>직급</th>
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
                                <td>{history.applicant_name}</td>
                                <td>{history.team_name}</td>
                                <td>{history.job_name}</td>
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
               <ReactPaginate
                pageCount={page_total_count} // 페이지 총 개수
                pageRangeDisplayed={navi_count_per_page} // 현재 페이지를 기준으로 표시할 페이지 범위 수
                marginPagesDisplayed={1} // 양쪽 끝에 표시할 페이지 수
                onPageChange={handlePage} // 페이지 변경 핸들러
                containerClassName={styles.pagination} // 스타일 클래스
                activeClassName={styles.active} // 활성 페이지 클래스
                initialPage={0} //초기 page 값
                previousLabel={'<'} // 이전 페이지 버튼 레이블
                previousClassName={styles.previous} // 이전 버튼의 클래스명
                nextLabel={'>'} // 다음 페이지 버튼 레이블
                nextClassName={styles.next} // 다음 버튼의 클래스명
                breakLabel={'...'} // 생략 표시 제거
                breakClassName={null} // 생략 표시의 클래스명 제거
            />
        </div>

    )
}