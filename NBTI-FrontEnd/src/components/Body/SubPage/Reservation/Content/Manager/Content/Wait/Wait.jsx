import { useEffect } from 'react';
import { useReservationList } from '../../../../../../../../store/store'
import styles from './Wait.module.css'
import axios from 'axios';
import { host } from '../../../../../../../../config/config';


export const Wait = () => {
    const {wait, setWait} = useReservationList();

    useEffect(() => {
        // 예약 목록
        const fetchReservations = () => {
            axios.get(`${host}/reserve/waitList`)
                .then((resp) => {
                    // console.log("목록출력 : "+JSON.stringify(resp))
                    setWait(resp.data); // 예약 목록 상태 업데이트
                })
                .catch((error) => {
                    console.error('Error', error);
                });
        };

        fetchReservations(); // 컴포넌트가 마운트될 때 예약 목록 가져오기
    }, [setWait]); // 의존성 배열에 추가

    // 승인
    const approveReservation = (seq) => {
        axios.post(`${host}/reserve/approve`, { seq })
            .then(() => {
                // 업데이트 후 목록을 다시 가져옴
                axios.get(`${host}/reserve/waitList`)
                    .then((resp) => {
                        setWait(resp.data);
                    })
                    .catch((error) => {
                        console.error('Error', error);
                    });
            })
            .catch((error) => {
                console.error('Error', error);
            });
    };

    // 반려
    const reject = (seq) => {
        axios.post(`${host}/reserve/reject`, { seq })
            .then(() => {
                // 업데이트 후 목록을 다시 가져옴
                axios.get(`${host}/reserve/waitList`)
                    .then((resp) => {
                        setWait(resp.data);
                    })
                    .catch((error) => {
                        console.error('Error', error);
                    });
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }
    

    return(
        <div className={styles.container}>
            <table className={styles.list}>
                    <thead>
                        <tr>
                            <th>요청자</th>
                            <th>카테고리</th>
                            <th>자원</th>
                            <th>사용용도</th>
                            <th>예약 시간</th>
                            <th>설정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wait.length > 0 ? (
                            wait.map((wait) => (
                                <tr key={wait.seq}>
                                    <td>{wait.member_id}</td>
                                    <td>{wait.reserve_title_code}</td>
                                    <td>{wait.reserve_title_code}</td>
                                    <td>{wait.purpose}</td>
                                    <td>{`${new Date(wait.start_time).toLocaleString()} ~ ${new Date(wait.end_time).toLocaleString()}`}</td>
                                    <td className={styles.btn}>
                                        <button onClick={() => approveReservation(wait.seq)}>승인</button>
                                        <button onClick={() => reject(wait.seq)}>반려</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>리스트가 존재하지 않음</td>
                            </tr>
                        )}
                    </tbody>
            </table>

            <p className={styles.num}>총 {wait.length}개</p>
        </div>
    )
}