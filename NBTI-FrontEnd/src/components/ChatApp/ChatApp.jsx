
import { Routes, Route, BrowserRouter as Router, Outlet, Link } from 'react-router-dom';

import Chat from './Chat/Chat';
import Home from './Home/Home';
import axios from 'axios';
import styles from './ChatApp.module.css';
import { ChatsContext } from '../../Context/ChatsContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useAuthStore } from './../../store/store';
axios.defaults.withCredentials = true;

const ChatApp = ({websocketRef,draggableRef}) => {
    const { chatAppRef,chatNavi,ws,setChatNavi,dragRef} = useContext(ChatsContext);
    const { loginID } = useAuthStore;
    ws.current=websocketRef.current;
   

    useEffect(()=>{
        if(loginID!==null){
          setChatNavi('chat1');
         
        }
    },[loginID])

    useEffect(()=>{
      if(draggableRef.current)
      dragRef.current=draggableRef.current;
    },[draggableRef])
 
    if(chatNavi===''){
      if(chatAppRef.current!=null)
      chatAppRef.current.style.display='none';
      
      if(dragRef.current)
        dragRef.current.style.display='none';
    }

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        // Esc 키가 눌렸을 때 실행될 코드
        console.log('Esc 키가 눌렸습니다!');
        setChatNavi('');
        // 여기서 원하는 동작을 수행
      }
    };
  
    useEffect(() => {
      // 컴포넌트가 마운트될 때 이벤트 리스너를 추가합니다.
      document.addEventListener('keydown', handleEscKey);
  
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }, []);
    return (
      

        <div className={styles.container} ref={chatAppRef}>
            {chatNavi==='home' && <Home/>}
            {chatNavi===('chat1') && <Chat/>}
            {chatNavi===('chat') && <Chat/>}
        </div>
    );

}

export default ChatApp;