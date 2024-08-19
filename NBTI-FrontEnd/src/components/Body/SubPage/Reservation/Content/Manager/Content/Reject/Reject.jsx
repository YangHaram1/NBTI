import { useEffect, useState } from 'react';
import { useReservationList } from '../../../../../../../../store/store'
import styles from './Reject.module.css'
import axios from 'axios';
import { host } from '../../../../../../../../config/config';
import ReactPaginate from 'react-paginate';

export const Reject = () => {
    const {reject, setReject} = useReservationList();

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


    useEffect(()=>{

        // 반려 목록
        const rejectList = () =>{

            const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
            const end = cpage * record_count_per_page; //10

            axios.get(`${host}/reserve/rejectList?start=${start}&&end=${end}`)
            .then((resp)=>{
                console.log(JSON.stringify(resp))
                const record_total_count = resp.data.count;
                if (record_total_count % record_count_per_page === 0) {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                }
                else {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                }

                setReject(resp.data.list); //반려 목록 상태 업데이트
            }).catch((error)=>{
                console.error(`반려 목록 Error: `, error);
            })
        }

        rejectList(); 
    },[cpage])
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
                        {reject.length > 0 ? (
                            reject.map((reject)=>(
                                <tr key={reject.seq}>
                                    <td>{reject.member_id}</td>
                                    <td>{reject.reserve_title_code}</td>
                                    <td>{reject.purpose}</td>
                                    <td>{`${new Date(reject.start_time).toLocaleString()} ~ ${new Date(reject.end_time).toLocaleString()}`}</td>
                                </tr>
                            ))
                        ) : (
                            <tr colSpan={5}>리스트가 존재하지 않습니다.</tr>
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
            {/* <p className={styles.num}>총 {reject.length}개</p> */}
        </div>
    )
}