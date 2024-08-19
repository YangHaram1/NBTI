import axios from 'axios'
import styles from './Approve.module.css'
import { host } from '../../../../../../../../config/config';
import { useReservationList } from '../../../../../../../../store/store';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export const Approve = () => {
    const { approve, setApprove } = useReservationList();

    // 페이지네이션
    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState(0);
    const [target, setTarget] = useState('');
    const [keyword, setKeyword] = useState('');
    const [search,setSearch] =useState(false);
    const record_count_per_page = 10;
    const navi_count_per_page = 3;

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    }


    useEffect(() => {

        // 승인 목록
        const fetchReservations = () => {

            const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
            const end = cpage * record_count_per_page; //10

            axios.get(`${host}/reserve/approveList?start=${start}&&end=${end}`)
                .then((resp) => {

                    const record_total_count = resp.data.count;
                    if (record_total_count % record_count_per_page === 0) {
                        setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                    }
                    else {
                        setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                    }

                    setApprove(resp.data.list); //승인 목록 상태 업데이트
                })
                .catch((error) => {
                    console.error('승인 목록 Error: ', error);
                });
        };

        fetchReservations(); // 컴포넌트가 마운트될 때 예약 목록 가져오기
    }, [cpage]); // 의존성 배열에 추가

    return(
        <div className={styles.container}>
                <table className={styles.list}>
                    <thead>
                        <tr>
                            <th>요청자</th>
                            <th>카테고리</th>
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
            <ReactPaginate
                pageCount={page_total_count} // 페이지 수
                pageRangeDisplayed={navi_count_per_page} // 현재 페이지를 기준으로 표시할 페이지 범위 수
                marginPagesDisplayed={1} // 양쪽 끝에 표시할 페이지 수
                onPageChange={handlePage} // 페이지 변경 핸들러
                containerClassName={styles.pagination} // 스타일 클래스
                activeClassName={styles.active} // 활성 페이지 클래스
                initialPage={0} //초기 page 값
                previousLabel={'<'} // 이전 페이지 버튼 레이블
                previousClassName={styles.previous} // 이전 버튼의 클래스명
                nextLabel={'>'} // 다음 페이지 버튼 레이블
                nextClassName={styles.next} // 다음 버튼의 클래스명
                breakLabel={'...'} // 생략 표시 제거
                breakClassName={null} // 생략 표시의 클래스명 제거
            />
            {/* <p className={styles.num}>총 {approve.length}개</p> */}
        </div>
    )
}