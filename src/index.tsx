import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 
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

 