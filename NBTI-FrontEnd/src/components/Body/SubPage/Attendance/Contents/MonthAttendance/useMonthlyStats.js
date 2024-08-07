import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../config/config';

const useMonthlyStats = (memberId, year, month) => {
    const [stats, setStats] = useState({ lateCount: 0, absentCount: 0, earlyLeaveCount: 0 });
    const [dailyStats, setDailyStats] = useState({});

    const fetchMonthlyStats = async () => {
        if (!memberId) {
            console.error('memberId가 없습니다.');
            return;
        }

        console.log("Fetching monthly stats...");
        try {
            const response = await axios.get(`${host}/attendance/monthly-stats`, {
                params: { memberId, year, month },
                withCredentials: true
            });
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);

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
        if (memberId) {
            fetchMonthlyStats();
        }
    }, [memberId, year, month]);

    return { stats, dailyStats, fetchMonthlyStats };
};

export default useMonthlyStats;
