import { Cliente } from "../model/Cliente";

    
export const clientiActions = {
 
    newCliente,
    modCliente,
    delCliente,
    elencoClienti,
    showCliente  
     
};
 

function   delCliente (id_cliente: Number) {
   
     return async dispatch => 
     {
        dispatch({
            type: "CLIENTI_DEL",
            id_cliente: id_cliente  
        })  ;
         
    };

} 

 


function   showCliente (scheda: Cliente) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "CLIENTI_SHOW_MODAL",
            cliente_show: scheda  
        })  ;
         
    };

} 

function   elencoClienti (elenco: Cliente[]) {
    
     return async dispatch => 
     {
        dispatch({
            type: "CLIENTI_ELENCO",
            elenco: elenco  
        })  ;
         
    };

} 

function   modCliente (scheda: Cliente) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "CLIENTI_MOD",
            scheda: scheda  
        })  ;
         
    };

} 


function   newCliente (scheda: Cliente) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "CLIENTI_NEW",
            scheda: scheda  
        })  ;
         
    };

} 