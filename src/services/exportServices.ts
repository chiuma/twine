import {ConstantUtils} from   "../ConstantUtils"
import axios from "axios";
 
export const exportServices = { 
    sendEmail, 
};

async function   sendEmail(email_destinatario:string, subject:string, content: string)  
{
    try {
       
        const sUrl = ConstantUtils.url.SERVER_URL + "/send_email.php";   
        const params = { email_destinatario : email_destinatario, subject: subject, content: content };
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