import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
import { Cliente } from "../model/Cliente";
 
 
    
export const clientiServices = { 
 
    newScheda, 
    modScheda,
    deleteScheda,
    getElenco
    
     

};

 
 
async function   getElenco  (   ) 
{

    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/clienti_elenco.php";   

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

async function   deleteScheda(id_cliente:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/clienti_scheda_mod.php";   
        const params = { id_cliente : id_cliente,    action: "DEL_CLIENTE"};
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

async function   newScheda(scheda:Cliente ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/clienti_scheda_mod.php";   
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

         
        return {esito: responseData.data.esito , new_id: responseData.data.id_cliente, err_code: responseData.data.err_code};
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};
 



async function   modScheda(scheda:Cliente ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/clienti_scheda_mod.php";   
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