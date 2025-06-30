 
import React  from 'react';

import { connect } from 'react-redux';
 
 
 
 
import {NotificationManager} from 'react-notifications'; 
 
import { ConsegnaDettaglio, ConsegnaDettaglioErrors } from '../model/ConsegnaDettaglio';
 
import { Cliente } from '../model/Cliente';
 
import { Consegna,   ConsegnaTestataErrors } from '../model/Consegna';
import Consegna_schedaView from '../views/Consegna_schedaView';
 
import { consegneServices } from '../services/consegneServices';
 
import { ConstantUtils } from '../ConstantUtils';
import { StampaHtml } from '../utils/StampaHtml';
import { clientiActions } from '../actions/clienti.action';
import { ordiniServices } from '../services/ordiniServices';
import { ConfirmDialog } from '../utils/ConfirmDialog';

import { OrdineDettaglio, OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import Ordine_dettaglioModal from '../components/Ordine_dettaglioModal';

 

export interface IProps { 
  flag_consegna_saved: boolean,
  id_consegna: number,
    saveConsegna:any,
    readOnly: boolean ,
    classes: any,
   id_cliente: number | null

   actShowCliente:any,
    elenco_clienti: Cliente[],
    elenco_colori: any,
    elenco_articoli:any
   
}
   
export interface IState { 
 
    isInProgress: boolean,
    bChangedForm: boolean,
    showStampa: boolean,
    showEtichetteStampa: boolean,
    ordineDettaglioToDelete:  any | null,
    showOrdineDettaglioToAdd:  boolean,

    arrFormDettaglioErrors:  ConsegnaDettaglioErrors[]
    formTestataErrors:  ConsegnaTestataErrors  
     
    formConsegna : any ,

}
 
function compareConsegna (x,y)
{
  let xValue:any = ( x.id_consegna_dettaglio === -1 ? "1" : "0") + x.id_ordine_dettaglio  
  let yValue:any = ( y.id_consegna_dettaglio === -1 ? "1" : "0") + y.id_ordine_dettaglio  

  return (xValue  - yValue )
 
} 

 
 
class Consegna_schedaPage  extends React.Component <IProps,IState> {
    precForm : string = '';
     
    _isMounted = false;

    constructor(props: any) {
      super(props);  
      this.handleSaveConsegna = this.handleSaveConsegna.bind(this);
      this.handleConsegnaAll = this.handleConsegnaAll.bind(this);
      this.handleDelDettaglio = this.handleDelDettaglio.bind(this);
      this.handleShowStampa = this.handleShowStampa.bind(this);
      this.applicaSconto = this.applicaSconto.bind(this);
      this.handleShowEtichetteStampa = this.handleShowEtichetteStampa.bind(this);
      this.showCliente = this.showCliente.bind(this);
      this.execDeleteOrdineDettaglio = this.execDeleteOrdineDettaglio.bind(this);
      this.handleOrdineDettaglioToDelete = this.handleOrdineDettaglioToDelete.bind(this);
      this.handleAddOrdine = this.handleAddOrdine.bind(this);
      this.handleSaveOrdine = this.handleSaveOrdine.bind(this);
  
      
      let formConsegna =      Object.assign(new Consegna(), {id_consegna: this.props.id_consegna});

       
       
      if ( this.props.id_consegna === -1)
      {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        formConsegna.data_consegna_effettuata = yyyy + "/" + mm + "/" + dd
      }
     
      if (this.props.id_cliente  !== null  && this.props.id_cliente  !== undefined )
        formConsegna.id_cliente = this.props.id_cliente;

      this.state={           
            isInProgress: false, bChangedForm: false, 
            showStampa:false,  
            showEtichetteStampa: false,
            formConsegna : formConsegna,
            ordineDettaglioToDelete:null , 
            showOrdineDettaglioToAdd:false, 
            formTestataErrors: new ConsegnaTestataErrors(),
            arrFormDettaglioErrors:   [] ,

        }
        this.precForm  =  JSON.stringify(this.state.formConsegna ) ; 

      
        

    }
 
    componentWillUnmount() {
      this._isMounted = false;
    }

    componentDidMount()
    { 
      this._isMounted = true;
        
      if ( this.props.id_consegna !== -1 ||
         (this.props.id_cliente  !== null  && this.props.id_cliente  !== undefined ))
        {    this.loadConsegne();}        

    }
  
    componentDidUpdate(prevProps) 
    {
      
   
     if ( prevProps.id_consegna !== this.props.id_consegna  || prevProps.flag_consegna_saved !== this.props.flag_consegna_saved)
     {  

     
       this.state.formConsegna.id_consegna = this.props.id_consegna;


       this.loadConsegne();
       
     }
     
  //    this.precForm  =  JSON.stringify(this.state.formConsegna) ; 
 
    }


    async loadConsegne()
    {

  
      if (!this._isMounted)  return;
      this.setState({ isInProgress: true   });

      //let precTime = new Date().getTime();      console.log("TEST 1 - " +  precTime);
      
      let resp = await consegneServices.getScheda(this.state.formConsegna.id_consegna , this.state.formConsegna.id_cliente);

      // let currTime = new Date().getTime(); console.log("TEST 2 - " +   (currTime-precTime) );  precTime = currTime

      this.setState({ isInProgress: false   }); 
      if ( resp.esito === "OK" )
      {
       
        let scheda
        if  (this.state.formConsegna.id_consegna === -1)
         scheda = {...this.state.formConsegna };
        else
          scheda =resp.scheda; // scheda = {  ...resp.scheda};
          
 

       scheda["consegnaDettaglio"] =   resp.scheda.consegnaDettaglio.map(x => (
              {  ...x,                  
              qta_evasa: (x.id_consegna_dettaglio === -1 ? x.qta : x.qta_evasa),  consegnato: (x.id_consegna_dettaglio === -1 ? false : true) }  )) 
              .sort (compareConsegna)
         
                            
                  
 

        this.setState({ formConsegna:  scheda,
            formTestataErrors: new ConsegnaTestataErrors(), bChangedForm: false,
            arrFormDettaglioErrors:  resp.scheda.consegnaDettaglio.map (x => new ConsegnaDettaglioErrors()) ,  }); 
 
        this.precForm  =  JSON.stringify(scheda) ; 
       
      }
      else
      {
         
        NotificationManager.error('Errore server', 'Consegne', 3000); 
        return;
      }

      // currTime = new Date().getTime();   console.log("TEST 3 - " +   (currTime-precTime) ); 
    }

    
    handleSaveConsegna (event)
    {
        if ( event === null) this.props.saveConsegna (null)
        else
        {

         

            let arrFormDettaglioErrors :  ConsegnaDettaglioErrors[] = [];        
            let formTestataErrors = new ConsegnaTestataErrors();
            var bValido = Object.assign(new Consegna(), this.state.formConsegna).validateForm(formTestataErrors);

            let numRighe = this.state.formConsegna.consegnaDettaglio.length  
            for (let i=0; i<numRighe; i++ )
            {
                let formDettaglioaErrors = new ConsegnaDettaglioErrors();
                if (! Object.assign(new ConsegnaDettaglio(), this.state.formConsegna.consegnaDettaglio[i]).validateForm(formDettaglioaErrors))
                {
                    bValido= false;
                }
                 
                if ( this.state.formConsegna.consegnaDettaglio[i].qta_evasa > this.state.formConsegna.consegnaDettaglio[i].qta)
                {
                  formDettaglioaErrors.qta_evasa = "Non può essere maggiore di qta"
                  bValido= false;
              }
              
                arrFormDettaglioErrors.push(formDettaglioaErrors)
            }
            


            if (!bValido)
            {
                this.setState({ formTestataErrors : formTestataErrors, 
                            arrFormDettaglioErrors: arrFormDettaglioErrors });
            }
            else
            {
                let newConsegneDettglio = this.state.formConsegna.consegnaDettaglio.filter
                ( dett => dett.consegnato === true || dett.id_consegna_dettaglio !== -1);
 
                let consegna = Object.assign(new Consegna(), 
                                  this.state.formConsegna,  
                                  {consegnaDettaglio:newConsegneDettglio },
                                  {cliente_descrizione: this.props.elenco_clienti.find(x => x.id_cliente === this.state.formConsegna.id_cliente)?.descrizione});
                             
 
               this.props.saveConsegna (consegna)
            }
        }
         
    }

    handleChangeFormTestata = (event) => {
        const { formConsegna } = this.state;
   
 
   
         if ( event.target.name === "data_consegna_effettuata")
            formConsegna[event.target.name] = event.target.value.replaceAll("-","/") ;
         else
            formConsegna[event.target.name] = event.target.value;
       
     

        let changed = false; 
        if (JSON.stringify(this.state.formConsegna) !== this.precForm ) 
        { 
          changed = true;
        } 
        
        this.setState({ formConsegna: formConsegna ,  bChangedForm: changed  });

        if ( event.target.name === "id_cliente")
        this.loadConsegne();
         
    }  

 
    handleChangeFormDettaglio = (event, idx) => {
        
        const formDettaglio = this.state.formConsegna.consegnaDettaglio[idx];
       
 
       //  let dPrezzo  = Number( parseFloat(event.target.value.replace(",","."))) ;
         // (Math.round(dPrezzo * 100) / 100).toFixed(2); 
         if ( event.target.name === "data_consegna_effettuata")
            formDettaglio[event.target.name] = event.target.value.replaceAll("-","/") ;
         else
            formDettaglio[event.target.name] = event.target.value;
       
     

        let changed = false; 
        if (JSON.stringify(this.state.formConsegna) !== this.precForm ) 
        { 
          changed = true;
          /*** */
          let totale  =  this.state.formConsegna.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
          (currentValue.consegnato ?    (currentValue.prezzo*currentValue.qta  ) : 0 ) , 0 ) 
    
    
          let totale_scontato =  this.state.formConsegna.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
                            (currentValue.consegnato ?    (currentValue.prezzo*currentValue.qta - (currentValue.prezzo*currentValue.qta*currentValue.sconto/100)) : 0 ) , 0 ) ;
          
          let totale_pagare = totale_scontato  + this.state.formConsegna.importo_trasporto;     
          
    
          let totale_scontato_evaso =  this.state.formConsegna.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
                (currentValue.consegnato ?    (currentValue.prezzo*currentValue.qta_evasa - (currentValue.prezzo*currentValue.qta_evasa*currentValue.sconto/100)) : 0 ) , 0 ) 
    
        
    
          let totale_pagare_evaso = totale_pagare + ( (totale_scontato_evaso+this.state.formConsegna.importo_trasporto) *this.state.formConsegna.iva/100);
          /** 
          let importo_manuale = Math.round((totale_pagare_evaso + Number.EPSILON) * 10 ) / 10;
          this.state.formConsegna.importo_manuale = importo_manuale
          */
           
        } 
        
        this.setState({  bChangedForm: changed  });
        
    }  

    
    handleConsegnaAll(event)
    {
       
             
            let formConsegna =  Object.assign ({}, {...this.state.formConsegna});

            
            let newConsegnaDettaglio =  this.state.formConsegna.consegnaDettaglio.map ( 
              x => Object.assign( {}, x, {consegnato:  true })); 
            formConsegna.consegnaDettaglio  = newConsegnaDettaglio;

            
              
            this.setState({   formConsegna:  formConsegna, bChangedForm: true  });
             
    }
     
    handleDelDettaglio(idx)
    {
     
        let newConsegna:Consegna =   Object.assign (new Consegna(),  this.state.formConsegna);
        let newArrFormDettaglioErrors =[...this.state.arrFormDettaglioErrors.slice(0, idx), ...this.state.arrFormDettaglioErrors.slice(idx+ 1) ] ;
        newConsegna.consegnaDettaglio = [...newConsegna.consegnaDettaglio.slice(0, idx), ...newConsegna.consegnaDettaglio.slice(idx+ 1) ] ;
    

        this.setState({ arrFormDettaglioErrors : newArrFormDettaglioErrors ,
            formConsegna: newConsegna });
       
    }
 
    handleShowEtichetteStampa(showStampa)
    {

      this.setState({     showEtichetteStampa    : showStampa   });  
    }

    handleShowStampa(showStampa)
    {
      this.setState({ showStampa: showStampa   }); 
    }

    applicaSconto   (sconto) {
   
             
      let formConsegna =  Object.assign ({}, {...this.state.formConsegna});

      
      let newConsegnaDettaglio =  this.state.formConsegna.consegnaDettaglio.map ( 
        x => Object.assign( {}, x, {sconto:  (x.consegnato ? sconto :  x.sconto)})); 
      formConsegna.consegnaDettaglio  = newConsegnaDettaglio;

      
        
      this.setState({   formConsegna:  formConsegna  });
       
   
    }


    showCliente(id_cliente)
    {
      let scheda =  this.props.elenco_clienti.find( x=> x.id_cliente === id_cliente)
      let cliente:Cliente = Object.assign( new Cliente(), scheda)
 
      this.props.actShowCliente ( cliente);
    }

    
     

    handleOrdineDettaglioToDelete (scheda:any)
    {
    
      this.setState({ ordineDettaglioToDelete: scheda   }); 
    }


    handleAddOrdine(showOrdineDettaglioToAdd:boolean)
    { 
      this.setState({ showOrdineDettaglioToAdd: showOrdineDettaglioToAdd    }); 
      
    }

    handleSaveOrdine(scheda:OrdineDettaglio)
    {
        

        let schedaConsegna =  {...this.state.formConsegna };

        let coloreSel  = this.props.elenco_colori.find (x => x.id_colore === scheda.id_colore ) ;  
        let coloreSel_2  = schedaConsegna.id_colore_2 === -1 ? null : this.props.elenco_colori.find (x => x.id_colore === scheda.id_colore_2 ) ;
        let coloreSel_3  = this.props.elenco_colori.find (x => x.id_colore === scheda.id_colore_3) ;  
        let articoloBase = this.props.elenco_articoli.find (x => x.id_articolo_base === scheda.id_articolo_base) ;


        let newDettaglio = {
          ...scheda ,  
          ...{ colore_codice: coloreSel?.codice,    colore_descrizione: coloreSel?.descrizione },
          ...{ colore_codice_2: coloreSel_2==null ? "" : coloreSel_2.codice,    colore_descrizione_2: coloreSel_2==null ? "" : coloreSel_2.descrizione },
          ...{ colore_codice_3: coloreSel_3==null ? "" : coloreSel_3.codice,    colore_descrizione_3: coloreSel_3==null ? "" : coloreSel_3.descrizione },
          ...{articolo_descrizione : articoloBase.descrizione},          
          ...{qta_evasa: scheda.qta},
          ...{sconto: this.state.formConsegna.consegnaDettaglio[0].sconto},
          ...{consegnato: true}
          }

// console.log("newDettaglio", newDettaglio); console.log("schedaConsegna", schedaConsegna);
        schedaConsegna["consegnaDettaglio"].unshift( Object.assign ( {}, new ConsegnaDettaglio() , newDettaglio)) 
 
        this.state.arrFormDettaglioErrors.unshift ( new ConsegnaDettaglioErrors());        
        
        this.setState({bChangedForm:true,  formConsegna: schedaConsegna , showOrdineDettaglioToAdd:false, arrFormDettaglioErrors: this.state.arrFormDettaglioErrors   });                 
                         
    }


    async execDeleteOrdineDettaglio    (  )
    {
       
       

      let id_ordine_dettaglio =  this.state.ordineDettaglioToDelete.id_ordine_dettaglio;
      this.handleOrdineDettaglioToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris =  await ordiniServices.deleteScheda(id_ordine_dettaglio); //{esito: 'OK', err_code: '001'}; 
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
        let dettaglio = this.state.formConsegna.consegnaDettaglio
        let idx = dettaglio.findIndex( (x :any) => x.id_ordine_dettaglio === id_ordine_dettaglio);
        if (idx !== -1)
        {
            this.handleDelDettaglio(idx);
        }
        NotificationManager.success('Operazione eseguita con successo.' , 'Consegna', 3000);  
  
      }
      else
      {
  
        let mex = ""
        if (ris.err_code === "001" )
          mex = "Errore server.";
        else if (ris.err_code === "002" )
          mex = "Impossibile eliminare dall'Ordine l'articolo perchè risulta consegnato.";
        else
          mex = "Errore durante l'elaborazione.";
        
         
        NotificationManager.error(mex, 'Consegna', 3000);  

      }
    }


    
    render() {    
 
 
 
        return (
          
 <>

        {this.state.showOrdineDettaglioToAdd   && 

          <Ordine_dettaglioModal   
          elenco_colori={this.props.elenco_colori} 
          elenco_clienti={this.props.elenco_clienti} 
          elenco_articoli={this.props.elenco_articoli}  
          handleAddOrdine={this.handleAddOrdine}
          handleSaveOrdine={this.handleSaveOrdine}
          data_consegna={this.state.formConsegna.consegnaDettaglio[0].data_consegna}
          id_ordine ={this.state.formConsegna.consegnaDettaglio[0].id_ordine }

          
          /> 


        }


       {this.state.showStampa &&
       
       <StampaHtml 
          handleShowStampa={this.handleShowStampa}
          urlToPrint={ConstantUtils.url.SERVER_URL + "consegne_stampa.php?id_consegna=" + this.props.id_consegna}
       />
        }


      {this.state.showEtichetteStampa &&
       
       <StampaHtml 
           handleShowStampa={this.handleShowEtichetteStampa}
             urlToPrint={ConstantUtils.url.SERVER_URL + 
              "clienti_etichetta_stampa.php?id_cliente=" + this.state.formConsegna.id_cliente
              + "&colli=" + this.state.formConsegna.colli}
           />
       }

      {this.state.ordineDettaglioToDelete !== null &&
                <ConfirmDialog
                          handleConfirm={this.execDeleteOrdineDettaglio}
                          handleAnnulla={() => { this.handleOrdineDettaglioToDelete(null)}}
                          contextText={"Sei sicuro di vole cancellare dall'Ordine "       
                          +
                          " l'articolo "+  this.state.ordineDettaglioToDelete.articolo_base_codice + "/" + this.state.ordineDettaglioToDelete.colore_codice   
                          
                          +  (this.state.ordineDettaglioToDelete.colore_codice_2  !== "" ?  "+" +    this.state.ordineDettaglioToDelete.colore_codice_2  : "")
                          +  (this.state.ordineDettaglioToDelete.colore_codice_3  !== "" ?  "+" +    this.state.ordineDettaglioToDelete.colore_codice_3  : "")  
                  
                          
                          + '?'}
                          title="Consegna" />
      }
              

        {!this.state.showStampa && !this.state.showEtichetteStampa &&
          <Consegna_schedaView 
          deleteOrdineDettaglio={this.handleOrdineDettaglioToDelete} 
            elenco_clienti={this.props.elenco_clienti}   
            handleConsegnaAll={this.handleConsegnaAll}
            handleAddOrdine={this.handleAddOrdine}
            bChangedForm={this.state.bChangedForm}
            readOnly={  this.props.readOnly }
            handleStampa={e =>  this.handleShowStampa (true) }
            handleEtichetteStampa={e =>  this.handleShowEtichetteStampa (true) }
            showCliente={this.showCliente} 
            handleChangeFormTestata={this.handleChangeFormTestata}
            handleChangeFormDettaglio={this.handleChangeFormDettaglio}
            applicaSconto={this.applicaSconto}
            handleDelDettaglio={this.handleDelDettaglio}
            handleSaveConsegna={this.handleSaveConsegna}
            isInProgress={this.state.isInProgress}
            formConsegna ={this.state.formConsegna }
            formDataError={this.state.formTestataErrors}  
            arrFormDettaglioErrors={this.state.arrFormDettaglioErrors}  
            
            />            
}  
</>
     
    )}

 
}


function mapStateToProps(state) {
  
  
  return {
    elenco_colori: state.coloriReducer.elenco_colori ,
    elenco_clienti: state.clientiReducer.elenco_clienti ,
    elenco_articoli: state.articoliReducer.elenco_articoli ,
    elenco_provenienze: state.provenienzeReducer.elenco_provenienze ,
  };
}

function mapDispatchToProps(dispatch) {
    return {
 
        
      actShowCliente: async (scheda) => {
        dispatch(clientiActions.showCliente(scheda));
      } ,
    }
  }
 

const appConsegna_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Consegna_schedaPage );
export    { appConsegna_schedaPage as Consegna_scheda } ; 
 

