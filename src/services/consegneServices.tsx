import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
    
export const  consegneServices = { 
    modScheda,
    deleteScheda,
    getElenco, 
    getScheda,
    getGrafico,
    getFatturaXml,
    hideScheda

};

async function   getScheda (  id_consegna:number, id_cliente:number  ) 
{

    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/consegne_scheda_get.php";   
        const params = { id_consegna : id_consegna , id_cliente: id_cliente };
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
 
        return {esito:  responseData.data.esito, scheda:  responseData.data.scheda , err_code: responseData.data.err_code};
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}


async function   getFatturaXml  ( id_consegna  ) 
{

    try {
        const params = {  id_consegna: id_consegna};
        const sUrl = ConstantUtils.url.SERVER_URL + "/export_fattura.php";   

        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token'),
            responseType: 'blob'
            }
             
        };
 
       
        
        let responseData = await  axios.post(sUrl,   JSON.stringify(params),   config   )  
        const url = window.URL.createObjectURL(new Blob([responseData.data]));
        let esito = ""; let err_code = "";
        if ( responseData.data === "001" || responseData.data === "002"  )
        {
            err_code = responseData.data; esito = "NOT_OK";
        }
        else
        {
            esito = "OK";
           // console.log("responseData.data", responseData.data)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fattura' + '_' + id_consegna + '.xml'); //or any other extension
            document.body.appendChild(link);
            link.click();
        }

        return  {esito: esito, err_code: err_code };;
         
 
    } 
    catch(error) 
    {
        
        return   {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}





async function   getGrafico  (  filtri:any ) 
{

    try {
        
        const sUrl = ConstantUtils.url.SERVER_URL + "/grafici.php";   
        const params = { filtri : filtri };
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
             
        };

       
        
        let responseData = await  axios.post(sUrl,   JSON.stringify(params),   config   )  
 
        return {esito:  responseData.data.esito, 
            elenco_consegne_annomese:  responseData.data.elenco_consegne_annomese ,
            elenco_consegne_articoli_annomese:  responseData.data.elenco_consegne_articoli_annomese ,
            elenco_consegne_clienti_annomese:  responseData.data.elenco_consegne_clienti_annomese ,
            elenco_consegne_cliente: responseData.data.elenco_consegne_cliente,
            elenco_consegne_articoli: responseData.data.elenco_consegne_articoli,
             err_code: responseData.data.err_code};
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}

async function   getElenco  (  id_cliente :number | null ,  data_consegna_effettuata_dal , data_consegna_effettuata_al ) 
{

    try {
        const params = {username: sessionStorage.getItem("username"),  id_cliente : id_cliente ,data_consegna_effettuata_dal: data_consegna_effettuata_dal ,  data_consegna_effettuata_al: data_consegna_effettuata_al};
        const sUrl = ConstantUtils.url.SERVER_URL + "/consegne_elenco.php";   

        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
             
        };

       
        
        let responseData = await  axios.post(sUrl,   JSON.stringify(params),   config   )  
 
        return {esito:  responseData.data.esito, elenco:  responseData.data.elenco , err_code: responseData.data.err_code};
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}

async function   deleteScheda(id_consegna:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/consegne_scheda_mod.php";   
        const params = { id_consegna : id_consegna ,    action: "DEL_CONSEGNA"};
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

 
async function   hideScheda(id_consegna:number  ) 
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/consegne_scheda_mod.php";   
        const params = { id_consegna : id_consegna ,    action: "HIDE_CONSEGNA"};
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
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/consegne_scheda_mod.php";   
        const params = { scheda : scheda,     action: "MOD_CONSEGNA"};
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
 
     // console.log("responseData.data", responseData.data)
        return {esito: responseData.data.esito , err_code: responseData.data.err_code,
            scheda: responseData.data.scheda
        };
         

    } 
    catch(error) 
    {
        console.log("error", error);
        return {esito: 'NOT_OK',  err_code: "002"};
      
    }

      
};