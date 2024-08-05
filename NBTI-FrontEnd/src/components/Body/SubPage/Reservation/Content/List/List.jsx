import styles from './List.module.css'

export const List = ()=>{
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h3>내 예약 목록</h3>   
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
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4}>리스트가 존재하지 않음</td>
                                    {/* <td>test</td>
                                    <td>test</td>
                                    <td>test</td> */}
                                </tr>
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
                            <tr>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 