import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
 
 
 
    
export const authServices = { 
 
    login,
    logout,
    
     

};

function logout()
{

}

async function   login (email,    password) 
{
    try {
        const sUrl = ConstantUtils.url.SERVER_URL + "/login.php";

         
        const params = { email : email,  password: password };
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
        profile: responseData.data.profile,
        token: responseData.headers.authorization };
 
    } 
    catch(error) 
    {
        
        return {esito: 'NOT_OK',  err_code: "001"};
    }

      
};