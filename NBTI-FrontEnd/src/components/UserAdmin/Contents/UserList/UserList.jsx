// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css';
import { host } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from '../../../../store/store';

const UserList = ({ setUserDetail }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setUsers(response.data);
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
        navigate(`/useradmin/userupdate/${userId}`); // 사용자 업데이트 페이지로 이동
    };

    if (loading) return <div className={styles.loading}>로딩 중...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>사용자 목록</h2>
            {users.length > 0 ? (
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
                        {users.map(user => (
                            <tr key={user.ID}>
                                <td 
                                    onClick={() => handleUserClick(user.ID)} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user.NAME || '이름 없음'}
                                </td>
                                <td>{user.ID || '아이디 없음'}</td>
                                <td>{'*'.repeat(8)}</td>
                                <td>{user.EMAIL || '이메일 없음'}</td>
                                <td>{user.TEAM_NAME || '팀명 없음'}</td>
                                <td>{user.JOB_NAME || '직급명 없음'}</td>
                                <td>{getLevelName(user.MEMBER_LEVEL) || '권한 없음'}</td>
                                <td>{user.MEMBER_CALL || '전화번호 없음'}</td>
                                <td>{user.GENDER === 'M' ? '남성' : user.GENDER === 'F' ? '여성' : '성별 정보 없음'}</td>
                                <td>{user.ENT_YN === 'Y' ? '휴직' : '재직'}</td>
                                <td>{user.VACATION_PERIOD != null ? `${user.VACATION_PERIOD}일` : '휴가 정보 없음'}</td>
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
