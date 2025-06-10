import { Colore } from "../model/Colore";

    
export const coloriActions = {
 
    newColore,
    modColore,
    delColore,
    elencoColori,
    showColore  
     
};
 

function   delColore (id_colore: Number) {
   
     return async dispatch => 
     {
        dispatch({
            type: "COLORI_DEL",
            id_colore: id_colore  
        })  ;
         
    };

} 

 


function   showColore (scheda: Colore) {
     
     return async dispatch => 
     {
        dispatch({
            type: "COLORI_SHOW_MODAL",
            colore_show: scheda  
        })  ;
         
    };

} 

function   elencoColori (elenco: Colore[]) {
    
     return async dispatch => 
     {
        dispatch({
            type: "COLORI_ELENCO",
            elenco: elenco  
        })  ;
         
    };

} 

function   modColore (scheda: Colore) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "COLORI_MOD",
            scheda: scheda  
        })  ;
         
    };

} 


function   newColore (scheda: Colore) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "COLORI_NEW",
            scheda: scheda  
        })  ;
         
    };

} 