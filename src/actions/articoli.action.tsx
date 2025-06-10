import { Articolo } from "../model/Articolo";
 
   
export const articoliActions = { 
    newArticolo,
    modArticolo,
    delArticolo,
    elencoArticoli,
    showArticolo  ,     
};
  

function   delArticolo (id_articolo_base: Number) {
   
     return async dispatch => 
     {
        dispatch({
            type: "ARTICOLI_DEL",
            id_articolo_base: id_articolo_base  
        })  ;
         
    };

} 

function   showArticolo (scheda: Articolo) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "ARTICOLI_SHOW_MODAL",
            articolo_show: scheda  
        })  ;
         
    };

} 

function   elencoArticoli (elenco: Articolo[]) {
    
     return async dispatch => 
     {
        dispatch({
            type: "ARTICOLI_ELENCO",
            elenco: elenco  
        })  ;
         
    };

} 

function   modArticolo (scheda: Articolo) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "ARTICOLI_MOD",
            scheda: scheda  
        })  ;
         
    };

} 


function   newArticolo (scheda: Articolo) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "ARTICOLI_NEW",
            scheda: scheda  
        })  ;
         
    };

} 