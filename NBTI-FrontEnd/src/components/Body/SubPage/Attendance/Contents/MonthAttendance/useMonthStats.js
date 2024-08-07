import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';

const useMonthlyStats = (memberId) => {
    const [stats, setStats] = useState({ lateCount: 0, absentCount: 0, earlyLeaveCount: 0 });
    const [dailyStats, setDailyStats] = useState({});

    const fetchMonthlyStats = async () => {
        console.log("Fetching monthly stats...");
        try {
            const response = await axios.get(`${host}/attendance/monthly-stats`, {
                params: { memberId },
                withCredentials: true
            });
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            
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
            console.error('월간 통계를 가져오는데 실패했습니다.', err.response ? err.response.data : err);
        }
    };

    useEffect(() => {
        fetchMonthlyStats();
    }, [memberId]);

    return { stats, dailyStats, fetchMonthlyStats };
};

export default useMonthlyStats;
