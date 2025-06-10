import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'; 
 

import  { App  }  from './App';
import { store } from './reducers/store';
import history from './history';
import {HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    
      <Helmet>
        <title>{ "TWINE" }</title> 
        <link rel="icon" href="/img/favicon.ico"/>
      </Helmet>
      <Provider store={store} >
        <HashRouter history={history}>
           <App />
        </HashRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
