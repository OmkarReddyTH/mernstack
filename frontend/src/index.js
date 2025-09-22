import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import SocialSuccess from './pages/SocialSuccess';
import ProtectedPage from './pages/ProtectedPage';

function App(){ 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/reset' element={<Reset/>} />
        <Route path='/social-success' element={<SocialSuccess/>} />
        <Route path='/protected' element={<ProtectedPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App/>);
