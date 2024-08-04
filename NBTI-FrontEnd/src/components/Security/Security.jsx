import styles from './Security.module.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { host } from '../../config/config';
const Security = () => {
    const [history, setHistory] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`${host}/user_history`).then((resp) => {

        })
    }, [])

    const handleList = useCallback(() => {
        setList(history);
    }, [history])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    seq
                </div>
                <div>
                    User_ID
                </div>
                <div>
                    IP
                </div>
                <div>
                    접속시간
                </div>
            </div>
            <div className={styles.list}>
                {
                    list
                }
            </div>
        </div>

    );
}
export default Security;