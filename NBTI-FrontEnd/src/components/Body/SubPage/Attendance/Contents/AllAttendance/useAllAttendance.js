import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../../../../../../config/config';

const useAllAttendance = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchAttendanceData = async () => {
        console.log("주간 통계 데이터를 가져오는 중...");
        try {
            const response = await axios.get(`${host}/attendance/allweekly-stats`, {
                withCredentials: true
            });
            console.log("응답 상태:", response.status);
            console.log("응답 데이터:", response.data);

            // 응답 데이터의 구조를 확인합니다
            console.log("Members 데이터:", response.data.members);

            if (response.data && response.data.members) {
                // members 데이터를 직접 사용
                setStats(response.data.members);
            } else {
                console.warn("예상치 못한 응답 데이터:", response.data);
                setStats({});
            }
        } catch (err) {
            console.error('주간 통계를 가져오는 데 실패했습니다.', err.response ? err.response.data : err.message);
            setStats({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    return { stats, loading };
};

export default useAllAttendance;
