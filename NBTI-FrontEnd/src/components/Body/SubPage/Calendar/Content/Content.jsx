import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styles from "./Content.module.css";
import { Detail } from "./Detail/Detail";


export const Content = () => {
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Detail/>}></Route>
            </Routes>
        </div>
    )
}