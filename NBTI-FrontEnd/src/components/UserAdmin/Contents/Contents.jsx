import styles from './Contents.module.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup/Signup';


export const Contents = () => {
  return (
    <div className={styles.container}>
      <Routes>
        
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
