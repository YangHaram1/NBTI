import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';
import { host } from '../../../../config/config';
import { useMemberStore } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        name: '',
        email: '',
        team_code: '',
        job_code: '',
        member_level: '',
        member_call: '',
        address: '',
        birth: '',
        gender: '',
        ent_yn: 'N',
        vacation_period: 15,
        end_date: ''
    });

    const [teams, setTeams] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [levels, setLevels] = useState([]);

    const { members, setMembers } = useMemberStore(); // Zustand store 사용
    const navi = useNavigate();
    useEffect(() => {
        axios.get(`http://${host}/members/selectTeam`)
            .then(response => setTeams(response.data))
            .catch(error => console.error('Error fetching teams:', error));

        axios.get(`http://${host}/members/selectJob`)
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching jobs:', error));

        axios.get(`http://${host}/members/selectLevel`)
            .then(response => setLevels(response.data))
            .catch(error => console.error('Error fetching levels:', error));
    }, []);

    useEffect(() => {
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
        new window.daum.Postcode({
            oncomplete: function(data) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // `enter_date`를 포함하지 않음
        axios.post(`http://${host}/members`, formData)
            .then(response => {
                alert('회원가입이 성공적으로 완료되었습니다.');
                setMembers([...members, response.data]);
                navi("/");
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            });
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
                name="team_code"
                value={formData.team_code}
                onChange={handleChange}
                required
            >
                <option value="">팀 선택</option>
                {teams.map(team => (
                    <option key={team.team_code} value={team.team_code}>
                        {team.team_name}
                    </option>
                ))}
            </select>
            <select
                name="job_code"
                value={formData.job_code}
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
                name="member_level"
                value={formData.member_level}
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
                name="member_call"
                value={formData.member_call}
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
                name="ent_yn"
                value={formData.ent_yn}
                onChange={handleChange}
            >
                <option value="N">재직</option>
                <option value="Y">휴직</option>
            </select>
            {formData.ent_yn === 'Y' && (
                <input
                    type="text"
                    placeholder="휴직일"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                />
            )}
            <input
                type="number"
                placeholder="휴가 기간"
                name="vacation_period"
                value={formData.vacation_period}
                onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>회원가입</button>
        </div>
    );
};

export default Signup;
