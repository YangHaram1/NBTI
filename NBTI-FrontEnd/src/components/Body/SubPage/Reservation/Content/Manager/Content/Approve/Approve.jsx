import styles from './Approve.module.css'
export const Approve = () => {
    return(
        <div className={styles.container}>
                <table className={styles.list}>
                    <thead>
                        <tr>
                            <th>요청자</th>
                            <th>카테고리</th>
                            <th>자원</th>
                            <th>예약 시간</th>
                            <th>설정</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                    </tbody>
            </table>
            <p className={styles.num}>총 0개</p>
        </div>
    )
}