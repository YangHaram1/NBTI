import { Approval } from "./Approval/Approval";
import { Attendance } from './Attendance/Attendance';
import { Board } from "./Board/Board";
import { Calendar } from "./Calendar/Calendar";
import Group from "./Group/Group";
import { Reservation } from "./Reservation/Reservation"
import styles from "./SubPage.module.css";
import { Routes, Route } from "react-router-dom";


export const SubPage = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.blank}></div> */}
      <Routes>
        <Route path="/board/*" element={<Board />} />
        <Route path="/calendar/*" element={<Calendar  />} />
        <Route path="/reservation/*" element={<Reservation  />} />
        {<Route path="/group" element={<Group/>} />}
        <Route path="/approval/*" element={<Approval  />} />
        {/* <Route path="/approval" element={<Approval  />} /> */}
        <Route path="/attendance/*" element={<Attendance />} />
      </Routes>
    </div>
  );
};
