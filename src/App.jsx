import './App.css'
import React from 'react'; 
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function LangWrapper() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default LangWrapper;
