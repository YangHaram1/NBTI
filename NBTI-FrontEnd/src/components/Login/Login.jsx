import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './Login.module.css';
import { useAuthStore } from "../../store/store";
import { host } from "../../config/config";
import FindId from "./FindId/FindId";
import FindPw from "./FindPw/FindPw";
import ChangePw from "./FindPw/ChangePw/ChangePw";

axios.defaults.withCredentials = true;

const Login = () => {
    const { setLoginID } = useAuthStore();
    const [auth, setAuth] = useState({ id: '', pw: '' });
    const [rememberId, setRememberId] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState('login');
    const [authData, setAuthData] = useState({}); // 인증 데이터 상태 추가

    const idKey = "id";

    useEffect(() => {
        const savedId = localStorage.getItem(idKey);
        if (savedId) {
            setAuth(prev => ({ ...prev, id: savedId }));
            setRememberId(true);
        }
    }, []);

    const handleRememberChange = () => {
        const newRememberId = !rememberId;
        setRememberId(newRememberId);
        if (newRememberId) {
            localStorage.setItem(idKey, auth.id);
        } else {
            localStorage.removeItem(idKey);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth(prev => ({ ...prev, [name]: value }));

        if (rememberId && name === 'id') {
            localStorage.setItem(idKey, value);
        }
    };

    const handleLogin = () => {
        axios
            .post(`${host}/auth`, auth)
            .then(resp => {
                sessionStorage.setItem('loginID', resp.data);
                setLoginID(resp.data);
                setError(''); // 로그인 성공 시 오류 메시지 초기화
            })
            .catch(err => {
                // 서버 응답에서 오류 메시지를 가져와 설정
                if (err.response && err.response.data) {
                    alert(err.response.data);
                } else {
                    alert('로그인 중 오류가 발생했습니다.');
                }
            });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleFindPwSuccess = (data) => {
        setAuthData(data); // 인증 데이터 설정
        setPage('changepw'); // ChangePw 페이지로 변경
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 폼 제출 방지
            handleLogin();
        }
    };

    if (page === 'findId') {
        return <FindId onBack={() => handlePageChange('login')} />;
    }

    if (page === 'findPw') {
        return <FindPw onSuccess={handleFindPwSuccess} onBack={() => handlePageChange('login')} />;
    }

    if (page === 'changepw') {
        return <ChangePw authData={authData} onBack={() => handlePageChange('login')} />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <a href="https://3.39.251.78/">여기로 들어가서 서버 설정 해주세요</a>
                <h2 className={styles.title}>Login</h2>
                <input
                    type="text"
                    placeholder="Login ID"
                    name="id"
                    value={auth.id}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="pw"
                    value={auth.pw}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                />
                <div className={styles.rememberId}>
                    <input
                        type="checkbox"
                        id="rememberid"
                        checked={rememberId}
                        onChange={handleRememberChange}
                    />
                    <label htmlFor="rememberid">아이디 저장</label>
                </div>
                <button onClick={handleLogin} className={styles.button}>Login</button>
                {error && <div className={styles.alert}>{error}</div>}
                <div className={styles.links}>
                    <button onClick={() => handlePageChange('findId')} className={styles.linkButton}>아이디 찾기</button>
                    <button onClick={() => handlePageChange('findPw')} className={styles.linkButton}>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
