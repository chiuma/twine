 
import React  from 'react';

import { connect } from 'react-redux';
 

 
 

import { Articolo } from '../model/Articolo';
import { articoliServices } from '../services/articoliServices';
import Articolo_schedaView from '../views/Articolo_schedaView';
 
import {NotificationManager} from 'react-notifications'; 
import { articoliActions } from '../actions/articoli.action';
  

export interface IProps { 
 
    scheda: any,
    handleClose:any,
 
    classes: any,

    actNewArticolo: any,
    actModArticolo: any,
 
    isModal:boolean,
    isMobile:boolean,
    elenco_colori: any
    
}
   
export interface IState { 
    

    isInProgress: boolean,
    bChangedForm: boolean,
    formData: Articolo,
    
    formDataError:FormDataError
}

class  FormDataError { 
 
      descrizione: string = ""; 
      codice: string = "";  
      prezzo: string = ""; 
   
}

 

class Articolo_schedaPage  extends React.Component <IProps,IState> {
    precFormData: string = '';
    
    constructor(props: any) {
      super(props);  
      this.saveScheda = this.saveScheda.bind(this);
      this.handleChangeForm = this.handleChangeForm.bind(this);
      this.handleUpdatePrezzoOrdini = this.handleUpdatePrezzoOrdini.bind(this);
      
      
      this.state={           
            isInProgress: false, bChangedForm: false,
            formDataError:    new FormDataError() ,
            formData: {...this.props.scheda} // Object.assign(new Articolo(), this.props.scheda),

        }
      

    }
 

    componentDidMount()
    { 
        this.precFormData = JSON.stringify(this.state.formData) 


    }
 
 
 
    handleChangeForm = (event) => {
        const { formData } = this.state;
       
 
       //  let dPrezzo  = Number( parseFloat(event.target.value.replace(",","."))) ;
         // (Math.round(dPrezzo * 100) / 100).toFixed(2); 
   
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

           //  console.log("TEST 1 saveScheda - this.state.formData.id =" + this.state.formData.id_articolo_base );
           if ( this.state.formData.id_articolo_base  === -1)
           {
                let ris = await articoliServices.newScheda( new Articolo(this.state.formData) );
                this.setState({ isInProgress: false })   ;
                if ( ris.esito === "OK")
                { 
                    this.state.formData.id_articolo_base  = Number (ris.new_id);
                    let formData = {...this.state.formData}
                    

                    this.props.actNewArticolo(  formData).then((response:any) => {   
                      this.precFormData = JSON.stringify(formData)  
                      this.setState({bChangedForm:false, formData: formData});
                      NotificationManager.success('Operazione eseguita con successo.' , 'Articoli', 3000);  
                    })
                }
                else
                {
                    
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                     else if (ris.err_code === "004" )
                      mex = "Impossibile inserire l'articolo : " +  this.state.formData.descrizione +  " perchè il codice " + this.state.formData.codice  + " già esistente."; 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Articolo', 3000);  
                }

           }
           else
           {
                let ris = await articoliServices.modScheda( new Articolo(this.state.formData) );
                this.setState({ isInProgress: false })   ;
                if ( ris.esito === "OK")
                { 
                     
                    this.precFormData = JSON.stringify(this.state.formData)  
                    this.setState({bChangedForm:false });                  
                    this.props.actModArticolo( this.state.formData).then((response:any) => { 
                    //  this.props.handleClose(); 
                    NotificationManager.success('Operazione eseguita con successo.' , 'Articoli', 3000);  
                    });
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                   else if (ris.err_code === "004" )
                      mex = "Impossibile modificare l'articolo : " +  this.state.formData.descrizione +  " perchè il codice " + this.state.formData.codice  + " già esistente."; 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'Articolo', 3000);  

                }

                
           }           
 
        }
     
        
    }

    async handleUpdatePrezzoOrdini(scheda)
    {
      this.setState({isInProgress: true});
 
           let ris = await articoliServices.updatePrezzoOrdini( scheda);
           this.setState({ isInProgress: false })   ;
           if ( ris.esito === "OK")
           { 
    
  
                 NotificationManager.success('Operazione eseguita con successo.' , 'Articoli', 3000);  
      
           }
           else
           {
               
               let mex = ""
               if (ris.err_code === "001" )
                 mex = "Errore server."; 
         
               else
                 mex = "Errore durante l'elaborazione.";
               NotificationManager.error(mex, 'Articolo', 3000);  
           }

       
              

 
    }


    render() {    
 
  


        return (

 
 

            <Articolo_schedaView
                elenco_colori={this.props.elenco_colori}
                isModal={this.props.isModal}
                isMobile={this.props.isMobile}
                bChangedForm={this.state.bChangedForm}
                readOnly={  false }
                handleClose={this.props.handleClose}
                handleUpdatePrezzoOrdini={this.handleUpdatePrezzoOrdini}
                saveScheda={this.saveScheda}
                isInProgress={this.state.isInProgress}
                scheda={this.props.scheda}
                formDataError={this.state.formDataError} 
                formData={this.state.formData}
                handleChangeForm={this.handleChangeForm}  />            
                 



  
     
    )}

 
}


function mapStateToProps(state) {
  
  
  return {
    elenco_colori: state.coloriReducer.elenco_colori 
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actNewArticolo: async (scheda) => {
          dispatch(articoliActions.newArticolo(scheda));
        } ,
        
        actModArticolo: async (scheda) => {
            dispatch(articoliActions.modArticolo(scheda));
          }     ,   

 
        
          
    }
  }
 

const appArticolo_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Articolo_schedaPage );
export    { appArticolo_schedaPage as Articolo_scheda } ; 
 

