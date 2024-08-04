import styles from './Security.module.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { host } from '../../config/config';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
const Security = () => {
    const [history, setHistory] = useState([]);
    const [list, setList] = useState([]);
    const [page,setPage]=useState(1);
    const [page_total_count,setPage_total_count] =useState();
    const record_count_per_page=10;
    const navi_count_per_page=4;

    useEffect(() => {
        axios.get(`${host}/user_history`).then((resp) => {
            setHistory(resp.data);

        })
    }, [])

    const handleList = useCallback(() => {
        setList(history);
        
    }, [history])

    useEffect(() => {
        if (history.length > 0) {
            handleList();
        }
    }, [history])


    const handlePage=(selectedPage)=>{
        setPage(selectedPage.selected);
    }

    const pageSetting=useCallback(()=>{
        const record_total_count =list.length;
        if(record_total_count%record_count_per_page===0){
			setPage_total_count(Math.floor(record_total_count/record_count_per_page));
		}
		else{
			setPage_total_count(Math.floor(record_total_count/record_count_per_page)+1);
		}
    },[list])

    useEffect(()=>{
        if(list.length>0){
            pageSetting();
        }
    },[pageSetting])

    return (
        <div className={styles.container}>
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
                    list.map((item, index) => {
                        const currentDate = format(new Date(item.join_date), 'yyyy-MM-dd HH-mm-ss');
                        const date=currentDate.split(" ");
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
                pageRangeDisplayed={5} // 현재 페이지를 기준으로 표시할 페이지 범위 수
                marginPagesDisplayed={0} // 양쪽 끝에 표시할 페이지 수
                onPageChange={handlePage} // 페이지 변경 핸들러
                containerClassName={styles.pagination} // 스타일 클래스
                activeClassName={styles.active} // 활성 페이지 클래스
                initialPage={0} //초기 page 값
                previousLabel={'<'} // 이전 페이지 버튼 레이블
                previousClassName={styles.previous} // 이전 버튼의 클래스명
                nextLabel={'>'} // 다음 페이지 버튼 레이블
                nextClassName={styles.next} // 다음 버튼의 클래스명
                breakLabel={null} // 생략 표시 제거
                breakClassName={null} // 생략 표시의 클래스명 제거
            />
        </div>

    );
}
export default Security;