import React from 'react';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './App.css';

import { withRouter } from "react-router";
 
import theme from './common/globalMuiTheme'; 
import { connect } from 'react-redux';

import {NotificationManager} from 'react-notifications';
import { Box,   ThemeProvider } from '@mui/material';
 
   
import Login from './components/Login';
import { Home } from './components/Home';
import httpService from  "./axiosInterception" 

 
export interface IProps { 
  history: any,
  
}
   
export interface IState {
 
 
 isInProgress: boolean;
 isLogged: boolean;
 

}


 
class AppPage   extends React.Component <IProps,IState> {
   
  constructor(props: any) 
  {
    super(props); 
    httpService.setupInterceptors ( );
    this.execLogin = this.execLogin.bind(this);
     
    
    this.state = {   isInProgress:false , isLogged: sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ? false : true}; 
 
  }

 
  
  componentDidMount()
  { 
    
  }
 
  execLogin(param)
  {
 
     sessionStorage.setItem("username", param.username.toLowerCase());
     sessionStorage.setItem("profile", param.profile.toLowerCase());
     sessionStorage.setItem("token", param.token);
     this.setState({isLogged: true})   ;
     NotificationManager.success('Benvenuto utente ' +  param.username, 'Twine', 3000);  

    
  }

 
 
  render() {
    
 
 


    return (

<>
 

<ThemeProvider theme={theme}>

 
     

          <Box  display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <NotificationContainer />
          </Box>




          <Box  display="flex" flexDirection="column" alignItems="stretch"  width="100%"   
                  justifyContent="space-between"   > 

            {!this.state.isLogged && 
              <Box style={{  margin: 'auto', marginTop:'2%', }}
              width={{ xs: '80%', sm: '65%' , md: '60%', lg: '50%', xl: '40%',}}>

                <Login 
                execLogin={this.execLogin}/>
              </Box>
            }
            
            {this.state.isLogged === true && 
              <Home /> 
            }
                        
          </Box>

        
       
 
</ThemeProvider>
 
</>      
  )}
 
}
 
 


function mapStateToProps(state) {
  
  
  return { 
 
    
  };
}

function mapDispatchToProps(dispatch) {
    return {
       

    }
  }
 
  
  const appCliente_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  withRouter(AppPage) );
  export    { appCliente_schedaPage as App } ; 
 
 