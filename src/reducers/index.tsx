import { combineReducers } from 'redux';
 
 
import { clientiReducer, initialClientiState } from './clienti.reducer';
import { coloriReducer, initialColoriState } from './colori.reducer';
import { articoliReducer, initialArticoliState } from './articoli.reducer';

import { provenienzeReducer  } from './provenienze.reducer';
export const initialState = {
 
  clientiReducer: initialClientiState,
  coloriReducer: initialColoriState,
  articoliReducer: initialArticoliState,
}

const rootReducer = combineReducers({
 
  clientiReducer: clientiReducer,
  coloriReducer: coloriReducer,
  articoliReducer: articoliReducer,
  provenienzeReducer: provenienzeReducer,
}); 

export default rootReducer;

