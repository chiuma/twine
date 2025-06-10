import { Colore } from "../model/Colore";

 
 

export interface IColoriState {
  readonly elenco_colori: Colore[], 
  readonly colore_show: Colore |null, 
}

export const initialColoriState: IColoriState = {
  
    elenco_colori: [], 
    colore_show : null

};

 
 
export function coloriReducer(state = initialColoriState, action) {
 
   let idx = -1;

//  console.log("reducer - authentication", action.type )
// console.log("action", action)
  switch (action.type) {
    case "COLORI_SHOW_MODAL": 
     

      return {
        ...state, 
        colore_show:   action.colore_show ,   
      };  
      
    case "COLORI_ELENCO": 
     
 
      return {
        ...state, 
        elenco_colori:   action.elenco ,   
      };  


    case "COLORI_DEL":
      idx =   state.elenco_colori.findIndex( (x :any) => x.id_colore === action.id_colore);
 
     
      if ( idx !== -1)
        return {      ...state,     elenco_colori: [ ...state.elenco_colori.slice(0, idx),    ...state.elenco_colori.slice(idx+ 1) ]     }     
      else
        return {...state }
  
    case "COLORI_NEW":
      
 
       let new_elenco_add = [ new Colore(action.scheda ), ...state.elenco_colori];
       

       return {
         ...state, 
         elenco_colori:   new_elenco_add ,   
       };   

    
    case "COLORI_MOD":
         
          idx = state.elenco_colori.findIndex( (x :any) => x.id_colore === action.scheda.id_colore);
          
          action.scheda.id_colore = state.elenco_colori[idx].id_colore;

          let new_elenco = [...state.elenco_colori];

          new_elenco[idx] =  Object.assign( new Colore(),  action.scheda  )

          return {
            ...state, 
            elenco_colori:   new_elenco ,   
          };   
          
          
 
    
 
    default:
      return state
  }
}