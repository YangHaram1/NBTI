import { useNavigate } from "react-router-dom";
import styles from "./List.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns';
import { useBoardStore } from "../../../../../../store/store";

export const List = () => {
    const navi = useNavigate();
    const [list, setList] = useState([{}]);
    const { boardType } = useBoardStore();

    useEffect(() => {
        // 1 : 자유 2: 공지
        let code = 1;
        if (boardType === "자유") code = 1;
        else if (boardType === "공지") code = 2;

        axios.get(`http://172.30.1.31/board/${code}`).then((resp) => {
            console.log(resp);
            setList(resp.data);
        });
    }, [boardType]);

    return (
        <div className={styles.container}>
            <h1>{boardType} 게시판</h1>
            <div className={styles.searchBox}>
                <div className={styles.dropdown}>
                    <select>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="writer">작성자</option>
                    </select>
                </div>
                <input type="text" placeholder="검색" />
                <button>검색</button>
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
                {
                    list.map((item, index) => {
                        const date = new Date(item.write_date);
                        const currentDate = !isNaN(date) ? format(date, 'yyyy-MM-dd') : 'Invalid Date';
                        // const currentDate = format(new Date(item.write_date), 'yyyy-MM-dd');
                        return (
                            <div className={styles.list} key={index}>
                                <div className={styles.seq}>
                                    <p>{item.seq}</p>
                                </div>
                                <div className={styles.title}>
                                    <p onClick={() => { navi("detail") }}>{item.title}</p>
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
                    })
                }
            </div>
        </div>
    )

}