import styles from './FreeBoard.module.css';
import image from "../../../../../images/user.jpg";

export const FreeBoard = () => {
    return (
        <div className={styles.container}>
            <h3>자유 게시판</h3>


            <div className={styles.boardList}> {/* map */}
                <div className={styles.header}>
                    <div className={styles.profile}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.writer}>
                        <p>롱초</p>
                    </div>
                    <div className={styles.writeDate}>
                        <p>2024-08-02 15:33</p>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.board}>
                        <div className={styles.boardTitle}>
                            <p>자유 제목입니다.</p>
                        </div>
                        <div className={styles.boardContents}>
                            <p>자유 내용 어쩌구</p>
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
        </div>
    )
}