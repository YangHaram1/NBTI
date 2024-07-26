import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';

function App() {
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
