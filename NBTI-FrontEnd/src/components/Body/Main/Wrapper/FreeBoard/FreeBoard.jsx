import styles from "./FreeBoard.module.css";
import image from "../../../../../images/user.jpg";
import { useEffect, useState } from "react";
import { host } from "../../../../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../../../store/store";
import { format } from 'date-fns';

export const FreeBoard = () => {

    const navi = useNavigate();
    const { boardSeq, boardType } = useBoardStore();
    const [board, setBoard] = useState([{}]); // 게시글의 data
    const [currentUser, setCurrentUser] = useState(null); // 로그인된 사용자 정보 상태
    const [reply, setReply] = useState([]);
    const [seq, setSeq] = useState();

    // 자유 게시판 글 출력
    useEffect(() => {
        // let code = 1;
        axios.get(`${host}/board/freeBoard`).then((resp) => {
            // setBoard(resp.data);

            console.log("aaa : ", resp.data)
            // axios.get(`${host}/reply/freeBoard`).then((resp) => {
            //     console.log("댓글 : ", resp.data);
            // })

        })



    }, []);

    useEffect(() => {
    }, [])

    return (
        <div className={styles.container}>
            <h3>자유 게시판</h3>

            {board.map((item, i) => {
                const date = new Date(item.write_date);
                const currentDate = !isNaN(date)
                    ? format(date, "yyyy-MM-dd HH:mm")
                    : "Invalid Date";
                return (
                    <div className={styles.boardList}>


                        <div className={styles.header}>
                            <div className={styles.profile}>
                                <img src={image} alt="" />
                            </div>
                            <div className={styles.writer}>
                                <p>{item.member_id}</p>
                            </div>
                            <div className={styles.writeDate}>
                                <p>{currentDate}</p>
                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.board}>
                                <div className={styles.boardTitle}>
                                    <p>{item.title}</p>
                                </div>
                                <div className={styles.boardContents}>
                                    <p dangerouslySetInnerHTML={{ __html: item.contents }}></p>
                                </div>
                            </div>
                            <div className={styles.reply}>
                                <div className={styles.replyInput}>
                                    <div className={styles.inputText} contentEditable="true"></div>
                                    <button>등록</button>
                                </div>

                                <div className={styles.replyOutputWrap}>
                                    {/* map */}
                                    <div className={styles.replyOutput}>
                                        <img src={image} alt="" />
                                        <div>
                                            <div className={styles.writer_writeDate}>
                                                <span>롱초</span>
                                                <span>2024-08-02 16:20:11</span>
                                            </div>
                                            <div className={styles.replyContent}>
                                                <p>댓글 내용 어쩌구</p>
                                            </div>
                                        </div>
                                        <div className={styles.likes}>
                                            <i className="fa-regular fa-heart" />
                                            <p>5</p>
                                        </div>
                                        <button>X</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }


            {/* map */}


        </div>
    );
};
