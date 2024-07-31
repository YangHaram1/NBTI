import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';
import { host } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from '../../../../store/store';
import SearchUser from './SearchUser/SearchUser';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
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
                const response = await axios.get(`${host}/members/selectMembers`);
                console.log('Fetched users:', response.data); // 데이터 구조 확인
                
                // 키를 소문자로 변환
                const lowerCaseData = convertKeysToLowerCase(response.data);

                setUsers(lowerCaseData);
                setFilteredUsers(lowerCaseData);
                setLoading(false);
            } catch (err) {
                setError('사용자 데이터를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleUserClick = (userId) => {
        setSelectedMember(userId); // 상태에 사용자 ID 저장
        navigate(`/useradmin/userdetail/${userId}`); // 사용자 업데이트 페이지로 이동
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.get(`${host}/members/searchUser`, {
                params: { name: searchTerm }
            });
            const lowerCaseData = convertKeysToLowerCase(response.data);
            setFilteredUsers(lowerCaseData);
            console.log('Search response:', response.data);
        } catch (err) {
            alert('검색 결과를 가져오는 데 실패했습니다.');
        }
    };

    if (loading) return <div className={styles.loading}>로딩 중...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>사용자 목록</h2>
            <SearchUser searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
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
                                <td>{user.gender === 'M' ? '남성' : user.gender === 'F' ? '여성' : '성별 정보 없음'}</td>
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
