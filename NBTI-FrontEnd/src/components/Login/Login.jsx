import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../config/config";
import axios from 'axios';
import styles from './Login.module.css'; // CSS 모듈 임포트
import { useAuthStore } from "../../store/store";

axios.defaults.withCredentials = true;

const Login = () => {
    const { setLoginID } = useAuthStore();
    const navi = useNavigate();
    const [auth, setAuth] = useState({ id: '', pw: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
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
                <button onClick={handleLogin} className={styles.button}>Login</button>
                {error && <div className={styles.alert}>{error}</div>}
            </div>
        </div>
    );
};

export default Login;
