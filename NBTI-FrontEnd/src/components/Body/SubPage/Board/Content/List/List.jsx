import { useNavigate } from "react-router-dom";
import styles from "./List.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useBoardStore } from "../../../../../../store/store";
import { host } from "../../../../../../config/config";

export const List = () => {
    const navi = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const { boardType, setBoardSeq } = useBoardStore();
    const [target, setTarget] = useState('');  // target 초기 값을 빈 문자열로 설정
    const [keyword, setKeyword] = useState('');     // keyword 초기 값
    const [start, setStart] = useState(0); // 페이지네이션 시작 인덱스
    const [end, setEnd] = useState(100); // 페이지네이션 종료 인덱스
    const [search, setSearch] = useState(false);


    // 1 : 자유 2: 공지
    let code = 1;
    if (boardType === "자유") code = 1;
    else if (boardType === "공지") code = 2;


    // 게시판 목록 출력 
    const params = { code: code, target: target, keyword: keyword, start: start, end: end };
    useEffect(() => {
        axios.get(`${host}/board/list`, { params }).then((resp) => {
            setBoardList(resp.data);
        });
    }, [boardType, search]);

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        setSearch((prev) => {
            return !prev;
        })
        // setKeyword('');
    };



    // 조회수 증가 및 상세 페이지로 이동 
    const handleTitleClick = (seq) => {
        const requestBox = { seq: seq, board_code: code };
        axios.put(`${host}/board/viewCount`, requestBox).then((resp) => {
            setBoardSeq(seq);
            navi("/board/detail");
        });
    };

    // 페이지네이션
    useEffect(() => { }, []);

    return (
        <div className={styles.container}>
            <h1>{boardType} 게시판</h1>
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
                <a href=""> 1 2 3 4 5 6 7 </a>
            </div>
        </div>
    );
};
