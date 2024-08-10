import styles from "./AdminQnA.module.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useBoardStore } from "../../../../store/store";
import { host } from "../../../../config/config";
import ReactPaginate from "react-paginate";


export const AdminQnA = () => {

    const navi = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const { boardType, setBoardSeq, setBoardType } = useBoardStore();
    const [target, setTarget] = useState('');  // target 초기 값을 빈 문자열로 설정
    const [keyword, setKeyword] = useState('');     // keyword 초기 값
    const [search, setSearch] = useState(false);

    // 페이지네이션
    const navi_count_per_page = 5;
    const recordCountPerPage = 10; // 한페이지에 나오는 게시글 수
    const [pageTotalCount, setPageTotalCount] = useState();
    const [cpage, setCpage] = useState(1); // 현재 페이지

    // 1 : 자유 
    let code = 3;
    // 게시판 목록 출력 
    useEffect(() => {
        const start = cpage * recordCountPerPage - (recordCountPerPage - 1); // 1
        const end = cpage * recordCountPerPage; // 10
        const params = { code: code, target: target, keyword: keyword, start: start, end: end };

        axios.get(`${host}/board/list`, { params }).then((resp) => {

            setBoardList(resp.data.list); // 서버에서 list와 count 보낸 것 중 list만 담기

            // 페이지네이션
            const recordTotalCount = resp.data.count;
            if (recordTotalCount % recordCountPerPage === 0) {
                setPageTotalCount(Math.floor(recordTotalCount / recordCountPerPage));
            }
            else {
                setPageTotalCount(Math.floor(recordTotalCount / recordCountPerPage) + 1);
            }

        });
    }, [search, cpage]);

    // 페이지네이션
    const handlePageClick = (data) => {
        setCpage(data.selected + 1); // 현재 페이지
    }

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        setSearch((prev) => {
            return !prev;
        })
    };

    // 조회수 증가 및 상세 페이지로 이동 
    const handleTitleClick = (seq) => {
        const requestBox = { seq: seq, board_code: code };
        axios.put(`${host}/board/viewCount`, requestBox).then((resp) => {
            setBoardSeq(seq);
            navi("/mypage/qnaDetail");
        });
    };


    return (
        <div className={styles.container}>
            <h1>문의 내역</h1>
            <div className={styles.searchBox}>
                <div className={styles.dropdown}>
                    <select value={target} onChange={(e) => setTarget(e.target.value)}>
                        <option value="">전체</option>
                        <option value="title">제목</option>
                        <option value="contents">내용</option>
                        <option value="member_id">작성자</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className={styles.body}>
                <div className={styles.listTitle}>
                    <div>
                        <p>No</p>
                    </div>
                    <div>
                        <p>답변</p>
                    </div>
                    <div>
                        <p>제목</p>
                    </div>
                    <div>
                        <p>작성자</p>
                    </div>
                    <div>
                        <p>작성일</p>
                    </div>
                    <div>
                        <p>조회수</p>
                    </div>
                </div>
                {boardList.map((item, index) => {
                    const date = new Date(item.write_date);
                    const currentDate = !isNaN(date)
                        ? format(date, "yyyy-MM-dd")
                        : "Invalid Date";

                    return (
                        <div className={styles.list} key={index}>
                            <div className={styles.seq}>
                                <p>{item.seq}</p>
                            </div>
                            <div className={styles.status}>
                                <p>진행중</p>
                            </div>
                            <div className={styles.title}>
                                <p onClick={() => { handleTitleClick(item.seq) }}>{item.title}</p>
                            </div>
                            <div className={styles.writer}>
                                <p>{item.member_id}</p>
                            </div>
                            <div className={styles.writeDate}>
                                <p>{currentDate}</p>
                            </div>
                            <div className={styles.viewCount}>
                                <p>{item.view_count}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.pagination}>
                <ReactPaginate
                    containerClassName={styles.pagination}

                    previousLabel={'<<'}
                    previousClassName={styles.previous}
                    previousLinkClassName={'page-link'}

                    nextLabel={">>"}
                    nextClassName={styles.next}
                    nextLinkClassName={'page-link'}

                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}

                    pageCount={pageTotalCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={navi_count_per_page}

                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}


                    activeClassName={styles.active}
                    onPageChange={handlePageClick}
                />
            </div>
        </div>
    )
}