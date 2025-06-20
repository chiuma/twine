 
import React  from 'react';

import { connect } from 'react-redux';
 

import { clientiActions } from '../actions/clienti.action';
 

import { Cliente } from '../model/Cliente';
import { clientiServices } from '../services/clientiServices';
import Cliente_schedaView from '../views/Cliente_schedaView';
 
import {NotificationManager} from 'react-notifications'; 
 

export interface IProps { 
 
    scheda: any,
    handleClose:any,
 
    classes: any,

    actNewCliente: any,
    actModCliente: any,
    isModal:boolean,
    isMobile:boolean,
    showConsegne: boolean
}
   
export interface IState { 
    isInProgress: boolean,
    bChangedForm: boolean,
    formData: Cliente,
    
    formDataError:FormDataError
}

class  FormDataError { 
 
      descrizione: string = ""; 
 
   
}

 

class Cliente_schedaPage  extends React.Component <IProps,IState> {
    precFormData: string = '';
    
    constructor(props: any) {
      super(props);  
      this.saveScheda = this.saveScheda.bind(this);
      this.handleChangeForm = this.handleChangeForm.bind(this);
 
      
      this.state={           
            isInProgress: false, bChangedForm: false,
            formDataError:    new FormDataError() ,
            formData:  Object.assign(new Cliente(), this.props.scheda),

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
           if ( this.state.formData.id_cliente === -1)
           {
                let ris = await clientiServices.newScheda( new Cliente(this.state.formData) );
                 
                if ( ris.esito === "OK")
                { 
                    this.state.formData.id_cliente = Number (ris.new_id);

                    this.props.actNewCliente(this.state.formData).then((response:any) => {this.props.handleClose();  })
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Cliente', 3000);  

          

                }

           }
           else
           {
                let ris = await clientiServices.modScheda( new Cliente(this.state.formData) );
                    
                if ( ris.esito === "OK")
                { 
                     
                    this.props.actModCliente( this.state.formData).then((response:any) => { this.props.handleClose(); });
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Cliente', 3000);  

                }

                
           }           
 
        }
     
        
    }


    render() {    
 
       


        return (

        <> 
 

            <Cliente_schedaView
            
                showConsegne={this.props.showConsegne}
                isModal={this.props.isModal}
                isMobile={this.props.isMobile}
                bChangedForm={this.state.bChangedForm}
                readOnly={  false }
                handleClose={this.props.handleClose}
                saveScheda={this.saveScheda}
                isInProgress={this.state.isInProgress}
                scheda={this.props.scheda}
                formDataError={this.state.formDataError} 
                formData={this.state.formData}
                handleChangeForm={this.handleChangeForm} />            
                 



        </>
     
    )}

 
}


function mapStateToProps(state) {
  
  
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actNewCliente: async (scheda) => {
          dispatch(clientiActions.newCliente(scheda));
        } ,
        
        actModCliente: async (scheda) => {
            dispatch(clientiActions.modCliente(scheda));
          }           ,
        
        
    }
  }
 

const appCliente_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Cliente_schedaPage );
export    { appCliente_schedaPage as Cliente_scheda } ; 
 

