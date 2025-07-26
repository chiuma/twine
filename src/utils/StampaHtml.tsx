import { Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React  from 'react';
import parse from 'html-react-parser';
 
 
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { IconsMenu } from '../common/Icons';
import { CustomComponents } from './CustomComponents';
import { exportServices } from '../services/exportServices';
import {NotificationManager} from 'react-notifications'; 
export interface IProps { 
 urlToPrint?: string,
 html?: string,
 cliente?: IEmail,
 handleShowStampa:any,
 handleSendEmail?:any,
 isInProgress: boolean
    
}

export interface IPropsStampa { 
  urlToPrint?: string,
  html?: string,
  cliente?: IEmail,
  handleShowStampa:any,
      
 }

export interface IStateStampa { 
  html: string, 
  isInProgress: boolean
}
export interface IState { 
 
  
}
export interface IEmail { 
  subject: string, 
  email: string
}
class Stampa  extends React.Component <IProps,IState> {
 
    
    constructor(props: any) {
      super(props);  
 
   
    }
 


 
 

     
  

    render() {    
 
       


        return (

        <Box  >
            {this.props.isInProgress  && 
                <Box mt={2}>
                    <CircularProgress color="primary" />
                </Box>
            }
            {parse (this.props.html||"")}

    
        </Box>
                 



  
     
    )}

 
}
 

export class StampaHtml  extends React.Component <IPropsStampa,IStateStampa> {
 
    componentRef: any = null;
    constructor(props: any) {
      super(props);  
 
      this.state={   html: '', isInProgress:false   }

    }
 

    componentDidMount()
    {  
       if (this.props.urlToPrint !== undefined )
      {
        this.setState({   isInProgress: true });
        
        const config = {
            headers: {
            'Content-type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
            }
        };

        axios.get(this.props.urlToPrint,config  )
        .then(response => {
       
            this.setState({   html: response.data  , isInProgress:false});
        });
      }
      else if (this.props.html !== undefined )
      {
        this.setState({   html: this.props.html , isInProgress:false});
      }
    }
 
 
    async handleSendEmail( )
    {
      if (this.props.cliente)
      {
        this.setState({  isInProgress: true }); 

        let ris = await exportServices.sendEmail(this.props.cliente?.email , this.props.cliente?.subject, this.state.html);
       
        if ( ris.esito === "OK")
          {   
            NotificationManager.success('Email inviata con successo a ' + this.props.cliente?.email  , 
              'Invio Email', 3000);   

            this.props.handleShowStampa(false, '');
          }
        else
        {
          NotificationManager.error('Errore durante l\'invio dell\'email a ' + this.props.cliente?.email  , 
            'Invio Email', 3000);  
           
    
          this.setState({  isInProgress: false }); 
        }

      }
    }


     
  

    render() {    
 
       


        return (

 
                 


            <>
 
            <ReactToPrint content={() => this.componentRef} onAfterPrint={( ) => {this.props.handleShowStampa(false, '')}}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <>
                   
                  <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                          justifyContent="space-between" width="100%"   > 
                    <Box    > 
                      
                      <Button startIcon={<IconsMenu.StampaIcon />}  size="small"
                       color="primary" variant="contained" onClick={handlePrint}>Stampa</Button>
                      
                      <Button    onClick={e=>this.props.handleShowStampa(false,'')} size="small" color="primary" variant="contained" style={{marginLeft: '4px'}}>
                      Chiudi
                      </Button>
                    </Box> 
                    {(this.props.cliente?.email !== undefined && 
                    this. props.cliente?.email  !==  "") && 
                      
                      <>                 
                      <Box   display="flex" flexDirection="row" alignItems="flex-end"  > 

                      <CustomComponents.CustomTextField   
                            id="email"
                            name="email"
                            label="Email cliente"
                            value={this.props.cliente?.email}
                        />                       
                      <Button  startIcon={<IconsMenu.EmailIcon />}  
                       onClick={e => this.handleSendEmail()} size="small" color="primary" variant="contained" style={{marginLeft: '4px'}}>
                      Invia
                      </Button>
                      </Box>  
                    </>}
    
                        
                  </Box> 
                  </>
                )}
              </PrintContextConsumer>
            </ReactToPrint>
            <Stampa ref={el => (this.componentRef = el)} {...this.props}
            html={this.state.html}
            isInProgress={this.state.isInProgress}/>
            
            </>  

   
     
    )}

 
}
 

 
 

