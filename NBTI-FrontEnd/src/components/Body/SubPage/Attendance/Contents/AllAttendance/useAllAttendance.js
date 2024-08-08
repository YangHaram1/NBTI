import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../config/config';

const useAllWeeklyStats = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchWeeklyStats = async () => {
        console.log("주간 통계 데이터를 가져오는 중...");
        try {
            const response = await axios.get(`${host}/attendance/allweekly-stats`, {
                withCredentials: true
            });
            console.log("응답 상태:", response.status);
            console.log("응답 데이터:", response.data);

            // 상태 업데이트
            if (response.data && response.data.members) {
                // 각 멤버에 대해 name과 team_name을 추가하여 상태 설정
                const updatedStats = Object.keys(response.data.members).reduce((acc, memberId) => {
                    const member = response.data.members[memberId];
                    acc[memberId] = {
                        name: member.name || '이름 없음',
                        team_name: member.team_name || '팀 이름 없음',
                        records: member.records || {}
                    };
                    return acc;
                }, {});
                setStats(updatedStats);
            } else {
                console.warn("예상치 못한 응답 데이터:", response.data);
                setStats({});
            }
        } catch (err) {
            console.error('주간 통계를 가져오는 데 실패했습니다.', err.response ? err.response.data : err);
            setStats({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeeklyStats();
    }, []);

    return { stats, loading };
};

export default useAllWeeklyStats;
