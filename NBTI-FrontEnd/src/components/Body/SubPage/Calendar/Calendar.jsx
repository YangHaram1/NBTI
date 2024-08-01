import { useState } from 'react';
import styles from './Calendar.module.css'
import { Content } from './Content/Content';
import { Side } from './Side/Side';

export const Calendar = () => {
    
  const [addOpen, setAddOpen] = useState(false); //일정 모달 상태 
  const [calendarModalOpen, setCalendarModalOpen] = useState(false); // 추가 모달 상태

    return(
        <div className={styles.container}>
            <Side setAddOpen={setAddOpen} setCalendarModalOpen={setCalendarModalOpen} />
            <Content addOpen={addOpen} setAddOpen={setAddOpen} setCalendarModalOpen={setCalendarModalOpen} calendarModalOpen={calendarModalOpen}/>
        </div>
    )
};
