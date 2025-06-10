import React  from 'react';

import { connect } from 'react-redux';
 
import { Provenienza } from '../model/Provenienza';
 
import Provenienza_schedaView from '../views/Provenienza_schedaView';
 
import {NotificationManager} from 'react-notifications'; 
import { provenienzeActions } from '../actions/provenienze.action';
import { provenienzeServices } from '../services/provenienzeService';
 
 
 

export interface IProps { 
 
    scheda: any,
    handleClose:any,
 
    classes: any,

    actNewProvenienza: any,
    actModProvenienza: any,
    
    isModal:boolean
    
}
   
export interface IState { 
    isInProgress: boolean,
    bChangedForm: boolean,
    formData: Provenienza,
    
    formDataError:FormDataError
}

class  FormDataError { 
 
      descrizione: string = ""; 
      codice: string = "";  
   
}

 

class Provenienza_schedaPage  extends React.Component <IProps,IState> {
    precFormData: string = '';
    
    constructor(props: any) {
      super(props);  
      this.saveScheda = this.saveScheda.bind(this);
      this.handleChangeForm = this.handleChangeForm.bind(this);
 
      
      this.state={           
            isInProgress: false, bChangedForm: false,
            formDataError:    new FormDataError() ,
            formData:  Object.assign(new Provenienza(), this.props.scheda),

        }
      

    }
 

    componentDidMount()
    { 
        this.precFormData = JSON.stringify(this.state.formData) 


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

    validateForm()
    {
        let bValid = true;
        let formDataError = new FormDataError() ;
        
        if (this.state.formData.descrizione.trim() === "" )
        {
            formDataError.descrizione = "Campo obbligatorio";
            bValid = false;
        }

 

   

 
        this.setState({ formDataError : formDataError });
        return bValid;

    }

    async saveScheda()
    {

        const bValid = this.validateForm()
        if ( bValid)
        {
            this.setState({isInProgress: true});

            // console.log("TEST 1 saveScheda - this.state.formData.id =" + this.state.formData.id );
           if ( this.state.formData.id_provenienza === -1)
           {
                let ris = await provenienzeServices.newScheda( new Provenienza(this.state.formData) );
                 
                if ( ris.esito === "OK")
                { 
                    this.state.formData.id_provenienza = Number (ris.new_id);

                    this.props.actNewProvenienza( this.state.formData).then((response:any) => { this.props.handleClose();  })
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Provenienza', 3000);  

          

                }

           }
           else
           {
                let ris = await provenienzeServices.modScheda( new Provenienza(this.state.formData) );
                    
                if ( ris.esito === "OK")
                { 

             
                    this.props.actModProvenienza( this.state.formData)  .then((response:any) => { 
     
                      this.props.handleClose(); 
                     
                    });
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
 
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Provenienza', 3000);  

                }

                
           }           
 
        }
     
        
    }


    render() {    
 
       


        return (

 
 

            <Provenienza_schedaView
                isModal={this.props.isModal}
                bChangedForm={this.state.bChangedForm}
                readOnly={  false }
                handleClose={this.props.handleClose}
                saveScheda={this.saveScheda}
                isInProgress={this.state.isInProgress}
                scheda={this.props.scheda}
                formDataError={this.state.formDataError} 
                formData={this.state.formData}
                handleChangeForm={this.handleChangeForm} />            
                 



  
     
    )}

 
}


function mapStateToProps(state) {
  
  
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actNewProvenienza: async (scheda) => {
          dispatch(provenienzeActions.newProvenienza(scheda));
        } ,
        
        actModProvenienza: async (scheda) => {
            dispatch(provenienzeActions.modProvenienza(scheda));
          } ,
        
 

          
        
        
    }
  }
 

const appProvenienza_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Provenienza_schedaPage );
export    { appProvenienza_schedaPage as Provenienza_scheda } ; 
 

