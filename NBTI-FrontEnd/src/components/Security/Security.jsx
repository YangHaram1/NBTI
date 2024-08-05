import styles from './Security.module.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { host } from '../../config/config';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
const Security = () => {
    const [history, setHistory] = useState([]);
    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState();
    const [target, setTarget] = useState('');
    const [keyword, setKeyword] = useState('');
    const [search,setSearch] =useState(false);
    const record_count_per_page = 25;
    const navi_count_per_page = 5;


    useEffect(() => {
        const start = cpage * record_count_per_page - (record_count_per_page - 1); //1
        const end = cpage * record_count_per_page; //10
        axios.get(`${host}/user_history?start=${start}&&end=${end}&&target=${target}&&keyword=${keyword}`).then((resp) => {
           // console.log(resp.data)
            setHistory((prev) => {
                const record_total_count = resp.data.count;
                if (record_total_count % record_count_per_page === 0) {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                }
                else {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                }
                return resp.data.list;
            });
        })
    }, [cpage,search])

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    }

    const pageSetting = useCallback(() => {

    }, [history])

    useEffect(() => {
        if (history.length > 0) {
            pageSetting();
        }
    }, [pageSetting])

    const handleSearch=()=>{
        setSearch((prev)=>{
            setCpage(1);
            return !prev;
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <select value={target} onChange={(e) => setTarget(e.target.value)}>
                    <option value="">선택</option>
                    <option value="id">ID</option>
                    <option value="ip">IP</option>
                </select>
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className={styles.header}>
                <div>
                    Seq
                </div>
                <div>
                    User_ID
                </div>
                <div>
                    IP
                </div>
                <div>
                    접속날짜
                </div>
                <div>
                    접속시간
                </div>
            </div>
            <div className={styles.list}>
                {
                    history.map((item, index) => {
                        const currentDate = format(new Date(item.join_date), 'yyyy-MM-dd HH:mm:ss');
                        const date = currentDate.split(" ");
                        return (
                            <div className={styles.item} key={index}>
                                <div>
                                    {item.seq}
                                </div>
                                <div>
                                    {item.member_id}
                                </div>
                                <div>
                                    {item.ip}
                                </div>
                                <div>
                                    {date[0]}
                                </div>
                                <div>
                                    {date[1]}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
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
        </div>

    );
}
export default Security;