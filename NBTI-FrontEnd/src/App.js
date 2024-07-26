import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import axios from 'axios';
import { useAuthStore } from './store/store';
import { useEffect } from 'react';
axios.defaults.withCredentials=true;

function App() {
  const {setLoginID}=useAuthStore();
  useEffect(()=>{
    setLoginID(sessionStorage.getItem("loginID"));
  },[]) 

  return (
 
      <Router>
        <div className="container">
          <Header />
          <Body />
        </div>
      </Router>
   
  );
}

export default App;
