import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import EmailConfirm from './components/EmailConfirm'
import ForgotPass from './components/Forgotpass';
import ChangePass from './components/ChangePass';

import LoginLayout from './layouts/LoginLayout'
import UserLayout from './layouts/UserLayout'
import ContextProvider from './components/Context';
import Posts from './components/Posts';
import Profile from './components/Profile'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ContextProvider>
      <BrowserRouter>
         <Routes>

               <Route element={<LoginLayout />}>
                  <Route path='/' element={<Login />}/>
                  <Route path='/register' element={<Register />}/>
                  <Route path='/emailconfirm/:token' element={<EmailConfirm />}/>
                  <Route path='/forgotpass' element={<ForgotPass />}/>
                  <Route path='/changepassword/:token' element={<ChangePass />}/>
            </Route>

            <Route element={<UserLayout />}>
               <Route path='/dashboard' element={<Posts />}/>
               <Route path='/profile' element={<Profile />}/>
            </Route>


         </Routes>
         <App />
      </BrowserRouter>
  </ContextProvider>
);