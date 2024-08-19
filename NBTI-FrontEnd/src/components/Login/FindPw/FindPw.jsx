import { useState } from 'react';
import axios from 'axios';
import styles from './FindPw.module.css';
import { host } from '../../../config/config';

const FindPw = ({ onSuccess, onBack }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [error, setError] = useState('');

    const handleFindPw = () => {
        axios.post(`${host}/members/verify-user`, null, {
            params: { id, name, birth }
        })
        .then(response => {
            if (response.data) {
                onSuccess({ id }); // 인증 성공 후 id 전달
            } else {
                setError('입력하신 정보가 일치하지 않습니다. 다시 확인해주세요.');
            }
        })
        .catch(() => {
            setError('사용자 정보를 확인할 수 없습니다. 입력하신 정보를 확인하세요.');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.findBox}>
                <h2 className={styles.title}>비밀번호 찾기</h2>
                <input 
                    type="text" 
                    placeholder="아이디" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="이름" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="text" 
                    placeholder="생년월일" 
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleFindPw} className={styles.button}>비밀번호 찾기</button>
                {error && <div className={styles.error}>{error}</div>}
                <button onClick={onBack} className={styles.linkButton}>로그인으로 돌아가기</button>
            </div>
        </div>
    );
};

export default FindPw;
