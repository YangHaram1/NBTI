import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css'; // 스타일 모듈 임포트
import { host } from '../../../../config/config';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 권한 이름을 반환하는 함수
    const levelMap = {
        1: '권한 없음',
        2: '전체 권한',
        3: '인사 권한',
        4: '예약 권한',
        5:  '메시지 권한',
        6:   '업무 권한',
        7 : ' 결제 권한 '

    };
    const getLevelName = (levelSeq) => {
        return levelMap[levelSeq] || '권한 없음';
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host}/members/selectMembers`);
                console.log('Fetched Users:', response.data); // 데이터 확인
                setUsers(response.data); // 상태에 데이터 저장
                setLoading(false);
            } catch (err) {
                console.error('Fetch Error:', err); // 에러 확인
                setError('사용자 데이터를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                                <td>{user.NAME || '이름 없음'}</td>
                                <td>{user.ID || '아이디 없음'}</td>
                                <td>{'*'.repeat(8)}</td>
                                <td>{user.EMAIL || '이메일 없음'}</td>
                                <td>{user.TEAM_NAME || '팀명 없음'}</td>
                                <td>{user.JOB_NAME || '직급명 없음'}</td>
                                <td>{getLevelName(user.MEMBER_LEVEL) || '권한 없음'}</td> {/* 권한 출력 */}
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
