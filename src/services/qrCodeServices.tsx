import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
import { QrCode } from "../model/QrCode";
 
 
    
export const qrCodeServices = { 
 
    newScheda, 
    modScheda,
    deleteScheda,
    getElenco,

 
    
     

};
 
 
 

async function   getElenco  (   ) 
{

    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/qrCode_elenco.php";   

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

async function   deleteScheda(id_qrcode:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/qrCode_scheda_mod.php";   
        const params = { id_qrcode : id_qrcode ,    action: "DEL_QRCODE"};
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

async function   newScheda(scheda:QrCode ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/qrCode_scheda_mod.php";   
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

         
        return {esito: responseData.data.esito , new_id: responseData.data.new_id, err_code: responseData.data.err_code};
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};
 



async function   modScheda(scheda:QrCode ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/qrCode_scheda_mod.php";   
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