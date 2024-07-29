import { Mypage } from "../Mypage/Mypage";
import styles from "./Body.module.css";
import { Main } from "./Main/Main";
import { SubPage } from "./SubPage/SubPage";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

export const Body = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="mypage/*" element={<Mypage/>} />
      </Routes>
      <SubPage />
    </div>
  );
};
