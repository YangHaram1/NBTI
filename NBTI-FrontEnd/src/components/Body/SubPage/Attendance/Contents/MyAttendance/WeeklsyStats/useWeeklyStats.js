import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';

const useWeeklyStats = (memberId) => {
    const [stats, setStats] = useState({ lateCount: 0, absentCount: 0, earlyLeaveCount: 0 });
    const [dailyStats, setDailyStats] = useState({});

    const fetchWeeklyStats = async () => {

        try {
            const response = await axios.get(`${host}/attendance/weekly-stats`, {
                params: { memberId },
                withCredentials: true
            });

            
            if (response.data) {
                setStats({
                    lateCount: response.data.lateCount || 0,
                    absentCount: response.data.absentCount || 0,
                    earlyLeaveCount: response.data.earlyLeaveCount || 0
                });
                
                setDailyStats(response.data.dailyStats || {});
            }
        } catch (err) {
           
        }
    };
    useEffect(() => {
        fetchWeeklyStats();
    }, [memberId]);

    return { stats, dailyStats, fetchWeeklyStats };
};

export default useWeeklyStats;
