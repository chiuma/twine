 
import { Articolo } from "../model/Articolo";
 

 
 

export interface IArticoliState {
  readonly elenco_articoli: Articolo[], 
  readonly articolo_show: Articolo |null, 
}

export const initialArticoliState: IArticoliState = {
  
    elenco_articoli: [], 
    articolo_show : null

};

 
 
export function articoliReducer(state = initialArticoliState, action) {
 
   let idx = -1;

//  console.log("reducer - authentication", action.type )
// console.log("action", action)
  switch (action.type) {

      

 

    case "ARTICOLI_SHOW_MODAL": 
     

      return {
        ...state, 
        articolo_show:   action.articolo_show ,   
      };  
      
    case "ARTICOLI_ELENCO": 
     
    
      return {
        ...state, 
        elenco_articoli:   action.elenco.map(x => 
          {
              let art =  new Articolo(x); 
              return  art
          }
         ) ,   
      };  


    case "ARTICOLI_DEL":
   
      idx =   state.elenco_articoli.findIndex( (x :any) => x.id_articolo_base === action.id_articolo_base);
 
     
      if ( idx !== -1)
        return {      ...state,     elenco_articoli: [ ...state.elenco_articoli.slice(0, idx),    ...state.elenco_articoli.slice(idx+ 1) ]     }     
      else
        return {...state }
  
    case "ARTICOLI_NEW":
      

       let new_elenco_add = [ new Articolo(action.scheda ), ...state.elenco_articoli];
       

       return {
         ...state, 
         elenco_articoli:   new_elenco_add ,   
       };   

    
    case "ARTICOLI_MOD":
         
          idx = state.elenco_articoli.findIndex( (x :any) => x.id_articolo_base === action.scheda.id_articolo_base);
          
          action.scheda.id_articolo_base = state.elenco_articoli[idx].id_articolo_base;

          let new_elenco = [...state.elenco_articoli];

          new_elenco[idx] =  Object.assign( new Articolo(),  action.scheda  )

          return {
            ...state, 
            elenco_articoli:   new_elenco ,   
          };   
          
          
 
    
 
    default:
      return state
  }
}