import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styles from "./Content.module.css";
import { List } from "./List/List";
import { MeetingRoom } from "./MeetingRoom/MeetingRoom";
import { Supplies } from "./Supplies/Supplies";
import { Car } from "./Car/Car";
import { Manager } from "./Manager/Manager";
import { useReservationList } from "../../../../../store/store";


export const Content = () => {
    const { modalOpen , setModalOpen } = useReservationList(); // 주스탠드 상태 가져오기

    return(
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<List/>}></Route>
                <Route path="list" element={<List/>}></Route>
                <Route path="meetingRoom" element={<MeetingRoom modalOpen={modalOpen} setModalOpen={setModalOpen}/>}></Route>
                <Route path="supplies" element={<Supplies modalOpen={modalOpen} setModalOpen={setModalOpen}/>}></Route>
                <Route path="car" element={<Car modalOpen={modalOpen} setModalOpen={setModalOpen}/>}></Route>
                <Route path="manager/*" element={<Manager/>}></Route>
            </Routes>
        </div>
    )
}