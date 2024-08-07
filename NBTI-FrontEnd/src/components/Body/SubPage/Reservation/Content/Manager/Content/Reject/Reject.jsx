import { useEffect } from 'react';
import { useReservationList } from '../../../../../../../../store/store'
import styles from './Reject.module.css'
import axios from 'axios';
import { host } from '../../../../../../../../config/config';

export const Reject = () => {
    const {reject, setReject} = useReservationList();

    useEffect(()=>{
        const rejectList = () =>{
            axios.get(`${host}/reserve/rejectList`)
            .then((resp)=>{
                console.log("반려 목록"+JSON.stringify(resp))
                setReject(resp.data);
            }).catch((error)=>{
                console.error(`Error`, error);
            })
        }

        rejectList(); 
    },[setReject])
    return(
        <div className={styles.container}>
                <table className={styles.list}>
                    <thead>
                        <tr>
                            <th>요청자</th>
                            <th>카테고리</th>
                            <th>자원</th>
                            <th>사용용도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reject.length > 0 ? (
                            reject.map((reject)=>(
                                <tr key={reject.seq}>
                                    <td>{reject.member_id}</td>
                                    <td>{reject.reserve_title_code}</td>
                                    <td>{reject.reserve_title_code}</td>
                                    <td>{reject.purpose}</td>
                                </tr>
                            ))
                        ) : (
                            <tr colSpan={5}>리스트가 존재하지 않습니다.</tr>
                        )}
                    </tbody>
            </table>
            <p className={styles.num}>총 {reject.length}개</p>
        </div>
    )
}