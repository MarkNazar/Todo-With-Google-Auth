import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <div className=''>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
