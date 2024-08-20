import styles from './List.module.css'
import { useEffect, useState } from 'react';
import { host } from '../../../../../../config/config';
import axios from 'axios';
import { useReservationList } from '../../../../../../store/store';
import SweetAlert from '../../../../../../function/SweetAlert';

export const List = ()=>{

    const { approve, setApprove , reservations, setReservations} = useReservationList();
    
    useEffect(() => {
        // 예약 목록
        const fetchApproveList = () => {
            axios.get(`${host}/reserve/reservationList`)
                .then(resp => {
                    setApprove(resp.data); // 승인된 목록 상태 업데이트
                })
                .catch((error) => {
                    console.error('예약 목록 오류 발생:', error);
                });
        };
        fetchApproveList(); // 컴포넌트가 마운트될 때 예약 목록 가져오기
    }, [setApprove]); // 의존성 배열에 추가


    // useEffect(() => {
    //     // 대기 목록
    //     const fetchReservations = () => {
    //         axios.get(`${host}/reserve`)
    //             .then(resp => {
    //                 // console.log("대기 목록"+JSON.stringify(resp))
    //                 // 응답 데이터가 배열이 아닐 경우 배열로 변환
    //                 const data = Array.isArray(resp.data) ? resp.data : [resp.data];
    //                 setReservations(data); // 목록 상태 업데이트
    //             })
    //             .catch((error) => {
    //                 console.error('대기 목록 오류 발생:', error);
    //             });
    //     };
    //     fetchReservations(); // 컴포넌트가 마운트될 때 대기 목록 가져오기
    // }, [setReservations]); // 의존성 배열에 추가


    // const cancelReservation = (seq) => {
    //     // 예약 취소
    //     axios.delete(`${host}/reserve/${seq}`)
    //         .then(resp => {
    //             console.log("예약 취소 성공:", resp);
    //             setReservations(prevItems => 
    //                 prevItems.filter(reservation => reservation.seq !== seq)
    //             );
    //         })
    //         .catch(error => {
    //             console.error('예약 취소 중 오류 발생:', error);
    //         });
    // };


    const cancelReservation = (seq) => {
        // 예약 취소
        axios.delete(`${host}/reserve/${seq}`)
            .then(resp => {
                // console.log("예약 취소 성공:", resp);
                // 예약 취소 후 대기 목록을 다시 불러오기
                fetchReservations();
            })
            .catch(error => {
                console.error('예약 취소 중 오류 발생:', error);
            });
    };
    
    const fetchReservations = () => {
        axios.get(`${host}/reserve`)
            .then(resp => {
                // 응답 데이터가 배열이 아닐 경우 배열로 변환
                const data = Array.isArray(resp.data) ? resp.data : [resp.data];
                setReservations(data); // 목록 상태 업데이트
            })
            .catch((error) => {
                console.error('대기 목록 오류 발생:', error);
            });
    };
    
    useEffect(() => {
        // 컴포넌트가 마운트될 때 대기 목록 가져오기
        fetchReservations();
    }, []); // 빈 배열로 설정하여 컴포넌트가 마운트될 때만 실행
    


    
    
    
    

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h3><i className="fa-solid fa-square-check"></i>   내 예약 목록</h3>   
            </div>
            <div className={styles.content}>
                <div className={styles.ReservationList}>
                    <div>
                        <h4>예약 목록</h4>
                    </div>
                    <table className={styles.list}>
                            <thead>
                                <tr>
                                    <th>분류</th>
                                    <th>자원명</th>
                                    <th>예약시간</th>
                                </tr>
                            </thead>
                            <tbody>
                            {approve.length > 0 && approve.filter((item)=> new Date(item.end_time) > new Date()).length > 0 ? (
                                approve
                                .filter((item) => new Date(item.end_time) > new Date()) // 현재 날짜보다 종료 시간이 큰 예약만 필터링
                                .map((approve) => (
                                    <tr key={approve.seq}>
                                        <td>{approve.reserve_title_code}</td>
                                        <td>{approve.reserve_title_code}</td>
                                        <td>{`${new Date(approve.start_time).toLocaleString()}  ~  ${new Date(approve.end_time).toLocaleString()}`}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>리스트가 존재하지 않음</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                </div>

                <div className={styles.waitingList}>
                    <div>
                        <h4>대기 목록</h4>
                    </div>
                    <table className={styles.list}>
                        <thead>
                            <tr>
                                <th>분류</th>
                                <th>자원명</th>
                                <th>예약시간</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(reservations) && reservations.length > 0 ? (
                                reservations.map((wait) => (
                                    <tr key={wait.seq}>
                                        <td>{wait.reserve_title_code}</td>
                                        <td>{wait.reserve_title_code}</td>
                                        <td>{`${new Date(wait.start_time).toLocaleString()}  ~  ${new Date(wait.end_time).toLocaleString()}`}</td>
                                        <td className={styles.state}><span>{wait.state === 'N' ? '승인 대기 중' : wait.state}</span><button onClick={()=>{SweetAlert("warning","예약","정말 취소하시겠습니까?",()=> cancelReservation(wait.seq))}}>예약 취소하기</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>리스트가 존재하지 않음</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 