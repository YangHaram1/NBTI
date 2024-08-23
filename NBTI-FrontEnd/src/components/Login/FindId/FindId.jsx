import React, { useState } from 'react';
import axios from 'axios';
import { host } from '../../../config/config';
import styles from './FindId.module.css';

const FindId = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleFindId = () => {
        axios.post(`${host}/auth/find-id`, null, {
            params: { email, name }
        })
        .then(response => {
            alert(`아이디는 ${response.data}입니다.`);
            onBack(); // 로그인 페이지로 돌아가기
        })
        .catch(error => {
            alert('아이디를 찾을 수 없습니다. 입력하신 정보를 확인하세요.');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.findBox}>
                <h2 className={styles.title}>아이디 찾기</h2>
                <input 
                    type="text" 
                    placeholder="이름" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="email" 
                    placeholder="이메일" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                 <button onClick={handleFindId} className={styles.button}>아이디 찾기</button>
                 <button onClick={onBack} className={styles.button}>돌아가기</button>
            </div>
        </div>
    );
};

export default FindId;
