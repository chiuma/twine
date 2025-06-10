import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
import { Provenienza } from "../model/Provenienza";
 
 
    
export const provenienzeServices = { 
 
    newScheda, 
    modScheda,
    deleteScheda,
    getElenco
    
     

};

 
 
async function   getElenco  (   ) 
{

    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/provenienze_elenco.php";   

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

async function   deleteScheda(id_provenienza:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/provenienze_scheda_mod.php";   
        const params = { id_provenienza : id_provenienza,    action: "DEL_PROVENIENZA"};
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

async function   newScheda(scheda:Provenienza ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/provenienze_scheda_mod.php";   
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

         
        return {esito: responseData.data.esito , new_id: responseData.data.id_provenienza, err_code: responseData.data.err_code};
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};
 



async function   modScheda(scheda:Provenienza ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/provenienze_scheda_mod.php";   
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