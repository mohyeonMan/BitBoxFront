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
import Calendar from "./user/Calendar";
import Get from "./user/Get";
import WriteForm from "./component/store/WriteForm";
import List from "./component/store/List";
import View from "./component/store/View";
import StoreLoginForm from "./component/store/StoreLoginForm";
import StoreCart from "./component/store/StoreCart";
import StorePayment from "./component/store/StorePayment";
import PayComplete from "./component/store/PayComplete";
import StorePay from "./component/store/StorePay";

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
          <Route  path='/asd' element={<Test/>}/>
          <Route path="/user/calendar" element={<Calendar/>} />
          <Route path="/user/get/:selectedDate/:movieName/:cityName/:cinemaName/:time/:theater/:pk" element={<Get/>} />


          {/* store */}
          <Route path='/store/writeForm' element={<WriteForm/>}></Route>
          <Route path='/store/*' element={<List/>}></Route>
          <Route path='/store/view/:store_seq' element={<View/>}></Route>
          <Route path='/store/loginForm' element={<StoreLoginForm/>}></Route>
          <Route path='/store/cart' element={<StoreCart/>}></Route>
          <Route path='/store/pay/:store_seq' element={<StorePayment/>}></Route>
          <Route path='/store/paycomplete/:orderNumber' element={<PayComplete/>}></Route>
          <Route path='/store/pay' element={<StorePay/>}></Route>
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
