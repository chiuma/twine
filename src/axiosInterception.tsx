
// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
import axios from "axios";
import { ConstantUtils } from "./ConstantUtils";
 
 
function logout() { 
    sessionStorage.clear(); 
    window.location.href = `${window.location.origin}`

  }
    
 

export default {
    setupInterceptors: (  ) => {

        // Add a request interceptor
        axios.interceptors.request.use(
            config => { return config;   },
            error =>  { Promise.reject(error)   });



        //Add a response interceptor

        axios.interceptors.response.use(
            (response) => 
            {
             //   console.log("SessionExpired 1",response)
                
                if ( response.data.esito === "NOT_OK" &&  
                    (response.data.err_code === "-001" || response.data.err_code === "-002"))
                {
// console.log("SessionExpired 1",response)
                   
                    if ( response.data.err_code === "-001")
                    {
                        sessionStorage.setItem("token", response.data.token_refreshed);
                        response.config.headers['Authorization'] =  response.data.token_refreshed;
                        response.config.baseURL = response.config.url;

                     //   console.log("TEST ************** Token refreshed");
                        return axios.request(response.config);

                       
                    }
                    else
                    {
                        sessionStorage.clear(); 
                   //     console.log("SessionExpired 2",response )
      
                      window.location.href = ConstantUtils.url.HOME_URL +  'SessionExpired.html'
                    }
                }
                 
                return response
            }, 


            function (error) 
            {
              //  console.log("axios.interceptors.response - error", error);
                                
                return Promise.reject(error);
            }
        )

    },
};