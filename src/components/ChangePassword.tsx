import React  from 'react';  
import { authServices } from '../services/authServices';
import ChangePasswordView from '../views/ChangePasswordView';
import {NotificationManager} from 'react-notifications'; 
 
import { Utente } from '../model/Utente';
 
import { connect } from "react-redux";
import { ConstantUtils } from '../ConstantUtils';
import { Box } from '@mui/material';
 
 

class ChangePassword  extends Utente{
    ripeti_pwd: string= "";
    new_password: string= "";
  }
class  FormDataError { 
 
    password: string = ""; 
    ripeti_pwd: string = "";  
    new_password: string = ""; 
 
}


export interface IProps {    
 
}
   
export interface IState { 
    isInProgress: boolean,
    showChangePassword: boolean,
    bChangedForm: boolean,
    formData: ChangePassword,  
    formDataError: FormDataError
    
}
 

 

class ChangePasswordPage  extends React.Component <IProps,IState> {
    precFormData: string = '';
    
    _isMounted = false; 
    

    constructor(props: any) {
      super(props);  
      this.changePassword = this.changePassword.bind(this);  
 
      this.handleChangeForm = this.handleChangeForm.bind(this);
 
   

      
      this.state={            
            isInProgress: false, bChangedForm: false,showChangePassword: false, 
            formDataError:    new FormDataError() ,
            formData:  Object.assign(new ChangePassword()),

        }
 

    }

    componentWillUnmount() {
        this._isMounted = false;

      }

    componentDidMount()
    { 
        this._isMounted = true;
 
        let token = sessionStorage.getItem("token" ) || "" 

        if (token !== "" )
        { 

            let utente = new ChangePassword();
            
             
            utente.username = sessionStorage.getItem("username") || "";  


            let formData = Object.assign(utente )
            
            this.setState({formData: formData      });
            
            this.precFormData = JSON.stringify(this.state.formData) 
    
        }
    }
 

    validateForm()
    {
        let bValid = true;
        let formDataError = new FormDataError() ;
        
        if (this.state.formData.new_password.trim() === ""  )
            {
               
                formDataError.new_password = "Inserire la password";
                bValid = false;
            }

        if (this.state.formData.new_password.trim() !== this.state.formData.ripeti_pwd.trim()  )
            {
               
                formDataError.ripeti_pwd = "Le password non coincidono";
                bValid = false;
            }

            
            if (this.state.formData.ripeti_pwd.trim() === ""  )
                {
                   
                    formDataError.ripeti_pwd = "Inserire la password";
                    bValid = false;
                }
                console.log(formDataError);
        this.setState({ formDataError : formDataError });
        return bValid;

    }
  
 
    handleChangeForm = (event) => {
        const { formData } = this.state;
 
   
        formData[event.target.name] = event.target.value;
     

        let changed = false; 
        if (JSON.stringify(this.state.formData) !== this.precFormData) 
        { 
          changed = true;
        } 
        
        this.setState({ formData: formData ,  bChangedForm: changed  });
        
      }  

  

    async changePassword()
    { 
       
      this.setState({isInProgress: true }  )   ;
      const bValid = this.validateForm()
  

      if ( bValid)
      { console.log(this.state.formData);
        let ris  = await authServices.changePassword( 
             this.state.formData.username.trim(), this.state.formData.password.trim() ,
             this.state.formData.new_password.trim()   );
 
     
       
        if ( ris.esito === "OK")
        {  
 
         
            NotificationManager.success ("Password modificata con successo." , 'Password', 3000);  
           
 
                this.setState({isInProgress: false }  )   ;


                window.location.href = ConstantUtils.url.HOME_URL  

            return;
         //  let navigate = useNavigate();     navigate("/success", { replace: true });
        }
        else
        {
            
            let mex = ""
            if (ris.err_code === "001" )
              mex = "Errore server."; 
            else
              mex = ris.mex;

            NotificationManager.error(mex, 'Password', 3000);  

            this.setState({isInProgress: false }  )   ;
        }
        
        
      }
      else{
        this.setState({isInProgress: false }  )   ;

      }
       
        
    }


 
    render() {    
 
 


        return (
<>
 
 
          
                <ChangePasswordView 
        
                    handleExecChangePwd={this.changePassword} 
                    isInProgress={this.state.isInProgress}
                    formData={this.state.formData}
 
                    formDataError={this.state.formDataError} 
                    handleChangeForm={this.handleChangeForm}    
                />
       
    </>         

                
        
     
    )}

 
}


 
export    { ChangePasswordPage as ChangePassword } ; 
 
