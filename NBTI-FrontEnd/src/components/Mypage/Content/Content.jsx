import styles from "./Content.module.css";
import { Routes, Route } from "react-router-dom";
import { Security } from "./Security/Security";
import { Profile } from "./Profile/Profile";
import { QnA } from "./QnA/QnA";
import { QnAList } from "./QnAList/QnAList";
import { BookmarkQnA } from "./BookmarkQnA/BookmarkQnA";
import { QnADetail } from "./QnADetail/QnADetail";

export const Content = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="security/*" element={<Security />} />
        <Route path="qna/*" element={<QnA />} />
        <Route path="qnaList" element={<QnAList setQnADetail={QnADetail} />} />
        <Route path="qnaList/:seq" element={<QnADetail />} />
        <Route path="bookmarkQnA" element={<BookmarkQnA />} />
      </Routes>
    </div>
  );
};
