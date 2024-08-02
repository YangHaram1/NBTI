import styles from "./NoticeBoard.module.css";

export const NoticeBoard = () => {
  return (
    <div className={styles.container}>
      <h3>공지 게시판</h3>
      <div className={styles.header}>
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
      <div className={styles.body}>
        <div className={styles.list}>
          <div className={styles.seq}>
            <p>33</p>
          </div>
          <div className={styles.title}>
            <p>공지 제목입니다.</p>
          </div>
          <div className={styles.writer}>
            <p>관리자</p>
          </div>
          <div className={styles.writeDate}>
            <p>2024-08-02</p>
          </div>
          <div className={styles.viewCount}>
            <p>3</p>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.seq}>
            <p>33</p>
          </div>
          <div className={styles.title}>
            <p>공지 제목입니다.</p>
          </div>
          <div className={styles.writer}>
            <p>관리자</p>
          </div>
          <div className={styles.writeDate}>
            <p>2024-08-02</p>
          </div>
          <div className={styles.viewCount}>
            <p>3</p>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.seq}>
            <p>33</p>
          </div>
          <div className={styles.title}>
            <p>공지 제목입니다.</p>
          </div>
          <div className={styles.writer}>
            <p>관리자</p>
          </div>
          <div className={styles.writeDate}>
            <p>2024-08-02</p>
          </div>
          <div className={styles.viewCount}>
            <p>3</p>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.seq}>
            <p>33</p>
          </div>
          <div className={styles.title}>
            <p>공지 제목입니다.</p>
          </div>
          <div className={styles.writer}>
            <p>관리자</p>
          </div>
          <div className={styles.writeDate}>
            <p>2024-08-02</p>
          </div>
          <div className={styles.viewCount}>
            <p>3</p>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.seq}>
            <p>33</p>
          </div>
          <div className={styles.title}>
            <p>공지 제목입니다.</p>
          </div>
          <div className={styles.writer}>
            <p>관리자</p>
          </div>
          <div className={styles.writeDate}>
            <p>2024-08-02</p>
          </div>
          <div className={styles.viewCount}>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
};
