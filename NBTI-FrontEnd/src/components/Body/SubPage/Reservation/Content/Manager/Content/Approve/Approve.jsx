import axios from 'axios'
import styles from './Approve.module.css'
import { host } from '../../../../../../../../config/config';
import { useReservationList } from '../../../../../../../../store/store';
import { useEffect } from 'react';

export const Approve = () => {
    const { approve, setApprove } = useReservationList();

    useEffect(() => {

        // 예약 목록을 가져오는 함수
        const fetchReservations = () => {
            axios.get(`${host}/reserve/approveList`)
                .then((resp) => {
                    // console.log(JSON.stringify(resp))
                    setApprove(resp.data); // 예약 목록 상태 업데이트
                    // console.log('Approve State after update:', approve); 
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
        };

        fetchReservations(); // 컴포넌트가 마운트될 때 예약 목록 가져오기
    }, [setApprove]); // 의존성 배열에 추가

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
                        </tr>
                    </thead>
                    <tbody>
                    {approve.length > 0 ? (
                                approve.map((approve) => (
                                    <tr key={approve.seq}>
                                        <td>{approve.member_id}</td>
                                        <td>{approve.reserve_title_code}</td>
                                        <td>{approve.reserve_title_code}</td>
                                        <td>{approve.purpose}</td>
                                        <td>{`${new Date(approve.start_time).toLocaleString()} ~ ${new Date(approve.end_time).toLocaleString()}`}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>리스트가 존재하지 않음</td>
                                </tr>
                            )}
                    </tbody>
            </table>
            <p className={styles.num}>총 {approve.length}개</p>
        </div>
    )
}