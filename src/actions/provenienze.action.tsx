import { Provenienza } from "../model/Provenienza";

    
export const provenienzeActions = {
 
    newProvenienza,
    modProvenienza,
    delProvenienza,
    elencoProvenienze,
    showProvenienza  
     
};
 

function   delProvenienza (id_provenienza: Number) {
   
     return async dispatch => 
     {
        dispatch({
            type: "PROVENIENZE_DEL",
            id_provenienza: id_provenienza  
        })  ;
         
    };

} 

function   showProvenienza (scheda: Provenienza) {
     
     return async dispatch => 
     {
        dispatch({
            type: "PROVENIENZE_SHOW_MODAL",
            provenienza_show: scheda  
        })  ;
         
    };

} 

function   elencoProvenienze (elenco: Provenienza[]) {
    
     return async dispatch => 
     {
        dispatch({
            type: "PROVENIENZE_ELENCO",
            elenco: elenco  
        })  ;
         
    };

} 

function   modProvenienza (scheda: Provenienza) {
    // console.log ( "action - modOrdine - start" )
     return async dispatch => 
     {
        dispatch({
            type: "PROVENIENZE_MOD",
            scheda: scheda  
        })  ;
         
    };

} 


function   newProvenienza (scheda: Provenienza) {
    
     return async dispatch => 
     {
        dispatch({
            type: "PROVENIENZE_NEW",
            scheda: scheda  
        })  ;
         
    };

} 