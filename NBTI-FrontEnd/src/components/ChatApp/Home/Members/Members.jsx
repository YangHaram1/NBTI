import { useState, useEffect } from 'react';
import styles from './Members.module.css';
import axios from 'axios';
const Members = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.post('',)
            .then(response => {
               setList(response);
            })
            .catch(error => {
                console.error('There was an error posting the data!', error);
            });
    }, [])
    return (
        <div className={styles.container}>
            {list.map((item)=>{
                return (
                    <div>item</div>
                );
            })}
        </div>
    );
}
export default Members;