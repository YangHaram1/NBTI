import styles from "./Content.module.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { List } from "./List/List";
import { Insert } from "./Insert/Insert";
import { Detail } from "./Detail/Detail";

export const Content = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="insert" element={<Insert />} />
        <Route path="detail" element={<Detail />} />
      </Routes>
    </div>
  );
};
