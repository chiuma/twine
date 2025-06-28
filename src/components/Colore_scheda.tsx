import React  from 'react';

import { connect } from 'react-redux';
 
import { Colore } from '../model/Colore';
import { coloriServices } from '../services/coloriServices';
import Colore_schedaView from '../views/Colore_schedaView';
 
import {NotificationManager} from 'react-notifications'; 
import { coloriActions } from '../actions/colori.action';
 
 

export interface IProps { 
 
    scheda: any,
    handleClose:any,
 
    classes: any,

    actNewColore: any,
    actModColore: any,
    
    isModal:boolean,
    
    
}
   
export interface IState { 
    isInProgress: boolean,
    bChangedForm: boolean,
    formData: Colore,
    
    formDataError:FormDataError
}

class  FormDataError { 
 
      descrizione: string = ""; 
      codice: string = "";  
   
}

 

class Colore_schedaPage  extends React.Component <IProps,IState> {
    precFormData: string = '';
    
    constructor(props: any) {
      super(props);  
      this.saveScheda = this.saveScheda.bind(this);
      this.handleChangeForm = this.handleChangeForm.bind(this);
 
      
      this.state={           
            isInProgress: false, bChangedForm: false,
            formDataError:    new FormDataError() ,
            formData:  Object.assign(new Colore(), this.props.scheda),

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

 
 
        
        if (this.state.formData.codice.trim() === "" )
        {
            formDataError.codice = "Campo obbligatorio";
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
           if ( this.state.formData.id_colore === -1)
           {
                let ris = await coloriServices.newScheda( new Colore(this.state.formData) );
                 
                if ( ris.esito === "OK")
                { 
                    this.state.formData.id_colore = Number (ris.new_id);

                    this.props.actNewColore( this.state.formData).then((response:any) => { this.props.handleClose();  })
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                    else if (ris.err_code === "004" )
                      mex = "Impossibile inserire il colore: " +  this.state.formData.descrizione +  " perchè il codice " + this.state.formData.codice  + " già esistente."; 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Colore', 3000);  

          

                }

           }
           else
           {
                let ris = await coloriServices.modScheda( new Colore(this.state.formData) );
                    
                if ( ris.esito === "OK")
                { 

             
                    this.props.actModColore( this.state.formData)  .then((response:any) => { 
     
                      this.props.handleClose(); 
                     
                    });
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                    else if (ris.err_code === "004" )
                      mex = "Impossibile modificare il colore: " +  this.state.formData.descrizione +  " perchè il codice " + this.state.formData.codice  + " già esistente."; 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Colore', 3000);  

                }

                
           }           
 
        }
     
        
    }


    render() {    
 
       


        return (

 
          

            <Colore_schedaView
                isModal={this.props.isModal}
                bChangedForm={this.state.bChangedForm}
                readOnly={sessionStorage.getItem("profile") === "admin" ? false : true }  
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
        actNewColore: async (scheda) => {
          dispatch(coloriActions.newColore(scheda));
        } ,
        
        actModColore: async (scheda) => {
            dispatch(coloriActions.modColore(scheda));
          } ,
        
    }
  }
 

const appColore_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Colore_schedaPage );
export    { appColore_schedaPage as Colore_scheda } ; 
 

