import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.137:8088/api/'
axios.defaults.headers.common['Authorization']= 'Bearer ' + localStorage.getItem('token')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
