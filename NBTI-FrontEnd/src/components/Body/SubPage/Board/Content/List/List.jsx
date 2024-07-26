import { useNavigate } from "react-router-dom";
import styles from "./List.module.css";


export const List = () => {

    const navi = useNavigate();

    return (
        <div className={styles.container}>
            <h1>자유 게시판</h1>
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
                <div className={styles.list}>
                    <div className={styles.seq}>
                        <p>1</p>
                    </div>
                    <div className={styles.title}>
                        <p onClick={() => { navi("detail") }}>자유게시판 제목입니다.</p>
                    </div>
                    <div className={styles.writer}>
                        <p>롱초</p>
                    </div>
                    <div className={styles.writeDate}>
                        <p>2024-07-26 15:20</p>
                    </div>
                    <div className={styles.viewCount}>
                        <p>3</p>
                    </div>
                </div>
            </div>

        </div>
    )

}