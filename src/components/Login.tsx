import React from 'react';
 

import LoginView from '../views/LoginView';
 
 
import {NotificationManager} from 'react-notifications';
 
import { authServices } from '../services/authServices';
 

export interface IProps { 
  execLogin:any

}
   
export interface IState {
    isInProgress: boolean,
    bChangedForm: boolean,
    formData: any,    
    error_message:string
    
}


 
class Login  extends React.Component <IProps,IState> {
 
  constructor(props: any) {
    super(props); 
     
    this.handleLogin = this.handleLogin.bind(this);
    this.state={           
        isInProgress: false, bChangedForm: false,
        error_message:    '',  
        formData:  {email:'', password:''},

    }
    
  }

  async handleLogin( )
  {

       
      this.setState({  isInProgress: true  });
      let ris = await authServices.login(this.state.formData.email, this.state.formData.password);
  
      if ( ris.esito === "OK")
      { 
        this.props.execLogin({username: this.state.formData.email,  token: ris.token })
      
      
      }
      else
      { 
          console.log("Errore" , ris)
          
          
          let mex = ""
          if (ris.err_code === "001" )
          mex = "Errore server."; 

          else if (ris.err_code === "002" )
            mex = "Utente e/o password errata."; 
          else
            mex = "Errore durante l'elaborazione.";
          this.setState({ isInProgress: false , error_message: mex})   ;

          NotificationManager.error(mex, 'Login', 3000);  

      }







  }

  handleChangeForm = (event) => {
    const { formData } = this.state;
 
    formData[event.target.name] = event.target.value;
 

    
    this.setState({ formData: formData   });
    
  }  

  componentDidMount()
  {

    
  }
 
  

  render() {
  
    
    return (
      
    <>
    
 

    <LoginView  
        isInProgress={this.state.isInProgress}
        error_message={this.state.error_message}
        formData={this.state.formData}
        handleLogin={this.handleLogin}
        handleChangeForm={this.handleChangeForm}
        
        />


    </>
   
  
  )}
 
}

export default Login;