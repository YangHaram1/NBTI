import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../../../../../../config/config";
import { useNavigate } from 'react-router-dom';
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
    const [teamList, setTeamList] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(""); // 팀 코드 상태
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [cpage, setCpage] = useState(1);
    const [pageTotalCount, setPageTotalCount] = useState(1);

    const recordCountPerPage = 10;
    const naviCountPerPage = 5;

    // 팀 목록을 가져오는 useEffect
    useEffect(() => {
        axios.get(`${host}/members/selectTeam`)
            .then(response => {
                setTeamList(response.data); // 팀 목록에 팀 코드와 팀 이름 포함
            })
            .catch(error => {
                setError("팀 목록을 가져오는 데 문제가 발생했습니다.");
            });
    }, [cpage]);

    // 휴가 내역을 가져오는 useEffect
    useEffect(() => {
        const start = (cpage - 1) * recordCountPerPage + 1;
        const end = cpage * recordCountPerPage;

        axios.get(`${host}/approval/allhistory`, {
            params: {
                start,
                end,
                team: selectedTeam, // 팀 코드 전달
            }
        })
        .then(response => {
            const { history, totalRecordCount } = response.data;
            const historyData = convertArrayKeysToLowerCase(history);
            setVacationHistory(historyData);
            console.log(start,end);
            console.log(historyData);
            console.log(totalRecordCount);
            const pageCount = Math.ceil(totalRecordCount / recordCountPerPage);
            setPageTotalCount(pageCount);
        })
        .catch(error => {
            setError("휴가 신청 내역을 가져오는 데 문제가 발생했습니다.");
        });
    }, [cpage, selectedTeam]);

    // 상세보기 클릭 핸들러
    const handleDetailClick = (seq) => {
        navigate("/approval/detail", { state: { seq, setlist: "휴가신청서", list: "기안문서함" } });
    };

    // 페이지 변경 핸들러
    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    };

    // 팀 필터 변경 핸들러
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value); // 팀 코드 저장
        setCpage(1); // 필터 변경 시 페이지를 1로 리셋
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>휴가 신청 내역</h3>
            <div className={styles.searchAndFilter}>
                
                <select 
                    id="team-filter" 
                    value={selectedTeam} 
                    onChange={handleTeamChange} 
                    className={styles.filterSelect}
                >
                    <option value="">전체</option>
                    {teamList.map(team => (
                        <option key={team.team_code} value={team.team_code}>{team.team_name}</option>
                    ))}
                </select>
            </div>
            {error && <p className={styles.error}>{error}</p>}
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
                        {vacationHistory.map((history) => (
                            <tr key={history.seq}>
                                <td>{history.category_name}</td>
                                <td>{history.applicant_name}</td>
                                <td>{history.team_name}</td>
                                <td>{history.job_name}</td>
                                <td>{parseFloat(history.days).toFixed(1)} 일</td>
                                <td>{history.vacation_start} - {history.vacation_end}</td>
                                <td>{history.half_day}</td>
                                <td>{history.status}</td>
                                <td>
                                    <button 
                                        className={styles.detailButton} 
                                        onClick={() => handleDetailClick(history.seq)}
                                    >
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>휴가 신청 내역이 없습니다.</p>
            )}
            <ReactPaginate
                pageCount={pageTotalCount}
                pageRangeDisplayed={naviCountPerPage}
                marginPagesDisplayed={1}
                onPageChange={handlePage}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                initialPage={cpage - 1} // 현재 페이지를 올바르게 설정
                previousLabel={'<'}
                previousClassName={styles.previous}
                nextLabel={'>'}
                nextClassName={styles.next}
                breakLabel={'...'}
                breakClassName={null}
            />
        </div>
    );
};
