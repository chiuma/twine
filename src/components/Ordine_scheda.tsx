import React  from 'react';

import { connect } from 'react-redux';
 
  
import { OrdineDettaglio, OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import { Colore } from '../model/Colore';
import { Cliente } from '../model/Cliente';
import { Articolo } from '../model/Articolo';
import { Ordine,   OrdineTestataErrors } from '../model/Ordine';
import Ordine_schedaView from '../views/Ordine_schedaView';
import { Provenienza } from '../model/Provenienza';
import { CommonFunctions } from '../common/CommonFunctions';
import {NotificationManager} from 'react-notifications'; 


export interface IProps { 
   
    scheda: Ordine,
    saveOrdine:any,
    readOnly: boolean ,
    handleDelOrdine: any | null,
    handleStampaOrdine: any | null,
    classes: any,
    elenco_colori: Colore[],    
    elenco_clienti: Cliente[],
    elenco_articoli: Articolo[],
    elenco_provenienze: Provenienza[] 
    isMobile:boolean,
}
   
export interface IState { 
 
    isInProgress: boolean,
    bChangedForm: boolean,
   
    
    arrFormDettaglioErrors:  OrdineDettaglioErrors[]
    formTestataErrors:  OrdineTestataErrors  
     
    formOrdine : Ordine ,

}

 

 
type OptionsAzione = "NEW" | "MOD"  ;
class Ordine_schedaPage  extends React.Component <IProps,IState> {
    precForm : string = '';
    azione:  OptionsAzione  =  "NEW";
    
    constructor(props: any) {
      super(props);  
      this.handleSaveOrdine = this.handleSaveOrdine.bind(this);
      this.handleAddDettaglio = this.handleAddDettaglio.bind(this);
      this.handleDelDettaglio = this.handleDelDettaglio.bind(this);
      this.handleEvadiAll = this.handleEvadiAll.bind(this);      
      this.handleScan = this.handleScan.bind(this);    
      
 
      let formOrdine =  Object.assign (new Ordine(), {...this.props.scheda});
   
      this.azione = this.props.scheda.id_ordine === -1 ? "NEW": "MOD"
       
      if (this.azione === "NEW")
      { 
        formOrdine.data_ricezione = CommonFunctions.getDateNowFormatted();
        
      }
      

      this.state={           
            isInProgress: true, bChangedForm: false, 

            formOrdine : formOrdine,
            
          

            formTestataErrors: new OrdineTestataErrors(),
            arrFormDettaglioErrors:  this.props.scheda.ordineDettaglio.map (x => new OrdineDettaglioErrors()) ,

        }
        
        
    }
 
 
    componentDidMount()
    { 
        
        let thisOrdine = Object.assign ( {}, this.state.formOrdine, {ordineDettaglio : [...this.state.formOrdine.ordineDettaglio.slice(0,this.state.formOrdine.ordineDettaglio.length-1) ] } );
     
        this.precForm  =  JSON.stringify(thisOrdine ) ;
 

        this.setState({    isInProgress: false  });
         

    }
 

    handleEvadiAll(event)
    {
           
            let formOrdine =  Object.assign (new Ordine(), {...this.state.formOrdine});

            
            let newOrdineDettaglio =  this.state.formOrdine.ordineDettaglio.map ( x => Object.assign( new OrdineDettaglio(x), {evaso:  true })); 
            formOrdine.ordineDettaglio  = newOrdineDettaglio;

            
              
            this.setState({   formOrdine:  formOrdine, bChangedForm: true  });
             
    }

    handleSaveOrdine (event)
    {
        if ( event === null) this.props.saveOrdine (null)
        else
        {
 
     
            let arrFormDettaglioErrors :  OrdineDettaglioErrors[] = [];        
            let formTestataErrors = new OrdineTestataErrors();
            var bValido = this.state.formOrdine.validateForm(formTestataErrors);
            let numRighe = this.state.formOrdine.ordineDettaglio.length - 1
            for (let i=0; i<numRighe; i++ )
            {
                let formDettaglioaErrors = new OrdineDettaglioErrors();
            
                if (!this.state.formOrdine.ordineDettaglio[i].validateForm(formDettaglioaErrors))
                {
                    bValido= false;
                }
                

                arrFormDettaglioErrors.push(formDettaglioaErrors)
            }
            arrFormDettaglioErrors.push(new OrdineDettaglioErrors())


            if (!bValido)
            {
                this.setState({ formTestataErrors : formTestataErrors, 
                            arrFormDettaglioErrors: arrFormDettaglioErrors });
            }
            else
            {
                let ordine = Object.assign(new Ordine(), this.state.formOrdine);
                ordine.ordineDettaglio = ordine.ordineDettaglio.slice(0,-1)
 
                this.props.saveOrdine (ordine)
            }
        }
         
    }

    handleChangeFormTestata = (event) => {
        const { formOrdine } = this.state;
 
 
   
         if ( event.target.name === "data_ricezione" || event.target.name === "data_consegna")
            formOrdine[event.target.name] = event.target.value.replaceAll("-","/") ;
         else
            formOrdine[event.target.name] = event.target.value;
       
     

        let changed = false; 
        if (JSON.stringify(Object.assign ( {}, formOrdine, {ordineDettaglio : [...formOrdine.ordineDettaglio.slice(0,formOrdine.ordineDettaglio.length-1) ] } )) !== this.precForm ) 
        { 
          changed = true;
        } 
        
        this.setState({ formOrdine: formOrdine ,  bChangedForm: changed  });
         
    }  

 
    handleChangeFormDettaglio = (event, idx) => {
  


        const formDettaglio = this.state.formOrdine.ordineDettaglio[idx];
 
 
        if ( event.target.name === "data_ricezione" ||  event.target.name === "data_consegna")
        {
            formDettaglio[event.target.name] = event.target.value.replaceAll("-","/") ;
        }
 
        else if ( event.target.name === "id_colore_2")
        {
            if ( event.target.value === -1) 
            {
                formDettaglio["id_colore_3"]  = -1
                
            }   
            formDettaglio["id_colore_2"]  = event.target.value;
        }
         else if ( event.target.name === "id_articolo_base")
         {
           
                let articolo = this.props.elenco_articoli.find(x => x.id_articolo_base === event.target.value)
                if ( articolo != null)
                {
                    formDettaglio["prezzo"]  = articolo.prezzo 
                   
                    formDettaglio["articolo_base_codice"] = articolo?.codice        
                    formDettaglio["articolo_base_descrizione"] = articolo?.descrizione  
                    
                }
                else
                {
                     
                    formDettaglio["articolo_base_descrizione"] = "";
                    formDettaglio["articolo_base_codice"] = ""       
                    formDettaglio["prezzo"]  = 0;
                }

                    

                formDettaglio[event.target.name] = event.target.value;
                    
         }
         else
            formDettaglio[event.target.name] = event.target.value;
       
     

        let changed = false; 
        if (JSON.stringify(Object.assign ( {}, this.state.formOrdine, {ordineDettaglio : [...this.state.formOrdine.ordineDettaglio.slice(0,this.state.formOrdine.ordineDettaglio.length-1) ] } )) !== this.precForm ) 
        { 
          changed = true;
        } 
        
        this.setState({  bChangedForm: changed  });
        
    }  

    
    handleAddDettaglio (event)
    {
       

        let dettaglioDaInserire = this.state.formOrdine.ordineDettaglio[this.state.formOrdine.ordineDettaglio.length-1];
        let arrFormDettaglioErrors = [...this.state.arrFormDettaglioErrors];
        let formDettaglioaErrors = new OrdineDettaglioErrors();
 
        let idx = this.state.formOrdine.ordineDettaglio.findIndex (x => 
            x.id_articolo_base === dettaglioDaInserire.id_articolo_base 
            && x.id_colore === dettaglioDaInserire.id_colore
            && x.id_colore_2 === dettaglioDaInserire.id_colore_2
            && x.id_colore_3 === dettaglioDaInserire.id_colore_3 
            ) ; 
        
        if (idx !== -1 && idx !==  this.state.formOrdine.ordineDettaglio.length-1)
        {
            formDettaglioaErrors.id_articolo_base = "Articolo già esistente"
            arrFormDettaglioErrors[arrFormDettaglioErrors.length-1 ] = formDettaglioaErrors;
            this.setState({ arrFormDettaglioErrors : arrFormDettaglioErrors  });
        }
        else
        {
            let newOrdine:Ordine =   Object.assign (new Ordine(),  this.state.formOrdine);

        
            let formDettaglio = newOrdine.ordineDettaglio[newOrdine.ordineDettaglio.length-1];
            
            
            if (formDettaglio.validateForm(formDettaglioaErrors))
            {
                arrFormDettaglioErrors[arrFormDettaglioErrors.length-1] =  new OrdineDettaglioErrors();
                arrFormDettaglioErrors.push(formDettaglioaErrors);


                newOrdine.ordineDettaglio.push(new OrdineDettaglio(
                    { 
                        qta: 1,
                        prezzo: formDettaglio.prezzo,
                        id_articolo_base: formDettaglio.id_articolo_base,
                        
                    })) 

                newOrdine.ordineDettaglio[newOrdine.ordineDettaglio.length-1]["articolo_base_descrizione"] = formDettaglio["articolo_base_descrizione"] 

                newOrdine.ordineDettaglio[newOrdine.ordineDettaglio.length-1]["articolo_base_codice"] = formDettaglio["articolo_base_codice"] 
                NotificationManager.success('Aggiunto articolo ' + (newOrdine.ordineDettaglio.length-1) , 'Ordini',  1500);  
       
            
            }
            else
            {
                arrFormDettaglioErrors[arrFormDettaglioErrors.length-1 ] = formDettaglioaErrors
            }

            let changed = false; 
            if (JSON.stringify(Object.assign ( {}, newOrdine, {ordineDettaglio : [...newOrdine.ordineDettaglio.slice(0,newOrdine.ordineDettaglio.length-1) ] } )) !== this.precForm ) 
            { 
              changed = true;
            } 
            this.setState({ arrFormDettaglioErrors : arrFormDettaglioErrors ,    formOrdine:  newOrdine, bChangedForm: changed  });
        
        }

    }
     
 

    handleDelDettaglio(idx)
    {
     
        let newOrdine:Ordine =   Object.assign (new Ordine(),  this.state.formOrdine);
        let newArrFormDettaglioErrors =[ ...this.state.arrFormDettaglioErrors.slice(0, idx),    ...this.state.arrFormDettaglioErrors.slice(idx+ 1) ] ;
        newOrdine.ordineDettaglio = [ ...newOrdine.ordineDettaglio.slice(0, idx),    ...newOrdine.ordineDettaglio.slice(idx+ 1) ] ;
    


        let changed = false; 
        if (JSON.stringify(Object.assign ( {}, newOrdine, {ordineDettaglio : [...newOrdine.ordineDettaglio.slice(0,newOrdine.ordineDettaglio.length-1) ] } )) !== this.precForm ) 
        { 
          changed = true;
        } 

        this.setState({ arrFormDettaglioErrors : newArrFormDettaglioErrors ,
            formOrdine: newOrdine , bChangedForm: changed  });
       
    }

    handleScan (scan:string)
    {
        
        if (!scan.startsWith('ART-') && !!scan.startsWith('COL-')) {
       
            NotificationManager.error("QR Code non valido", 'Ordine', 2000);  
            return;
        }

        const formDettaglio = this.state.formOrdine.ordineDettaglio[this.state.formOrdine.ordineDettaglio.length-1];
        const parts = scan.split('*');
        const prefix = parts[0] || '';  

 

        if ( prefix === 'ART')
        {
            const cod_art = parts[1] || '';
            const cod_colore = parts[2] || '';
            const cod_colore_2 = parts[3] || '';
            const cod_colore_3 = parts[4] || '';

            let articolo_base = this.props.elenco_articoli.find( x => x.codice === cod_art) 
            let id_colore = this.props.elenco_colori.find( x => x.codice === cod_colore)?.id_colore || -1;;
            let id_colore_2 = this.props.elenco_colori.find( x => x.codice === cod_colore_2)?.id_colore || -1;;
            let id_colore_3 = this.props.elenco_colori.find( x => x.codice === cod_colore_3)?.id_colore || -1;
    

            
            
            if ( articolo_base != null)
            {
                formDettaglio["id_colore"]  = id_colore;
                formDettaglio["id_colore_2"]  = id_colore_2;
                formDettaglio["id_colore_3"]  = id_colore_3;
                
                formDettaglio["id_articolo_base"]  = articolo_base.id_articolo_base;
                formDettaglio["prezzo"]  = articolo_base.prezzo 
                formDettaglio[""] = articolo_base?.descrizione;
                formDettaglio["articolo_base_codice"] = articolo_base?.codice        
                formDettaglio["articolo_base_descrizione"] = articolo_base?.descrizione 
                this.setState({  formOrdine: this.state.formOrdine  }); 
              //  NotificationManager.success("QR: " + scan, 'Ordine', 2000);  
            }
            else
            {
                NotificationManager.error("QR Code non corrispondente", 'Ordine', 2000);  
                formDettaglio["id_articolo_base"]  = -1;
                formDettaglio["articolo_base_descrizione"] = "";
                formDettaglio["articolo_base_codice"] = ""       
                formDettaglio["prezzo"]  = 0;
            }
     
            

        }
        
        else if ( prefix === 'COL')
        {
          
            const cod_colore = parts[1] || ''; 
            let id_colore = this.props.elenco_colori.find( x => x.codice === cod_colore)?.id_colore || -1;;
            if (id_colore !== -1)
            {
                if ( formDettaglio["id_colore"] == -1)
                    formDettaglio["id_colore"] = id_colore
                else if ( formDettaglio["id_colore_2"] == -1)
                    formDettaglio["id_colore_2"] = id_colore
                else if ( formDettaglio["id_colore_3"] == -1)
                    formDettaglio["id_colore_3"] = id_colore
                 

                this.setState({  formOrdine: this.state.formOrdine  });
                NotificationManager.success("QR COLORE: " + scan, 'Ordine', 2000);  
            }
            else
            {
                NotificationManager.error("QR Code non corrispondente", 'Ordine', 2000);  


            }

        }

    }

    render() {    
 
 


        return (
 


          <Ordine_schedaView
            handleScan={this.handleScan}
            isMobile={this.props.isMobile}
            elenco_colori={this.props.elenco_colori} 
            elenco_clienti={this.props.elenco_clienti} 
            elenco_articoli={this.props.elenco_articoli} 
            elenco_provenienze={this.props.elenco_provenienze} 
            azione = {this.azione}
            bChangedForm={this.state.bChangedForm}
            readOnly={  this.props.readOnly }
            handleEvadiAll= {this.handleEvadiAll}
            handleStampaOrdine={this.props.handleStampaOrdine}
            handleDelOrdine={this.props.handleDelOrdine}
            handleChangeFormTestata={this.handleChangeFormTestata}
            handleChangeFormDettaglio={this.handleChangeFormDettaglio}
            handleAddDettaglio={this.handleAddDettaglio}
            handleDelDettaglio={this.handleDelDettaglio}
        // handleSaveOrdine={e=>  this.handleScan ("ART-1CN01-ARCO")}
           handleSaveOrdine={this.handleSaveOrdine }
            isInProgress={this.state.isInProgress}
            formOrdine ={this.state.formOrdine } 
            formDataError={this.state.formTestataErrors}  
            arrFormDettaglioErrors={this.state.arrFormDettaglioErrors}  
            
            />            
           



  
     
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
 
        
          
    }
  }
 

const appOrdine_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Ordine_schedaPage );
export    { appOrdine_schedaPage as Ordine_scheda } ; 
 

