import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from "./Main/Main";
import Adminindex from "./Admin/adminindex";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as serviceWorker from "./Admin/serviceWorker";
import {HelmetProvider} from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <HelmetProvider>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Main></Main>}></Route>
              <Route path='/adminindex/*' element={<Adminindex/>}>
              </Route>
          </Routes>
      </BrowserRouter>
      </HelmetProvider>
);
serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
