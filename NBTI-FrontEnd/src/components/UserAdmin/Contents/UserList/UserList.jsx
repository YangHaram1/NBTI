import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserList.module.css'; // 스타일 모듈 임포트
import { host } from '../../../../config/config';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 레벨 이름을 매핑할 수 있는 함수
    const getLevelName = (levelSeq) => {
        const level = levels.find(l => l.seq === levelSeq);
        if (!level) return '레벨 없음';
        if (level.total === 'Y') return '전체 권한';
        if (level.hr === 'Y') return '인사 권한';
        if (level.reservation === 'Y') return '예약 권한';
        if (level.message === 'Y') return '메시지 권한';
        if (level.task === 'Y') return '업무 권한';
        return '권한 없음';
    };

    useEffect(() => {
        // 사용자 데이터와 레벨 데이터 모두 가져오기
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(`http://${host}/members/selectAll`);
                setUsers(usersResponse.data);

                const levelsResponse = await axios.get(`http://${host}/members/selectLevel`);
                setLevels(levelsResponse.data);

                setLoading(false);
            } catch (err) {
                setError('사용자 데이터를 가져오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.container}>
            <h2>사용자 목록</h2>
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
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.id}</td>
                                <td>{'*'.repeat(8)}</td>
                                <td>{user.email}</td>
                                <td>{user.team_code}</td>
                                <td>{user.job_code}</td>
                                <td>{getLevelName(user.member_level)}</td>
                                <td>{user.member_call}</td>
                                <td>{user.gender === 'M' ? '남성' : '여성'}</td>
                                <td>{user.ent_yn === 'Y' ? '휴직' : '재직'}</td>
                                <td>{user.vacation_period}일</td>
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
