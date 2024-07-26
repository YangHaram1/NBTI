import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import axios from 'axios';
import { useAuthStore } from './store/store';
import { useEffect, useContext } from 'react';
import ChatApp from './components/ChatApp/ChatApp';
import { ChatsProvider } from './Context/ChatsContext';
axios.defaults.withCredentials = true;

function App() {
  const { setLoginID } = useAuthStore();


  useEffect(() => {
    setLoginID(sessionStorage.getItem("loginID"));
  }, [])

  return (
    <ChatsProvider>
      <Router>
        <div className="container">
          <Header />
          <Body />
          <ChatApp></ChatApp>
        </div>
      </Router>
      
    </ChatsProvider>
  );
}

export default App;
