 
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer  from '../reducers';
import  { initialState } from '../reducers';
import { applyMiddleware,  createStore } from 'redux';
const loggerMiddleware = createLogger();


export const store  = createStore(
    rootReducer, 
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
   
    )
);
 
 