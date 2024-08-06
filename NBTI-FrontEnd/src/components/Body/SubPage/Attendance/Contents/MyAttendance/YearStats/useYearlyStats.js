import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../../config/config';

const useYearlyStats = (memberId) => {
    const [stats, setStats] = useState({
        lateCount: 0,
        absentCount: 0,
        earlyLeaveCount: 0,
        totalWorkDays: 0,
        totalWorkHours: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchYearlyStats = async () => {
        if (!memberId) {
            setError('회원 ID가 제공되지 않았습니다.');
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${host}/attendance/yearly-stats`, {
                params: { memberId },
                withCredentials: true
            });
            
            // 콘솔 로그 추가
            console.log('API 응답 데이터:', response.data);

            const { 
                lateCount, 
                absentCount, 
                earlyLeaveCount, 
                workingDaysCount, 
                totalWorkedMinutes 
            } = response.data;

            // 변환하여 상태 업데이트
            setStats({
                lateCount,
                absentCount,
                earlyLeaveCount,
                totalWorkDays: workingDaysCount,
                totalWorkHours: (totalWorkedMinutes / 60).toFixed(2) // 분을 시간으로 변환
            });
            setError(null);
        } catch (err) {
            setError('연간 통계 정보를 가져오는데 실패했습니다.');
            console.error('연간 통계 정보를 가져오는데 실패했습니다.', err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchYearlyStats();
    }, [memberId]);

    return { stats, loading, error, fetchYearlyStats };
};

export default useYearlyStats;
