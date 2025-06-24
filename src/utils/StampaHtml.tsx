import { Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React  from 'react';
import parse from 'html-react-parser';
 
 
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { IconsMenu } from '../common/Icons';

export interface IProps { 
 urlToPrint?: string,
 html?: string,
 handleShowStampa:any
    
}
   
export interface IState { 
   html: string,
   isInProgress: boolean
}

class Stampa  extends React.Component <IProps,IState> {
 
    
    constructor(props: any) {
      super(props);  
 
      this.state={   html: '', isInProgress:false}

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
 
 
 

     
  

    render() {    
 
       


        return (

        <Box  >
            {this.state.isInProgress  && 
                <Box mt={2}>
                    <CircularProgress color="primary" />
                </Box>
            }
            {parse (this.state.html)}

    
        </Box>
                 



  
     
    )}

 
}
 

export class StampaHtml  extends React.Component <IProps,IState> {
 
    componentRef: any = null;
    constructor(props: any) {
      super(props);  
 
      this.state={   html: '', isInProgress:false}

    }
 

    componentDidMount()
    {  

 

    }
 
 
 

     
  

    render() {    
 
       


        return (

 
                 

            <>
            <ReactToPrint content={() => this.componentRef} onAfterPrint={( ) => {this.props.handleShowStampa(false, '')}}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <>
                  <Button startIcon={<IconsMenu.StampaIcon />}  size="small" color="primary" variant="contained" onClick={handlePrint}>Stampa</Button>
                  <Button   onClick={e=>this.props.handleShowStampa(false,'')} size="small" color="primary" variant="contained" style={{marginLeft: '4px'}}>
                  Chiudi
                  </Button>
                  </>
                )}
              </PrintContextConsumer>
            </ReactToPrint>
            <Stampa ref={el => (this.componentRef = el)} {...this.props} />
            
            </>  

   
     
    )}

 
}
 

 
 

