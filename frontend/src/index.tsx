import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QuickstartProvider } from "./Context";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from './Context/AuthProvider'
import axios, {HeadersDefaults} from 'axios';
import './App.module.scss'

axios.defaults.baseURL ='https://webapi20220126203702.azurewebsites.net/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QuickstartProvider>
        <App />
      </QuickstartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
