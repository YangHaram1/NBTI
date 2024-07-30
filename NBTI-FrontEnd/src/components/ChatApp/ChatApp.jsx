
import { Routes, Route, BrowserRouter as Router, Outlet, Link } from 'react-router-dom';

import Chat from './Chat/Chat';
import Home from './Home/Home';
import axios from 'axios';
import styles from './ChatApp.module.css';
import { ChatsContext } from '../../Context/ChatsContext';
import { useContext } from 'react';
axios.defaults.withCredentials = true;

const ChatApp = () => {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else if (permission === "denied") {
            console.log("Notification permission denied.");
          } else {
            console.log("Notification permission default.");
          }
        });
      }
    //   <Outlet />
    const { chatAppRef,chatNavi} = useContext(ChatsContext);
    if(chatNavi===''){
        return false;
    }
    return (
      

        <div className={styles.container} ref={chatAppRef}>
            {chatNavi==='home' && <Home/>}
            {chatNavi==='chat' && <Chat/>}
        </div>
    );

}

export default ChatApp;