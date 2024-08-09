import styles from './Contents.module.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import UserList from './UserList/UserList';
import UserDetail from './UserDetail/UserDetail';
import { useState } from 'react';
import Security from '../../Security/Security';
import { AdminQnA } from './AdminQnA/AdminQnA';

export const Contents = () => {
  const [userDetail, setUserDetail] = useState();
  return (
    <div className={styles.container}>
      <Routes>
        <Route path='/useradmin' element={<UserList setUserDetail={setUserDetail} />} />
        <Route path='signup' element={<Signup />} />
        <Route path='userlist' element={<UserList setUserDetail={setUserDetail} />} />
        <Route path='userdetail/:id' element={<UserDetail />} />
        <Route path='security' element={<Security />} />
        <Route path='adminQnA' element={<AdminQnA />} />
      </Routes>
    </div>
  );
};
