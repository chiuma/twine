import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
 
 
 
 
    
export const  ordiniServices = { 
 
  
    modScheda,
    deleteScheda,
    getElenco, 
    deleteOrdine,
    addDettaglio
     
    
     

};

 

async function   addDettaglio(scheda:any ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/ordini_scheda_mod.php";   
        const params = { scheda : scheda ,    action: "ORDINE_DETTAGLIO_ADD" };
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
 
        
        return {esito: responseData.data.esito , err_code: responseData.data.err_code,
            scheda: responseData.data.scheda, 
        };
         

    } 
    catch(error) 
    {
        console.log("**** error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};

async function   getElenco  (   data_consegna_dal , data_consegna_al  ) 
{

    try {
  
        const sUrl = ConstantUtils.url.SERVER_URL + "/ordini_elenco.php";   
        const params = {  username: sessionStorage.getItem("username"),  data_consegna_dal : data_consegna_dal  , data_consegna_al: data_consegna_al};
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
             
        };

       
        
        let responseData = await  axios.post(sUrl, JSON.stringify(params),   config   )  
 
        return { esito:  responseData.data.esito, elenco:  responseData.data.elenco , err_code: responseData.data.err_code};
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}

async function   deleteOrdine(id_ordine:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/ordini_scheda_mod.php";   
        const params = { id_ordine : id_ordine ,    action: "DEL_ORDINE"};
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


async function   deleteScheda(id_ordine_dettaglio:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/ordini_scheda_mod.php";   
        const params = { id_ordine_dettaglio : id_ordine_dettaglio ,    action: "DEL_ORDINE_DETTAGLIO"};
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

 



async function   modScheda(scheda:any ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/ordini_scheda_mod.php";   
        const params = { scheda : scheda,     action: "MOD_ORDINE"};
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
 
        
        return {esito: responseData.data.esito , err_code: responseData.data.err_code,
            dettagli: responseData.data.dettagli,
            testata: responseData.data.testata
        };
         

    } 
    catch(error) 
    {
        console.log("**** error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};