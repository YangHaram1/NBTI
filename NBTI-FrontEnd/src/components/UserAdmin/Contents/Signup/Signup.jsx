import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';
import { host } from '../../../../config/config';
import { useMemberStore } from '../../../../store/store';

const Signup = () => {
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        name: '',
        email: '',
        teamCode: '',
        jobCode: '',
        memberLevel: '',
        memberCall: '',
        address: '',
        birth: '',
        gender: '',
        entYn: 'N',
        entDate: '',
        vacationPeriod: 15,
        departmentCode: ''
    });

    const [departments, setDepartments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [levels, setLevels] = useState([]);

    const { members, setMembers } = useMemberStore(); // Zustand store 사용

    useEffect(() => {
        // Fetch departments
        axios.get(`http://${host}/members/selectDepartment`)
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));

        // Fetch teams
        axios.get(`http://${host}/members/selectTeam`)
            .then(response => setTeams(response.data))
            .catch(error => console.error('Error fetching teams:', error));

        // Fetch jobs
        axios.get(`http://${host}/members/selectJob`)
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching jobs:', error));

        // Fetch levels
        axios.get(`http://${host}/members/selectLevel`)
            .then(response => setLevels(response.data))
            .catch(error => console.error('Error fetching levels:', error));
    }, []);

    useEffect(() => {
        // Filter teams based on selected department
        const departmentTeams = teams.filter(team => team.dept_code === formData.departmentCode);
        setFilteredTeams(departmentTeams);
    }, [formData.departmentCode, teams]);

    useEffect(() => {
        // Set password to birthdate if birthdate is provided
        if (formData.birth) {
            setFormData(prev => ({
                ...prev,
                pw: formData.birth
            }));
        }
    }, [formData.birth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressSearch = () => {
        // Daum 우편번호 API 호출
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 주소 정보를 formData에 설정
                setFormData(prev => ({
                    ...prev,
                    address: data.address
                }));
            }
        }).open();
    };

    const getLevelName = (level) => {
        if (!level) return '레벨 없음';
        if (level.total === 'Y') return '전체 권한';
        if (level.hr === 'Y') return 'HR 권한';
        if (level.reservation === 'Y') return '예약 권한';
        if (level.message === 'Y') return '메시지 권한';
        if (level.task === 'Y') return '업무 권한';
        return '권한 없음';
    };

    return (
        <div className={styles.container}>
            <h2>사용자 등록</h2>
           
            <input
                type="text"
                placeholder="아이디"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                placeholder="비밀번호"
                name="pw"
                value={formData.pw}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                placeholder="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                placeholder="이메일"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <select
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleChange}
                required
            >
                <option value="">부서 선택</option>
                {departments.map(department => (
                    <option key={department.dept_code} value={department.dept_code}>
                        {department.dept_name}
                    </option>
                ))}
            </select>
            <select
                name="teamCode"
                value={formData.teamCode}
                onChange={handleChange}
                required
            >
                <option value="">팀 선택</option>
                {filteredTeams.map(team => (
                    <option key={team.team_code} value={team.team_code}>
                        {team.team_name}
                    </option>
                ))}
            </select>
            <select
                name="jobCode"
                value={formData.jobCode}
                onChange={handleChange}
                required
            >
                <option value="">직급 선택</option>
                {jobs.map(job => (
                    <option key={job.job_code} value={job.job_code}>
                        {job.job_name}
                    </option>
                ))}
            </select>
            <select
                name="memberLevel"
                value={formData.memberLevel}
                onChange={handleChange}
                required
            >
                <option value="">회원 레벨 선택</option>
                {levels.map(level => (
                    <option key={level.seq} value={level.seq}>
                        {getLevelName(level)}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="전화번호"
                name="memberCall"
                value={formData.memberCall}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="주소"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <button 
                type="button" 
                id="search-address-btn" 
                className={styles.searchAddressBtn}
                onClick={handleAddressSearch}
            >
                주소 검색
            </button>
            <input
                type="text"
                placeholder="생년월일"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
            />
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
            >
                <option value="">성별</option>
                <option value="M">남성</option>
                <option value="F">여성</option>
            </select>
            <select
                name="entYn"
                value={formData.entYn}
                onChange={handleChange}
            >
                <option value="N">재직 </option>
                <option value="Y">휴직 </option>
            </select>
            {formData.entYn === 'Y' && (
                <input
                    type="text"
                    placeholder="휴직일"
                    name="entDate"
                    value={formData.entDate}
                    onChange={handleChange}
                />
            )}
            <input
                type="number"
                placeholder="휴가 기간"
                name="vacationPeriod"
                value={formData.vacationPeriod}
                onChange={handleChange}
            />
            <button type="submit">회원가입</button>
        </div>
    );
};

export default Signup;
