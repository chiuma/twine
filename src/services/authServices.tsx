import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
 
 
 
    
export const authServices = { 
 
    login,
    logout,
    changePassword,
     

};


async function   changePassword (   username:string, password:string, new_password:string, ) 
{

    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/login.php";   

       
        const params = { username : username, password : password, new_password:new_password, 
                        action:"CHANGE_PWD" };
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
             
        };

       
        
        let responseData = await  axios.post(sUrl,params,   config   )  

        if ( responseData.data.esito === "OK"   )
        {
             
        } 
        // OFFLINE
       //   responseData.data.esito = "OK" 
        
        return  responseData.data ;
   
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK', error: error, err_code: '002'};
    }

}

function logout()
{

}

async function   login (username,    password, count) 
{
    try {
        const sUrl = ConstantUtils.url.SERVER_URL + "/login.php";

         
        const params = {action:'LOGIN', username : username,  password: password , count:count};
        const config = {
            headers: {
            'Content-type': 'application/json'
            }
        };

 
        let responseData = await  axios.post(sUrl,
            JSON.stringify(  params   ),
            config
        )  
 
       return {esito: responseData.data.esito , err_code: responseData.data.err_code, 
        profile: responseData.data.scheda?.profile,
        token: responseData.headers?.authorization };
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK',  err_code: "001"};
    }

      
};