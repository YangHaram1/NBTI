import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styles from './Contant.module.css'
import { Wait } from './Wait/Wait'
import { Reject } from './Reject/Reject'
import { Approve } from './Approve/Approve'
export const Content = () => {
    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Wait/>}></Route>
                <Route path="wait" element={<Wait/>}></Route>
                <Route path="reject" element={<Reject/>}></Route>
                <Route path="approve" element={<Approve/>}></Route>
            </Routes>
        </div>
    )
}