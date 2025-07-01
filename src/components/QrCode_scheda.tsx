 
import React  from 'react';

 
 
import { QrCode } from '../model/QrCode';
 
import QrCode_schedaView from '../views/QrCode_schedaView';
 
import {NotificationManager} from 'react-notifications'; 
 
  

export interface IPropsQrCdode { 
    savedScheda:any,  
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
            formData: { ...new QrCode()}  

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
            let formData = {...this.state.formData}
            this.precFormData = JSON.stringify(formData)  
            this.setState({bChangedForm:false, formData: formData});
            this.props.savedScheda(formData);
            NotificationManager.success('Operazione eseguita con successo.' , 'QrCode', 3000);  
 
        }
     
        
    }


    render() {    
 
       


        return (

 
 

            <QrCode_schedaView
                elenco_articoli={this.props.elenco_articoli} 
                elenco_colori={this.props.elenco_colori} 
                bChangedForm={this.state.bChangedForm}
                readOnly={  false } 
       
                saveScheda={this.saveScheda}
                isInProgress={this.state.isInProgress} 
                formDataError={this.state.formDataError} 
                formData={this.state.formData}
                handleChangeForm={this.handleChangeForm}  />            
                 



  
     
    )}

 
}

 
 
 
 
export    { QrCode_schedaPage as QrCode_scheda } ; 
 

