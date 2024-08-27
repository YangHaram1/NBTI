import './App.css';
import React, { useState, useEffect, useContext, useRef, } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import axios from 'axios';
import { useAuthStore, useMemberStore, useNotification, useCheckList } from './store/store';
import ChatApp from './components/ChatApp/ChatApp';
import { ChatsContext, ChatsProvider } from './Context/ChatsContext';
import { host } from './config/config';
import { Slide, ToastContainer } from 'react-toastify';
import styles from './App.module.css';
import Draggable from 'react-draggable';
import styleHome from './components/ChatApp/Home/Home.module.css';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'

axios.defaults.withCredentials = true;

function App() {
  const { loginID, setLoginID } = useAuthStore();
  const { setMembers } = useMemberStore();
  const websocketRef = useRef(null);
  const { maxCount, count } = useNotification();
  const { webSocketCheck, onMessage, chatController } = useCheckList();
  const [unread, setUnread] = useState();
  const draggableRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setLoginID(sessionStorage.getItem("loginID"));
    //console.log(setLoginID);
  }, []); // 의존성 배열에 setMembers 추가

  useEffect(() => {
    if (loginID !== null && loginID !== 'error') {
      axios.get(`${host}/members/selectAll`)
        .then((resp) => {
          const filteredMembers = resp.data.map(({ pw, ...rest }) => rest);
          setMembers(filteredMembers);
          //  console.log('Fetched Members:', filteredMembers);
        })
    }
  }, [loginID])

  //웹소켓 전체 관리
  useEffect(() => {
    if (loginID !== null && loginID !== 'error') {
      //const url = host.replace(/^https?:/, '')
      websocketRef.current = new WebSocket(`${host}/chatWebsocket`);
    }
    if (websocketRef.current != null) {
      websocketRef.current.onopen = () => {
        console.log('Connected to WebSocket');
      }
    }


    return () => {
      if (websocketRef.current != null) {
        websocketRef.current.close();
      }
    };
  }, [loginID, webSocketCheck]);

  useEffect(() => {
    if (loginID != null && loginID !== 'error') {
      axios.get(`${host}/chat/unread`).then((resp) => {
        if (resp.data !== 'error')
          setUnread(parseInt(resp.data));
      })
    }

  }, [onMessage, loginID, chatController])




  const chatApp = loginID != null && loginID !== 'error' ? (
    <ChatApp websocketRef={websocketRef} draggableRef={draggableRef} setDisabled={setDisabled} />
  ) : (
    <div></div>
  );


  return (
    <ChatsProvider>
      <Router>
        <div className="container">
          {(loginID != null && loginID !== 'error') && <Header />}
          <Routes>
            <Route path='/*' element={<Body />} />
          </Routes>
          {(loginID != null && loginID !== 'error') && <Draggable nodeRef={draggableRef} disabled={disabled}>
            <div className={styles.chatContainer} ref={draggableRef}>
              <ResizableBox
                width={350}
                height={500}
                minConstraints={[350, 500]}
                maxConstraints={[600, 650]}
                axis="both" 
                handleSize={[30, 30]} 
                resizeHandles={['se']}
              >
                  {chatApp}
              </ResizableBox>
            </div>

          </Draggable>}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          //pauseOnHover
          limit={maxCount}
          transition={Slide}
        />
      </Router>
      {(unread > 0 && (loginID !== null && loginID !== 'error')) && (<div className={styles.unread}>{unread}+</div>)}
    </ChatsProvider>
  );
}




export default App;
