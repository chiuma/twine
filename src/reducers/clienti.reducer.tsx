import { Cliente } from "../model/Cliente";

 
 

export interface IClientiState {
  readonly elenco_clienti: Cliente[], 
  readonly cliente_show: Cliente |null, 
}

export const initialClientiState: IClientiState = {
  
    elenco_clienti: [], 
    cliente_show : null

};

 
 
export function clientiReducer(state = initialClientiState, action) {
 
   let idx = -1;

//  console.log("reducer - authentication", action.type )
// console.log("action", action)
  switch (action.type) {
    case "CLIENTI_SHOW_MODAL": 
     

      return {
        ...state, 
        cliente_show:   action.cliente_show ,   
      };  
      
    case "CLIENTI_ELENCO": 
     
    
      return {
        ...state, 
        elenco_clienti:   action.elenco ,   
      };  


    case "CLIENTI_DEL":
      idx =   state.elenco_clienti.findIndex( (x :any) => x.id_cliente === action.id_cliente);
 
     
      if ( idx !== -1)
        return {      ...state,     elenco_clienti: [ ...state.elenco_clienti.slice(0, idx),    ...state.elenco_clienti.slice(idx+ 1) ]     }     
      else
        return {...state }
  
    case "CLIENTI_NEW":
      
 
       let new_elenco_add = [ new Cliente(action.scheda ), ...state.elenco_clienti];
       

       return {
         ...state, 
         elenco_clienti:   new_elenco_add ,   
       };   

    
    case "CLIENTI_MOD":
         
          idx = state.elenco_clienti.findIndex( (x :any) => x.id_cliente === action.scheda.id_cliente);
          
          action.scheda.id_cliente = state.elenco_clienti[idx].id_cliente;

          let new_elenco = [...state.elenco_clienti];

          new_elenco[idx] =  Object.assign(  new Cliente(),  action.scheda  )

          return {
            ...state, 
            elenco_clienti:   new_elenco ,   
          };   
          
          
 
    
 
    default:
      return state
  }
}