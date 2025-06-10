  
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
 

export interface IProps { 
   
    scheda: Ordine,
    saveOrdine:any,
    readOnly: boolean ,
    handleDelOrdine: any,
    handleStampaOrdine: any,
    classes: any,
    elenco_colori: Colore[],    
    elenco_clienti: Cliente[],
    elenco_articoli: Articolo[],
    elenco_provenienze: Provenienza[]
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
      this.applicaDataConsegna = this.applicaDataConsegna.bind(this);      
      
    
      let formOrdine =  Object.assign (new Ordine(), {...this.props.scheda});
   
      this.azione = this.props.scheda.ordineDettaglio[0].id_ordine_dettaglio === -1 ? "NEW": "MOD"
       
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
  
    applicaDataConsegna   (dataConsegna) {
   
         
        let formOrdine:Ordine =  Object.assign (new Ordine(), {...this.state.formOrdine});
  
        
        let newDettaglio =  this.state.formOrdine.ordineDettaglio.map ( 
          x => Object.assign(new OrdineDettaglio(), x, {data_consegna:  dataConsegna })); 
          formOrdine.ordineDettaglio  = newDettaglio;
  
        
        this.setState({   formOrdine:  formOrdine  });
     //   console.log("this.state.formOrdine", this.state.formOrdine)
     
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
 
 
   
         if ( event.target.name === "data_ricezione")
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
       
   //  console.log("formDettaglio",formDettaglio)
       //  let dPrezzo  = Number( parseFloat(event.target.value.replace(",","."))) ;
         // (Math.round(dPrezzo * 100) / 100).toFixed(2); 
        if ( event.target.name === "data_ricezione")
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
                    formDettaglio["articolo_base_descrizione"] = articolo?.descrizione;
                    formDettaglio["articolo_base_codice"] = articolo?.codice        
                    
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
            && x.data_consegna === dettaglioDaInserire.data_consegna
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
                    {data_consegna: formDettaglio.data_consegna ,
                        qta: 1,
                        prezzo: formDettaglio.prezzo,
                        id_articolo_base: formDettaglio.id_articolo_base,
                        
                    })) 

                newOrdine.ordineDettaglio[newOrdine.ordineDettaglio.length-1]["articolo_base_descrizione"] = formDettaglio["articolo_base_descrizione"] 

                newOrdine.ordineDettaglio[newOrdine.ordineDettaglio.length-1]["articolo_base_codice"] = formDettaglio["articolo_base_codice"] 
        
            
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

    render() {    
 
 


        return (
 


          <Ordine_schedaView
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
            handleSaveOrdine={this.handleSaveOrdine}
            isInProgress={this.state.isInProgress}
            formOrdine ={this.state.formOrdine }
            applicaDataConsegna={this.applicaDataConsegna }
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
 

