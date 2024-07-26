import styles from "./List.module.css";


export const List = () => {
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
            <div className={styles.list}></div>

        </div>
    )

}