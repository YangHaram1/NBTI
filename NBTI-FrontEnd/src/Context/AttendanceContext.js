// src/Context/AttendanceContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../config/config'; // 경로 확인 필요
import { format } from 'date-fns';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [currentClockIn, setCurrentClockIn] = useState(null);
    const [currentClockOut, setCurrentClockOut] = useState(null);
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);
    const [attendanceSeq, setAttendanceSeq] = useState(null);

    const fetchAttendanceStatus = async () => {
        try {
            const response = await axios.get(`${host}/attendance/status`, { withCredentials: true });
            const { seq, start_date, end_date, clockedIn, clockedOut } = response.data;
            if (seq) {
                setAttendanceSeq(seq);
                setClockedIn(clockedIn);
                setClockedOut(clockedOut);
                setCurrentClockIn(start_date ? format(new Date(start_date), 'HH:mm:ss') : null);
                setCurrentClockOut(end_date ? format(new Date(end_date), 'HH:mm:ss') : null);
            }
        } catch (err) {
            console.error('출근 기록을 가져오는데 실패했습니다.', err.response ? err.response.data : err);
        }
    };

    useEffect(() => {
        fetchAttendanceStatus();
    }, []);

    return (
        <AttendanceContext.Provider value={{ currentClockIn, currentClockOut, clockedIn, clockedOut, attendanceSeq, fetchAttendanceStatus }}>
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    return useContext(AttendanceContext);
};
