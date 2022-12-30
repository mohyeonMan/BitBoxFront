import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
//
import Main from './Main/Main';
import Adminindex from './adminindex'
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import Member from "./member/Member";
import JoinForm from "./member/JoinForm";
import LoginForm from "./member/LoginForm";
import AuthPopUpPage from "./member/memberComponents/AuthPopUpPage";
import Test from "./Admin/test";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/adminindex/*' element={<Adminindex/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/member' element={<Member/>}/>
          <Route path='/member/joinForm' element={<JoinForm/>}/>
          <Route path='/member/loginForm' element={<LoginForm/>}/>
          <Route path='/member/memberComponents/AuthPopUpPage' element={<AuthPopUpPage/>}/>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
