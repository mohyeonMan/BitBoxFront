import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
//
import Main from './Main/Main';
import Adminindex from './adminindex'
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./member/store/auth-context.tsx";
import App from "./App";
import Member from "./member/Member";
import JoinForm from "./member/JoinForm";
import LoginForm from "./member/LoginForm";
import AuthPopUpPage from "./member/memberComponents/AuthPopUpPage";
import Test from "./Admin/test";
import Calendar from "./user/Calendar";
import Get from "./user/Get";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <AuthContextProvider>
      <HelmetProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </HelmetProvider>
    </AuthContextProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
