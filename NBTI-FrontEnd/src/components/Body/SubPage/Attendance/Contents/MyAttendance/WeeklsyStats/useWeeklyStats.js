import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';

const useWeeklyStats = (memberId) => {
    const [stats, setStats] = useState({ lateCount: 0, absentCount: 0, earlyLeaveCount: 0 });
    const [dailyStats, setDailyStats] = useState({});

    const fetchWeeklyStats = async () => {
        console.log("Fetching weekly stats...");
        try {
            const response = await axios.get(`${host}/attendance/weekly-stats`, {
                params: { memberId },
                withCredentials: true
            });
            console.log("Response status:", response.status); // 응답 상태 코드 확인
            console.log("Response data:", response.data); // 전체 응답 데이터 확인
            
            // 상태 업데이트
            if (response.data) {
                setStats({
                    lateCount: response.data.lateCount || 0,
                    absentCount: response.data.absentCount || 0,
                    earlyLeaveCount: response.data.earlyLeaveCount || 0
                });
                setDailyStats(response.data.dailyStats || {});
            }
        } catch (err) {
            console.error('주간 통계를 가져오는데 실패했습니다.', err.response ? err.response.data : err);
        }
    };

    useEffect(() => {
        fetchWeeklyStats();
    }, [memberId]);

    return { stats, dailyStats, fetchWeeklyStats };
};

export default useWeeklyStats;
