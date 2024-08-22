import { useState } from 'react';
import axios from 'axios';
import styles from './ChangePw.module.css';
import { host } from '../../../../config/config';

const ChangePw = ({ authData, onBack }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        axios.post(`${host}/auth/updatePw`, {
            id: authData.id,  // 여기서 authData.id로 접근
            newPassword: newPassword
        })
        .then(() => {
            alert('비밀번호가 성공적으로 변경되었습니다.');
            onBack(); // 로그인 페이지로 돌아가기
        })
        .catch(() => {
            setError('비밀번호 변경 중 오류가 발생했습니다.');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.changeBox}>
                <h2 className={styles.title}>비밀번호 변경</h2>
                <input 
                    type="password" 
                    placeholder="새 비밀번호" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="password" 
                    placeholder="새 비밀번호 확인" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                />
                {error && <div className={styles.error}>{error}</div>}
                <button onClick={handleChangePassword} className={styles.button}>비밀번호 변경</button>
                <button onClick={onBack} className={styles.button}>돌아가기</button>
            </div>
        </div>
    );
};

export default ChangePw;

