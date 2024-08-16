import { useState } from 'react';
import styles from './Calendar.module.css'
import { Content } from './Content/Content';
import { Side } from './Side/Side';

export const Calendar = () => {
    
    //일정 모달 상태 
    const [addOpen, setAddOpen] = useState(false); 
    // 사이드바 "공유일정" 추가 모달 상태
    const [calendarModalOpen, setCalendarModalOpen] = useState(false); 


    return(
        <div className={styles.container}>
            <Side setAddOpen={setAddOpen} setCalendarModalOpen={setCalendarModalOpen} calendarModalOpen={calendarModalOpen}/>
            <Content addOpen={addOpen} setAddOpen={setAddOpen} setCalendarModalOpen={setCalendarModalOpen} calendarModalOpen={calendarModalOpen}/>
        </div>
    )
};
