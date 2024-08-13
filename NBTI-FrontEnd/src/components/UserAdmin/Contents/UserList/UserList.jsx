import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';
import { host } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from '../../../../store/store';
import SearchUser from './SearchUser/SearchUser';
import Team from './Team/Team';

const UserList = ({ setUserDetail }) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, teamResponse] = await Promise.all([
                    axios.get(`${host}/members/selectMembers`),
                    axios.get(`${host}/members/selectTeam`)
                ]);
    
                const lowerCaseUsers = convertKeysToLowerCase(userResponse.data);
                const lowerCaseTeams = convertKeysToLowerCase(teamResponse.data);
    
                console.log('Teams Data:', lowerCaseTeams); // 팀 데이터 확인용 로그
    
                setUsers(lowerCaseUsers);
                setTeams(lowerCaseTeams);
                setFilteredUsers(lowerCaseUsers);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('데이터를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    const fetchFilteredUsers = async () => {
        try {
            let response;
            if (filterType === 'name' && searchTerm) {
                response = await axios.get(`${host}/members/searchUser`, {
                    params: { 
                        name: searchTerm
                    }
                });
            } else if (filterType === 'team' && selectedTeam) {
                console.log('Fetching users for team code:', selectedTeam); // 선택된 팀 코드 로그
                response = await axios.get(`${host}/members/selectByTeam`, {
                    params: { team_code: selectedTeam }
                });
            } else {
                response = { data: users };
            }
    
            console.log('Filtered Users API Response:', response.data); // API 응답 데이터 로그
            const lowerCaseData = convertKeysToLowerCase(response.data);
            setFilteredUsers(lowerCaseData);
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
    

    const handleUserClick = (userId) => {
        setSelectedMember(userId); // 상태에 사용자 ID 저장
        navigate(`/useradmin/userdetail/${userId}`); // 사용자 업데이트 페이지로 이동
    };

    const handleSearch = () => {
        if (filterType === 'name' && !searchTerm.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }
        fetchFilteredUsers(); // 검색 버튼 클릭 시 검색 수행
    };

    const handleTeamChange = (e) => {
        const selectedTeamCode = e.target.value;
        console.log('Selected Team Code:', selectedTeamCode); // 선택된 팀 코드 확인
        setSelectedTeam(selectedTeamCode);
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilterType(selectedFilter); // 선택한 필터 타입으로 상태 업데이트
        setSearchTerm(''); // 검색어 초기화
        setSelectedTeam(''); // 팀 선택 초기화
        setFilteredUsers(users); // 전체 사용자 목록으로 초기화
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
                            <th>비밀번호</th>
                            <th>이메일</th>
                            <th>팀명</th>
                            <th>직급명</th>
                            <th>권한</th>
                            <th>전화번호</th>
                            <th>성별</th>
                            <th>재직 상태</th>
                            <th>남은 휴가</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td 
                                    onClick={() => handleUserClick(user.id)} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user.name || '이름 없음'}
                                </td>
                                <td>{user.id || '아이디 없음'}</td>
                                <td>{'*'.repeat(8)}</td>
                                <td>{user.email || '이메일 없음'}</td>
                                <td>{user.team_name || '팀명 없음'}</td>
                                <td>{user.job_name || '직급명 없음'}</td>
                                <td>{getLevelName(user.member_level) || '권한 없음'}</td>
                                <td>{user.member_call || '전화번호 없음'}</td>
                                <td>{user.gender === 'M' ? '남성' : user.gender === 'F' ? '여성' : ''}</td>
                                <td>{user.ent_yn === 'Y' ? '휴직' : '재직'}</td>
                                <td>{user.vacation_period != null ? `${user.vacation_period}일` : '휴가 정보 없음'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>사용자가 없습니다.</p>
            )}
        </div>
    );
};

export default UserList;
