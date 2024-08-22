import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';
import { host } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from '../../../../store/store';
import SearchUser from './SearchUser/SearchUser';
import Team from './Team/Team';
import ReactPaginate from 'react-paginate';

const UserList = () => {
    const convertKeysToLowerCase = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(convertKeysToLowerCase);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj).reduce((acc, key) => {
                const lowerCaseKey = key.toLowerCase();
                acc[lowerCaseKey] = convertKeysToLowerCase(obj[key]);
                return acc;
            }, {});
        }
        return obj;
    };

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [filterType, setFilterType] = useState('name'); // 'name' or 'team'

    const setSelectedMember = useMemberStore((state) => state.setSelectedMember);
    const navigate = useNavigate();

    const levelMap = {
        1: '권한 없음',
        2: '전체 권한',
        3: '인사 권한',
        4: '예약 권한',
        5: '메시지 권한',
        6: '업무 권한',
        7: '결제 권한'
    };

    const getLevelName = (levelSeq) => {
        return levelMap[levelSeq] || '권한 없음';
    };
    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState(1);
    const [search, setSearch] = useState(false);

    const record_count_per_page = 10;
    const navi_count_per_page = 5;

  


    useEffect(() => {
        const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
        const end = cpage * record_count_per_page; //10
     
        const fetchData = async () => {
            try {
                const [userResponse, teamResponse,listResponese] = await Promise.all([
                    axios.get(`${host}/members/selectMembers`),
                    axios.get(`${host}/members/selectTeam`),
                    axios.get(`${host}/members/list?start=${start}&end=${end}`)
                ]);

                const lowerCaseUsers = convertKeysToLowerCase(userResponse.data);
                const lowerCaseTeams = convertKeysToLowerCase(teamResponse.data);

                setUsers(lowerCaseUsers);
                setTeams(lowerCaseTeams);
                setFilteredUsers(convertKeysToLowerCase(listResponese.data)); // 
                setLoading(false);

                const record_total_count = lowerCaseUsers.length; 

                if (record_total_count % record_count_per_page === 0) {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                }
                else {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                }

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('데이터를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };
        if (filterType === 'name' && searchTerm) {
            fetchFilteredUsers(); // 검색 버튼 클릭 시 검색 수행
        }
        else if (filterType === 'team' && selectedTeam) {
            fetchFilteredUsers(); // 검색 버튼 클릭 시 검색 수행
        } 
        else{
            fetchData();
        }
      
        
    }, [cpage,search]);


    const fetchFilteredUsers =async () => {
        const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
        const end = cpage * record_count_per_page; //10
     
        try {
            let response;
            if (filterType === 'name' && searchTerm) {
                response = await axios.get(`${host}/members/searchUser`, {
                    params: {
                        name: searchTerm, 
                        start:start,
                        end:end
                    }
                });
               
            } else if (filterType === 'team' && selectedTeam) {
                console.log('Fetching users for team code:', selectedTeam); // 선택된 팀 코드 로그
                response = await axios.get(`${host}/members/selectByTeam`, {
                    params: {
                         team_code: selectedTeam ,
                         start:start,
                         end:end
                    }
                });
               
            } else {
                response = { data: users };
            }
            if (filterType === 'name' && searchTerm) {
                axios.get(`${host}/members/searchUserCount?name=${searchTerm}`).then((resp)=>{
                    console.log(resp.data)
                    const  record_total_count=resp.data;
                    if (record_total_count % record_count_per_page === 0) {
                        setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                    }
                    else {
                        setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                    }
                })
            }
            else if (filterType === 'team' && selectedTeam) {
                axios.get(`${host}/members/selectByTeamCount?team_code=${selectedTeam}`).then((resp)=>{
                    const  record_total_count=resp.data;
                    if (record_total_count % record_count_per_page === 0) {
                        setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                    }
                    else {
                        setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                    }
        
                })
            } 

            console.log('Filtered Users API Response:', response.data); // API 응답 데이터 로그
            const lowerCaseData = convertKeysToLowerCase(response.data);
            setFilteredUsers(lowerCaseData);

            //// 
        } catch (err) {
            console.error('사용자 데이터를 가져오는 데 실패했습니다.', err);
        }
    };

    // 상태가 업데이트된 후에 필터링된 데이터를 가져오기 위해 useEffect 사용
    useEffect(() => {
        if (filterType === 'team' && selectedTeam) {
            fetchFilteredUsers();
        }
    }, [selectedTeam]); // selectedTeam이 변경될 때마다 호출


    const handleEditClick = (userId) => {
        setSelectedMember(userId); // 상태에 사용자 ID 저장
        navigate(`/useradmin/userdetail/${userId}`); // 사용자 업데이트 페이지로 이동
    };


    const handleTeamChange = (e) => {
        const selectedTeamCode = e.target.value;
        console.log('Selected Team Code:', selectedTeamCode); // 선택된 팀 코드 확인
        setSelectedTeam(selectedTeamCode);
        setCpage(1);
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilterType(selectedFilter); // 선택한 필터 타입으로 상태 업데이트
        setSearchTerm(''); // 검색어 초기화
        setSelectedTeam(''); // 팀 선택 초기화
      //  setFilteredUsers(users); // 전체 사용자 목록으로 초기화
    };

    ////

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    }

    const handleSearch = () => {
        if (filterType === 'name' && !searchTerm.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }
        setSearch((prev) => {
            setCpage(1);
            return !prev;
        })
       
    };



    if (loading) return <div className={styles.loading}>로딩 중...</div>;
    if (error) return <div className={styles.error}>{error}</div>;


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>사용자 목록</h2>
            <div className={styles.searchAndFilter}>
                <select onChange={handleFilterChange} className={styles.filterSelect}>
                    <option value="name">이름</option>
                    <option value="team">팀</option>
                </select>
                {filterType === 'name' && (
                    <SearchUser
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={handleSearch}
                    />
                )}
                {filterType === 'team' && (
                    <Team
                        teams={teams}
                        selectedTeam={selectedTeam}
                        onTeamChange={handleTeamChange}
                    />
                )}

            </div>

            {filteredUsers.length > 0 ? (
                <table className={styles.userTable}>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>아이디</th>
                            <th>이메일</th>
                            <th>팀명</th>
                            <th>직급명</th>
                            <th>권한</th>
                            <th>전화번호</th>
                            <th>성별</th>
                            <th>재직 상태</th>
                            <th>남은 휴가</th>
                            <th>수정</th> {/* 수정 버튼 추가 */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name || '이름 없음'}</td>
                                <td>{user.id || '아이디 없음'}</td>
                                <td>{user.email || '이메일 없음'}</td>
                                <td>{user.team_name || '팀명 없음'}</td>
                                <td>{user.job_name || '직급명 없음'}</td>
                                <td>{getLevelName(user.member_level) || '권한 없음'}</td>
                                <td>{user.member_call || '전화번호 없음'}</td>
                                <td>{user.gender === 'M' ? '남성' : user.gender === 'F' ? '여성' : ''}</td>
                                <td>{user.ent_yn === 'Y' ? '휴직' : '재직'}</td>
                                <td>{user.vacation_period != null ? `${user.vacation_period}일` : '휴가 정보 없음'}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditClick(user.id)}
                                        className={styles.editButton} // 스타일 클래스 추가
                                    >
                                        수정하기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>사용자가 없습니다.</p>
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
    );
};

export default UserList;
