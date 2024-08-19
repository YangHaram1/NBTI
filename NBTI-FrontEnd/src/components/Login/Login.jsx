import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './Login.module.css';
import { useAuthStore } from "../../store/store";
import { host } from "../../config/config";
import FindId from "./FindId/FindId";
import FindPw from "./FindPw/FindPw";
import ChangePw from "./FindPw/ChangePw/ChangePw";
import { Await } from "react-router-dom";

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

    const  handleLogin = () => {
        axios
            .post(`${host}/auth`, auth)
            .then(resp => {
                console.log('Server Response:', resp.data);
                sessionStorage.setItem('loginID', resp.data);
                setLoginID(resp.data);
            })
            .catch(err => {
                setError('ID 또는 PW를 다시 확인 해주세요');
            });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleFindPwSuccess = (data) => {
        setAuthData(data); // 인증 데이터 설정
        setPage('changepw'); // ChangePw 페이지로 변경
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
                <h2 className={styles.title}>Login</h2>
                <input
                    type="text"
                    placeholder="Login ID"
                    name="id"
                    value={auth.id}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="pw"
                    value={auth.pw}
                    onChange={handleChange}
                    className={styles.input}
                />
                <div>
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
