import BoardEditor from "../../../../BoardEditor/BoardEditor";
import styles from "./Insert.module.css";

export const Insert = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.blank}></div> */}
      <div className={styles.top}>
        <div className={styles.left}>
          <p>제목</p>
          <input type="text" placeholder="제목을 입력하세요." />
          <p className={styles.tempSave}>임시저장 : 2024-07-26-17:13</p>
        </div>
        <div className={styles.right}>
          <div className={styles.btns}>
            <button>임시저장</button>
            <button>작성완료</button>
          </div>
        </div>
      </div>
      <div className={styles.files}>
        <div>
          <input type="file" />
        </div>
      </div>
      <div className={styles.contents}>
        <BoardEditor />
      </div>
    </div>
  );
};
