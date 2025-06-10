 
import React  from 'react';

import { connect } from 'react-redux';
 
import { QrCode } from '../model/QrCode';
import { qrCodeServices } from '../services/qrCodeServices';
import QrCode_schedaView from '../views/QrCode_schedaView';
 
import {NotificationManager} from 'react-notifications'; 
 
  

export interface IPropsQrCdode { 
    savedScheda:any,
    scheda: any ,
    handleClose:any,
    elenco_articoli: any
    elenco_colori: any
    
}
   
export interface IState { 
    

    isInProgress: boolean,
    bChangedForm: boolean,
    formData: QrCode,
    
    formDataError:FormDataError
}

class  FormDataError { 
  
      codice: string = "";    
   
}

 

class QrCode_schedaPage  extends React.Component <IPropsQrCdode,IState> {
    precFormData: string = '';
    
    constructor(props: any) {
      super(props);  
      this.saveScheda = this.saveScheda.bind(this);
      this.handleChangeForm = this.handleChangeForm.bind(this);
 
       
      
      this.state={           
            isInProgress: false, bChangedForm: false,
            formDataError:    new FormDataError() ,
            formData: {...this.props.scheda} // Object.assign(new QrCode(), this.props.scheda),

        }
      

    }
 

    componentDidMount()
    { 
        this.precFormData = JSON.stringify(this.state.formData) 


    }
 
 
 
    handleChangeForm = (event) => {
        const { formData } = this.state;
       
 
   
        formData[event.target.name] = event.target.value;
      if ( event.target.name === "id_colore_2")
        {
            if ( event.target.value === -1) 
            {
                formData["id_colore_3"]  = -1
                
            }    
        }

        let changed = false; 
        if (JSON.stringify(this.state.formData) !== this.precFormData) 
        {  
 
          formData.code = QrCode.getCode(this.props.elenco_articoli,this.props.elenco_colori, this.state.formData );
          changed = true;
        } 
        
        this.setState({ formData: formData ,  bChangedForm: changed  });
        
      }  

    validateForm()
    {
        let bValid = true;
        let formDataError = new FormDataError() ;
        
 
 
 
        
        if (this.state.formData.code.trim() === "" )
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

           if ( this.state.formData.id_qrcode  === -1)
           {
                let ris = await qrCodeServices.newScheda( new QrCode(this.state.formData) );
                this.setState({ isInProgress: false })   ;
                if ( ris.esito === "OK")
                { 
                  this.state.formData.id_qrcode  = Number (ris.new_id);
                  let formData = {...this.state.formData}
                  this.precFormData = JSON.stringify(formData)  
                  this.setState({bChangedForm:false, formData: formData});
                  this.props.savedScheda(formData);
                  NotificationManager.success('Operazione eseguita con successo.' , 'QrCode', 3000);  
                   
                }
                else
                {
                    
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                     else if (ris.err_code === "004" )
                      mex = "Impossibile inserire qr code : " +  this.state.formData.code +  " perchè il qr code " + this.state.formData.code  + " già esistente."; 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'QrCode', 3000);  
                }

           }
           else
           {
                let ris = await qrCodeServices.modScheda( new QrCode(this.state.formData) );
                this.setState({ isInProgress: false })   ;
                if ( ris.esito === "OK")
                { 
                     
                    this.precFormData = JSON.stringify(this.state.formData)  
                    this.setState({bChangedForm:false });                  
 
                    NotificationManager.success('Operazione eseguita con successo.' , 'QrCode', 3000); 
                    this.props.savedScheda(this.state.formData); 
                 
                }
                else
                {
                    this.setState({ isInProgress: false })   ;
                    let mex = ""
                    if (ris.err_code === "001" )
                      mex = "Errore server."; 
                   else if (ris.err_code === "004" )
                      mex = "Impossibile modificare il qr code : " +  this.state.formData.code +  " perchè il codice " + this.state.formData.code  + " già esistente."; 
               
                    else
                      mex = "Errore durante l'elaborazione.";
                    NotificationManager.error(mex, 'QrCode', 3000);  

                }

                
           }           
 
        }
     
        
    }


    render() {    
 
       


        return (

 
 

            <QrCode_schedaView
                elenco_articoli={this.props.elenco_articoli} 
                elenco_colori={this.props.elenco_colori} 
                bChangedForm={this.state.bChangedForm}
                readOnly={  false }
                handleClose={this.props.handleClose}
       
                saveScheda={this.saveScheda}
                isInProgress={this.state.isInProgress}
                scheda={this.props.scheda}
                formDataError={this.state.formDataError} 
                formData={this.state.formData}
                handleChangeForm={this.handleChangeForm}  />            
                 



  
     
    )}

 
}

 
 
 
 
export    { QrCode_schedaPage as QrCode_scheda } ; 
 

