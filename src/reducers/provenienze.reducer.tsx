import { Provenienza } from "../model/Provenienza";

 
 

export interface IProvenienzeState {
  readonly elenco_provenienze: Provenienza[], 
  readonly provenienza_show: Provenienza |null, 
}

export const initialProvenienzeState: IProvenienzeState = {
  
    elenco_provenienze: [], 
    provenienza_show : null

};

 
 
export function provenienzeReducer(state = initialProvenienzeState, action) {
 
   let idx = -1;

//  console.log("reducer - authentication", action.type )
// console.log("action", action)
  switch (action.type) {
    case "PROVENIENZE_SHOW_MODAL": 
     

      return {
        ...state, 
        provenienza_show:   action.provenienza_show ,   
      };  
      
    case "PROVENIENZE_ELENCO": 
     
 
      return {
        ...state, 
        elenco_provenienze:   action.elenco ,   
      };  


    case "PROVENIENZE_DEL":
      idx =   state.elenco_provenienze.findIndex( (x :any) => x.id_provenienza === action.id_provenienza);
 
     
      if ( idx !== -1)
        return {      ...state,     elenco_provenienze: [ ...state.elenco_provenienze.slice(0, idx),    ...state.elenco_provenienze.slice(idx+ 1) ]     }     
      else
        return {...state }
  
    case "PROVENIENZE_NEW":
      
 
       let new_elenco_add = [ new Provenienza(action.scheda ), ...state.elenco_provenienze];
       

       return {
         ...state, 
         elenco_provenienze:   new_elenco_add ,   
       };   

    
    case "PROVENIENZE_MOD":
         
          idx = state.elenco_provenienze.findIndex( (x :any) => x.id_provenienza === action.scheda.id_provenienza);
          
          action.scheda.id_provenienza = state.elenco_provenienze[idx].id_provenienza;

          let new_elenco = [...state.elenco_provenienze];

          new_elenco[idx] =  Object.assign( new Provenienza(),  action.scheda  )

          return {
            ...state, 
            elenco_provenienze:   new_elenco ,   
          };   
          
          
 
    
 
    default:
      return state
  }
}