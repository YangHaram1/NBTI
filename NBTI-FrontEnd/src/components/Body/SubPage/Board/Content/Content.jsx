import styles from "./Content.module.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { List } from "./List/List";
import { Insert } from "./Insert/Insert";
import { Detail } from "./Detail/Detail";
import { MyBoardList } from "./MyBoardList/MyBoardList";
import { Bookmark } from "./Bookmark/Bookmark";

export const Content = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<List />} />
        {/* <Route path="free" element={<List setDetail={Detail} />} />
        <Route path="notice" element={<List setDetail={Detail} />} /> */}
        {/* <Route path="free/:seq" element={<Detail />} /> */}
        {/* <Route path="notice/:seq" element={<Detail />} /> */}

        <Route path="free" element={<List />} />
        <Route path="notice" element={<List />} />
        <Route path="detail" element={<Detail />} />

        <Route path="insert" element={<Insert />} />
        <Route path="myBoardList" element={<MyBoardList />} />
        <Route path="bookmark" element={<Bookmark />} />
      </Routes>
    </div>
  );
};
