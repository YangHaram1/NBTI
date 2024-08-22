import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styles from "./Content.module.css";
import { Detail } from "./Detail/Detail";


export const Content = ({addOpen, setAddOpen, calendarModalOpen, setCalendarModalOpen}) => {
    
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Detail addOpen={addOpen} setAddOpen={setAddOpen} calendarModalOpen={calendarModalOpen} setCalendarModalOpen={setCalendarModalOpen}/>}></Route>
            </Routes>
        </div>
    )
}