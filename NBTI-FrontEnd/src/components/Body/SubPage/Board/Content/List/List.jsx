import styles from "./List.module.css";

export const List = () => {
    return (
        <div className={styles.container}>
            <h1>자유 게시판</h1>
            <div className={styles.searchBox}>
                <input type="text" placeholder="검색" />
                <button>검색</button>
            </div>
            <div className={styles.list}></div>



            {/* <div className={styles.header}>
                <h1>자유게시판 </h1>
                <div className={styles.searchBox}>
                    <div></div>
                    <div>

                    </div>
                </div>
            </div>
            <div className={styles.body}></div> */}

        </div>
    )


}