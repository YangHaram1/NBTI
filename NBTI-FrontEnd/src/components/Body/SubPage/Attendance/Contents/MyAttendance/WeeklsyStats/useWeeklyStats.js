import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';

const useWeeklyStats = (memberId) => {
    const [stats, setStats] = useState({ lateCount: 0, absentCount: 0, earlyLeaveCount: 0 });

    useEffect(() => {
        const fetchWeeklyStats = async () => {
            if (!memberId) return;
            try {
                const response = await axios.get(`${host}/attendance/weekly-stats`, {
                    params: { memberId },
                    withCredentials: true
                });
                setStats(response.data);
            } catch (err) {
                console.error('주간 통계 정보를 가져오는데 실패했습니다.', err.response ? err.response.data : err);
            }
        };

        fetchWeeklyStats();
    }, [memberId]);

    return stats;
};

export default useWeeklyStats;
