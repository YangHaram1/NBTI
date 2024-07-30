import styles from './Contents.module.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import UserList from './UserList/UserList';
import UserUpdate from './UserUpdate/UserUpdate';
import { useState } from 'react';

export const Contents = () => {
  const [userDetail,setUserDetail] =useState();
  return (
    <div className={styles.container}>
      <Routes>
      <Route path='/useradmin' element={<UserList setUserDetail={setUserDetail} />} />
                <Route path='signup' element={<Signup />} />
                <Route path='userlist' element={<UserList setUserDetail={setUserDetail} />} />
                <Route path='userupdate/:id' element={<UserUpdate />} />
      </Routes>
    </div>
  );
};
