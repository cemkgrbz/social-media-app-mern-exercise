import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import EmailConfirm from './components/EmailConfirm'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>        
        <Route path='/emailconfirm/:token' element={<EmailConfirm />}/>
     </Routes>
     <App />
  </BrowserRouter>
);