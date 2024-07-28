import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styles from "./Content.module.css";
import { Detail } from "./Detail/Detail";


export const Content = ({addOpen, setAddOpen}) => {
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Detail addOpen={addOpen} setAddOpen={setAddOpen}/>}></Route>
            </Routes>
        </div>
    )
}