import { MyAttendance } from "./MyAttendance/MyAttendance";
import { MonthlyStats } from "./MonthAttendance/MonthlyStats";

import { Routes, Route } from 'react-router-dom';
import styles from './Contents.module.css'
import { AllAttendance } from "./AllAttendance/AllAttendance";
export const Contents =() => {
    return (
        <div className={styles.container} >
                  <Routes>
        <Route path="/" element={<MyAttendance/>}></Route>
      <Route path='myattendance' element={<MyAttendance  />} />
       <Route path="monthlystats" element={<MonthlyStats/>}></Route>
       <Route path="allattendance" element={<AllAttendance/>}></Route>
      </Routes>
        </div>
    );
}