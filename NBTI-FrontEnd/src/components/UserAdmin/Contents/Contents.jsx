import styles from './Contents.module.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import UserList from './UserList/UserList';

export const Contents = () => {
  return (
    <div className={styles.container}>
      <Routes>
      <Route path='/userlist' element={<UserList/>}></Route>
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
