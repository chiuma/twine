import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
import { Colore } from "../model/Colore";
 
 
    
export const coloriServices = { 
 
    newScheda, 
    modScheda,
    deleteScheda,
    getElenco
    
     

};

 
 
async function   getElenco  (   ) 
{

    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/colori_elenco.php";   

        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
             
        };

       
        
        let responseData = await  axios.post(sUrl,null,   config   )  
 
        return {esito:  responseData.data.esito, elenco:  responseData.data.elenco , err_code: responseData.data.err_code};
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}

async function   deleteScheda(id_colore:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/colori_scheda_mod.php";   
        const params = { id_colore : id_colore,    action: "DEL_COLORE"};
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
        };

 
        let responseData = await  axios.post(sUrl,
            JSON.stringify(params),
            config
        )  

         
        return {esito: responseData.data.esito , err_code: responseData.data.err_code };
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};

async function   newScheda(scheda:Colore ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/colori_scheda_mod.php";   
        const params = { scheda : scheda};
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
        };

 
        let responseData = await  axios.post(sUrl,
            JSON.stringify(params),
            config
        )  

         
        return {esito: responseData.data.esito , new_id: responseData.data.id_colore, err_code: responseData.data.err_code};
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};
 



async function   modScheda(scheda:Colore ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/colori_scheda_mod.php";   
        const params = { scheda : scheda};
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
        };

 
        let responseData = await  axios.post(sUrl,
            JSON.stringify(params),
            config
        )  
 
      
        return {esito: responseData.data.esito , err_code: responseData.data.err_code };
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};