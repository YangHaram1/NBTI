import axios from "axios";
import styles from "./NoticeBoard.module.css";
import { host } from "../../../../../config/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../../../store/store";
import { format } from "date-fns";

export const NoticeBoard = () => {
    const navi = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const { boardType, setBoardSeq } = useBoardStore();

    // 공지 게시판 목록 출력
    useEffect(() => {
        axios.get(`${host}/board/noticeBoard`).then((resp) => {
            setBoardList(resp.data);
        });
    }, []);

    // 조회수 증가 및 상세 페이지로 이동
    const handleTitleClick = (seq) => {
        console.log("게시글 번호 : ", seq);

        const requestBox = { seq: seq, board_code: 2 };
        axios.put(`${host}/board/viewCount`, requestBox).then((resp) => {
            setBoardSeq(seq);
            navi("/board/detail/");
        });
    };

    return (
        <div className={styles.container}>
            <h3>공지 게시판</h3>
            <div className={styles.header}>
                <div>
                    <p></p>
                </div>
                <div>
                    <p>제목</p>
                </div>
                <div>
                    <p>작성일</p>
                </div>
                <div>
                    <p>조회수</p>
                </div>
            </div>

            <div className={styles.body}>
                {boardList.map((item, i) => {
                    const date = new Date(item.write_date);
                    const currentDate = !isNaN(date)
                        ? format(date, "yyyy-MM-dd")
                        : "Invalid Date";
                    return (
                        <div className={styles.list} key={i}>
                            <div className={styles.seq}>
                                <p>공지</p>
                            </div>
                            <div className={styles.title}>
                                <p
                                    onClick={() => {
                                        handleTitleClick(item.seq);
                                    }}
                                >
                                    {item.title}
                                </p>
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
        </div>
    );
};
