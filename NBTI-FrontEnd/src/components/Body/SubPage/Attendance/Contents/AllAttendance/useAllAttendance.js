import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../config/config';

const useAllWeeklyStats = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchWeeklyStats = async () => {
        console.log("Fetching all weekly stats...");
        try {
            const response = await axios.get(`${host}/attendance/allweekly-stats`, {
                withCredentials: true
            });
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            
            // 상태 업데이트
            if (response.data) {
                setStats(response.data.members || {});
            }
        } catch (err) {
            console.error('주간 통계를 가져오는데 실패했습니다.', err.response ? err.response.data : err);
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
