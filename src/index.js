import React from "react";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {HelmetProvider} from 'react-helmet-async';
//
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./member/store/auth-context.tsx";
import App from "./App";

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
