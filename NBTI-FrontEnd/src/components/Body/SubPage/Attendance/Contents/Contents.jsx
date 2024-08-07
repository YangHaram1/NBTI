import { MyAttendance } from "./MyAttendance/MyAttendance";
import { MonthlyStats } from "./MonthAttendance/MonthlyStats";
import { Routes, Route } from 'react-router-dom';
import styles from './Contents.module.css'
export const Contents =() => {
    return (
        <div className={styles.container} >
                  <Routes>
      <Route path='myattendance' element={<MyAttendance  />} />
       <Route path="monthlystats" element={<MonthlyStats/>}></Route>
      </Routes>
        </div>
    );
}