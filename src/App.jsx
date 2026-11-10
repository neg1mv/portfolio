import './App.css'
import React from 'react'; 
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n.jsx';

function LangWrapper() {

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </LanguageProvider>
  );
}

export default LangWrapper;
