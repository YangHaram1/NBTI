import { useState } from 'react';
import styles from './Calendar.module.css'
import { Content } from './Content/Content';
import { Side } from './Side/Side';

export const Calendar = () => {
    
  const [addOpen, setAddOpen] = useState(false);
    return(
        <div className={styles.container}>
            <Side setAddOpen={setAddOpen}/>
            <Content addOpen={addOpen} setAddOpen={setAddOpen} />
        </div>
    )
};
