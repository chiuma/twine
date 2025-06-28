import React  from 'react';
 
import { OrdineDettaglio } from '../model/OrdineDettaglio';
 

 
import {   Box, CircularProgress, Radio, RadioGroup, FormControlLabel, FormLabel   } from '@mui/material';

 
import { connect } from 'react-redux';
// import { Ordine_scheda } from './Ordine_scheda';
import { Ordini_elencoFiltriView } from '../views/Ordini_elencoFiltriView';
import { ConfirmFialog } from '../utils/ConfirmDialog';
import { ordiniServices } from '../services/ordiniServices';
import {NotificationManager} from 'react-notifications'; 
 
import { Cliente } from '../model/Cliente';
import { Ordine_scheda } from './Ordine_scheda';
import { Ordine, OrdineFiltri } from '../model/Ordine';
 
import { Articolo } from '../model/Articolo';
import { Colore } from '../model/Colore';
import { Ordini_elencoHeaderView } from '../views/Ordini_elencoHeaderView';
import { Provenienza } from '../model/Provenienza';
 
import { ConstantUtils } from '../ConstantUtils';
import { StampaHtml } from '../utils/StampaHtml';
import Ordini_elenco_dettaglioView from '../views/Ordini_elenco_dettaglioView';
import Ordini_elenco_testataView from '../views/Ordini_elenco_testataView';
 import { CommonFunctions } from '../common/CommonFunctions';
import { CustomComponents } from '../utils/CustomComponents';
 
 
  
function objectToQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        }
    }
    return searchParams.toString();
}
 
export interface IProps { 
  elenco_colori: Colore[],    
  elenco_clienti: Cliente[],
  elenco_articoli: Articolo[],
  elenco_provenienze: Provenienza[],
  isMobile:boolean
 
  
  }
     
export interface IState { 
 

    elenco_filtrato:  any, 
    isInProgress: boolean,
    isEditMode: boolean,
    showStampa: boolean,
    ordineSelected: any  | null,
    ordineDettaglioToDelete:  any | null,
    ordineToDelete:  any | null,
    conPrezzo: "si"|"no" | null,
  
  }

 
type OptionsTipoElenco = "dettaglio" | "testata"  ;
class Ordini_elencoPage  extends React.Component <IProps,IState> {
    _isMounted = false;
    lastFiltri : OrdineFiltri =  new OrdineFiltri();
    elenco_ordini: any;
    componentRef: any;
    tipo_elenco: OptionsTipoElenco = "testata";
    tipo_stampa: any="";

    constructor(props: any) {
      super(props);  
      this.handleExecRicerca = this.handleExecRicerca.bind(this);
       
      this.handleOrdineDettaglioSelected = this.handleOrdineDettaglioSelected.bind(this);
      this.handleOrdineDettaglioToDelete = this.handleOrdineDettaglioToDelete.bind(this);
      this.handleOrdineToDelete = this.handleOrdineToDelete.bind(this);
      this.execDeleteOrdine = this.execDeleteOrdine.bind(this);      
      
      this.execDeleteOrdineDettaglio = this.execDeleteOrdineDettaglio.bind(this);
      this.loadOrdini = this.loadOrdini.bind(this);
      
      this.saveOrdine = this.saveOrdine.bind(this);
      this.handleShowStampa = this.handleShowStampa.bind(this);
      this.handleChangeTipoElenco = this.handleChangeTipoElenco.bind(this);
      
      this.handleChangeForm = this.handleChangeForm.bind(this);

 
      this.state = {  
        elenco_filtrato: [], isInProgress: false , isEditMode: true, ordineSelected:null  , 
        ordineDettaglioToDelete:null , ordineToDelete:null, showStampa: false ,  conPrezzo: null
        }; 


  //    this.lastFiltri.data_consegna_dal =  CommonFunctions.getDateInzioFormatted();
    }


    componentWillUnmount() {
      this._isMounted = false;
    }
   

    componentDidMount()
    { 
      this._isMounted = true;
       
      this.loadOrdini();
      
      

  //    console.log("Ordini_elencoPage componentDidMount - START "  );
      
    }

    
    componentDidUpdate(prevProps) 
    {

    }

    
    handleShowStampa(showStampa:boolean, tipo_stampa:string)
    {
 
      
      this.tipo_stampa = tipo_stampa;
      this.setState({ showStampa: showStampa  , conPrezzo: !showStampa ? null : this.state.conPrezzo });   
 
    }

    async loadOrdini()
    {
 
      if (!this._isMounted)  return;
      
       this.setState({  isInProgress: true }); 
      let resp = await ordiniServices.getElenco(this.lastFiltri.data_consegna_dal , this.lastFiltri.data_consegna_al);
      this.setState({  isInProgress: false }); 
  
     
      if ( resp.esito === "OK" )
      {
       

       this.elenco_ordini =  resp.elenco; 

     //  console.log("loadOrdini elenco_ordini" , this.elenco_ordini);

       if (this._isMounted) 
       {
        
        this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri)   }); 
       }
     
       
      }
      else
      {
         
        NotificationManager.error('Errore server', 'Ordini', 3000); 
        return;
      }
    }


    getOrdineDettaglioAggiornato (objOrdineTestata:any, objOrdineDettaglio:any)
    {
      let clienteSel  = this.props.elenco_clienti.find (x => x.id_cliente === objOrdineTestata.id_cliente ) ;
      let coloreSel  = this.props.elenco_colori.find (x => x.id_colore === objOrdineDettaglio.id_colore ) ;

      let coloreSel_2  = objOrdineDettaglio.id_colore_2 === -1 ? null : this.props.elenco_colori.find (x => x.id_colore === objOrdineDettaglio.id_colore_2 ) ;
      let coloreSel_3  = this.props.elenco_colori.find (x => x.id_colore === objOrdineDettaglio.id_colore_3) ;

      let articoloSel  = this.props.elenco_articoli.find (x => x.id_articolo_base === objOrdineDettaglio.id_articolo_base ) ;
 
      let ris = {
        ...objOrdineDettaglio , 
        ...{note: objOrdineTestata.note, user_new: objOrdineTestata.user_new, data_ricezione: objOrdineTestata.data_ricezione,data_consegna: objOrdineTestata.data_consegna,  id_provenienza: objOrdineTestata.id_provenienza, 
            id_cliente: objOrdineTestata.id_cliente , id_ordine: objOrdineTestata.id_ordine},
        ...{ colore_codice: coloreSel?.codice,    colore_descrizione: coloreSel?.descrizione },
        ...{ colore_codice_2: coloreSel_2==null ? "" : coloreSel_2.codice,    colore_descrizione_2: coloreSel_2==null ? "" : coloreSel_2.descrizione },
        ...{ colore_codice_3: coloreSel_3==null ? "" : coloreSel_3.codice,    colore_descrizione_3: coloreSel_3==null ? "" : coloreSel_3.descrizione },
        ...{ articolo_base_descrizione: articoloSel?.descrizione, articolo_base_codice: articoloSel?.codice },
        ...{ cliente_descrizione: clienteSel?.descrizione}
        }
 console.log("ris", ris)
        return ris;

    }


    async saveOrdine(ordine:Ordine)
    {
    
      if (ordine === null)
      {
        this.setState({ ordineSelected:null  }); 
      }
      else
      {

        this.setState({  isInProgress: true }); 
        let campiTestata = { id_cliente: ordine.id_cliente, 
                             id_ordine: ordine.id_ordine, 
                             note: ordine.note, 
                             user_new: ordine.user_new, 
                            data_ricezione : ordine.data_ricezione, 
                             data_consegna : ordine.data_consegna, 
                            id_provenienza: ordine.id_provenienza  }
        let arrDettagli:any  [] = [];
        ordine.ordineDettaglio.map ( (dettaglio:OrdineDettaglio) =>
        { 
          arrDettagli.push( {...dettaglio , ...campiTestata})
        });
  

        let ris = await ordiniServices.modScheda( ordine  );
        this.setState({  isInProgress: false });
        if ( ris.esito === "OK")
        { 
          NotificationManager.success('Operazione eseguita con successo.' , 'Ordini', 3000);  
       
             
          // Aggiornamento elenco
          ris.dettagli.forEach( 
            (dettaglio) =>
            {
              let idx =  this.elenco_ordini.findIndex( x => x.id_ordine_dettaglio  === dettaglio.id_ordine_dettaglio);
              if (idx !== -1)
              {
                this.elenco_ordini[idx] = { ...this.getOrdineDettaglioAggiornato (ris.testata, dettaglio) , ...{consegnato: this.elenco_ordini[idx].consegnato}};
                console.log("saveOrdine",ris.testata,  this.elenco_ordini[idx])
              }
              else
              {
                this.elenco_ordini.push({ ...this.getOrdineDettaglioAggiornato (ris.testata, dettaglio) , ...{consegnato: false}})
              }
            });
 
     
            this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri ), ordineSelected: null   }); 
           // console.log("elenco_ordini", this.elenco_ordini)
        }
        else
        {
         
            this.setState({ isInProgress: false })   ;
            let mex = ""
            if (ris.err_code === "001" )
              mex = "Errore server."; 
            else
              mex = "Errore durante l'elaborazione.";
            NotificationManager.error(mex, 'Ordini', 3000);  

        }
  
   
      }
    }

    
    async handleExecRicerca   (formFilter: OrdineFiltri)
    {

 
      if ( this.lastFiltri.data_consegna_dal !== formFilter.data_consegna_dal || this.lastFiltri.data_consegna_al !== formFilter.data_consegna_al)
      {
        if ( CommonFunctions.isValidYear (this.lastFiltri.data_consegna_dal) &&  CommonFunctions.isValidYear (this.lastFiltri.data_consegna_al) )
        { 
          this.lastFiltri = formFilter;     
          
          await this.loadOrdini();
        }
          
      
        
      }
  
        this.lastFiltri = formFilter;      
        this.setState({ elenco_filtrato: this.getElencoFilter(formFilter)   }); 
        
    
    }

    getElencoFilter   (formFilter: OrdineFiltri)
    {      
       
      let filtroDataConsegnaDal =  formFilter.data_consegna_dal.toLocaleUpperCase().replaceAll("-","/") ;
      let filtroDataConsegnaAl =   formFilter.data_consegna_al.toLocaleUpperCase().replaceAll("-","/") ;


      let filtroDataRicezioneAl =  formFilter.data_ricezione_al.toLocaleUpperCase().replaceAll("-","/") ;
      let filtroDataRicezioneDal =   formFilter.data_ricezione_dal.toLocaleUpperCase().replaceAll("-","/") ;
      

      let filtroIdCliente =   formFilter.id_cliente ;
      let filtroIdArticoloBase =   formFilter.id_articolo_base ;
      let filtroEvaso =   formFilter.evaso ;
      let filtroConsegnato =   formFilter.consegnato;
      let filtroIdProvenienza=   formFilter.id_provenienza ;
      let filtroInizialiCliente=   formFilter.iniziali_cliente.toLocaleUpperCase ();
       

      if (this.elenco_ordini)
      {
        let elenco_filtrato = this.elenco_ordini.filter
        (
          (curr: any) => 
          {
          
              var ris = true;

              if ( filtroInizialiCliente !== "")
              {
                  if ( !curr.cliente_descrizione.toLocaleUpperCase().startsWith (filtroInizialiCliente ) )
                
                  return false;
              }  




              if (this.tipo_elenco === "dettaglio" )
              {

                if ( filtroConsegnato !== "Tutti")
                {
                  if ( curr.consegnato  ===   (filtroConsegnato=== "Si" ? false : true))
                  {
                    return false;
                  }
                    
                }  

                if ( filtroIdArticoloBase !== -1)
                {
                  
                  if ( curr.id_articolo_base  !==   filtroIdArticoloBase  )
                  {
                    return false;
                  }
                } 


                if ( filtroEvaso !== "Tutti")
                {
                  if ( curr.evaso  ===   (filtroEvaso === "Si" ? false : true))
                  {
                    return false;
                  }
                    
                }  





                if ( filtroDataConsegnaDal !== "")
                {
                  if ( curr.data_consegna.substring(0,10)  <   filtroDataConsegnaDal   )
                  {
                    return false;
                  }
                    
                }  

                if ( filtroDataConsegnaAl !== "")
                {
                  
                  if ( curr.data_consegna.substring(0,10)  >   filtroDataConsegnaAl  )
                  {
                    return false;
                  }
                } 
              }

              if ( filtroDataRicezioneDal !== "")
              {
                if ( curr.data_ricezione.substring(0,10)  <   filtroDataRicezioneDal   )
                {
                  return false;
                }
                  
              }  
   
              if ( filtroDataRicezioneAl !== "")
              {
                
                if ( curr.data_ricezione.substring(0,10)  >   filtroDataRicezioneAl  )
                {
                  return false;
                }
              } 

              if ( filtroIdProvenienza !== -1)
              {
                
                if ( curr.id_provenienza  !==   filtroIdProvenienza  )
                {
                  return false;
                }
              } 


              if ( filtroIdCliente !== -1)
              {
                
                if ( curr.id_cliente  !==   filtroIdCliente  )
                {
                  return false;
                }
              } 
              
              return ris;
          }
        )


        if (this.tipo_elenco === "dettaglio" )
        {
            
        }
        else if (this.tipo_elenco === "testata" )
        {
   
          let elenco_filtrato_parziale =  this.getElencoTestate (elenco_filtrato)   ; 
 
          if ( formFilter.consegnato.toLocaleLowerCase() !== "tutti")
          {
            let bConsegnato = formFilter.consegnato.toLocaleLowerCase()  === "si" ? true : false;
            
            elenco_filtrato = elenco_filtrato_parziale.filter
            (
              (curr: any) => 
              {
                if (curr.consegnato === bConsegnato) return true;
                else return false;
              }
            )
          }
          else
          {
            elenco_filtrato = elenco_filtrato_parziale;
          }


         
        }
        
        return elenco_filtrato;

      }
      else return [];
    }

 

    handleOrdineDettaglioSelected (scheda:any |null)
    {
      let ordineSelected = new Ordine();
  
      if ( scheda != null)
      {
        ordineSelected.id_ordine = scheda.id_ordine;
        ordineSelected.id_cliente = scheda.id_cliente;
        ordineSelected.note = scheda.note;
        ordineSelected.user_new = scheda.user_new;
        
        ordineSelected.data_ricezione = scheda.data_ricezione;
        ordineSelected.data_consegna = scheda.data_consegna;
        ordineSelected.id_provenienza = scheda.id_provenienza;
        this.elenco_ordini.forEach((dettaglio:any) =>
        { 
           
          if (dettaglio.id_ordine === scheda.id_ordine )
          {
            
            ordineSelected.ordineDettaglio.push (new OrdineDettaglio(dettaglio))
          
          }
        });
        ordineSelected.ordineDettaglio.push (new OrdineDettaglio())
         
        

      }
      else
      {
        ordineSelected.ordineDettaglio.push (new OrdineDettaglio( ))
      }

      this.setState({ ordineSelected: ordineSelected   }); 
    }

 
    handleOrdineDettaglioToDelete (scheda:OrdineDettaglio|null)
    {
    
      this.setState({ ordineDettaglioToDelete: scheda   }); 
    }

    handleOrdineToDelete (scheda)
    {
     
     this.setState({ ordineToDelete: scheda   }); 
    
    }

    async execDeleteOrdine    ( )
    {
      if(this.state.ordineToDelete === null  ) return;
      let id_ordine  = this.state.ordineToDelete.id_ordine;
      this.handleOrdineDettaglioToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await ordiniServices.deleteOrdine(id_ordine);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
        let elenco_filtrato = this.elenco_ordini.filter
        (
          (curr: any) => 
          {
               
              if ( id_ordine !== curr.id_ordine) return true;
              
              else      return false;
          }
        )
         
   
          this.elenco_ordini = elenco_filtrato;
          this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri) , ordineSelected: null , ordineToDelete: null }); 
    
          NotificationManager.success('Operazione eseguita con successo.' , 'Ordini', 3000);  
  
      }
      else
      {
  
          let mex = ""
          if (ris.err_code === "001" )
            mex = "Errore server.";
          else if (ris.err_code === "002" )
            mex = "Impossibile eliminare l'Ordine perchè risulta avere articoli consegnati.";
          else
            mex = "Errore durante l'elaborazione.";
          
          this.setState({ ordineToDelete: null   });
          NotificationManager.error(mex, 'Ordini', 3000);  

      }
    }
   
    async execDeleteOrdineDettaglio    ( )
    {
       
      if(this.state.ordineDettaglioToDelete === null  ) return;

      let id_ordine_dettaglio = this.state.ordineDettaglioToDelete.id_ordine_dettaglio;
      this.handleOrdineDettaglioToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await ordiniServices.deleteScheda(id_ordine_dettaglio);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
           
        let idx = this.elenco_ordini.findIndex( (x :any) => x.id_ordine_dettaglio === id_ordine_dettaglio);
        if (idx !== -1)
        {
          this.elenco_ordini = [...this.elenco_ordini.slice(0, idx), ...this.elenco_ordini.slice(idx+ 1) ] ;
          this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri)   }); 
        }
        NotificationManager.success('Operazione eseguita con successo.' , 'Ordini', 3000);  
  
      }
      else
      {
  
        let mex = ""
        if (ris.err_code === "001" )
          mex = "Errore server.";
        else if (ris.err_code === "002" )
          mex = "Impossibile eliminare l'Ordine dell'articolo perchè risulta consegnato.";
        else
          mex = "Errore durante l'elaborazione.";
        
        this.setState({ ordineToDelete: null   });
        NotificationManager.error(mex, 'Ordini', 3000);  

      }
    }
 
    getElencoTestate(elenco_filtrato:any )
    {
      let elenco_testate:any = [];
      let precIdOrdine = -1;
      let importoTotale =0;
      let qtaTotale =0;
      let consegnato = true;

       
      
      elenco_filtrato.sort ( (x,y) =>     
      {
       
       if (x.id_ordine < y.id_ordine ) return -1
       else return 1;
        
      })    


     
  
      elenco_filtrato     
      .forEach(ordineDettaglio => 
        {
  
            if (precIdOrdine !==  ordineDettaglio.id_ordine)
            {
              if (precIdOrdine !== -1)
              {
                elenco_testate[elenco_testate.length-1].qta = qtaTotale;
                elenco_testate[elenco_testate.length-1].importo_totale = importoTotale;
                elenco_testate[elenco_testate.length-1].consegnato = consegnato;
                
                qtaTotale = 0; importoTotale=0; consegnato = true;
              }

              elenco_testate.push({
                  id_ordine: ordineDettaglio.id_ordine, 
                  data_ricezione: ordineDettaglio.data_ricezione,
                  data_consegna: ordineDettaglio.data_consegna,
                  id_provenienza: ordineDettaglio.id_provenienza,
                  note: ordineDettaglio.note,
                  user_new: ordineDettaglio.user_new,
                  
                  cliente_descrizione: ordineDettaglio.cliente_descrizione,
                  id_cliente: ordineDettaglio.id_cliente})

              precIdOrdine = ordineDettaglio.id_ordine;
            }

            qtaTotale = qtaTotale + ordineDettaglio.qta;
            importoTotale = importoTotale + ordineDettaglio.qta*ordineDettaglio.prezzo;
            consegnato = consegnato && ordineDettaglio.consegnato
        
        });

      if (precIdOrdine !== -1)
      {
        elenco_testate[elenco_testate.length-1].qta = qtaTotale; 
        elenco_testate[elenco_testate.length-1].importo_totale = importoTotale;
        elenco_testate[elenco_testate.length-1].consegnato = consegnato;
      }
      return elenco_testate;
    }


    handleChangeTipoElenco(tipo_elenco:OptionsTipoElenco)
    {
       
      this.tipo_elenco = tipo_elenco; 
      this.setState({ elenco_filtrato:   this.getElencoFilter(this.lastFiltri)    });  

    }  
   
    handleChangeForm = (event) => {
      const { conPrezzo } = this.state;
   
  
   
      this.setState({ conPrezzo: event.target.value });
      
    }  
    render() {    
   
// console.log("OrdiniElenco - render - this.lastFiltri" , this.lastFiltri)
      
 
      const finalQueryString = this.tipo_stampa !== "singolo_ordine"
            ? objectToQueryString(this.lastFiltri)
            : objectToQueryString({ id_ordine: this.state.ordineSelected.id_ordine , conPrezzo: this.state.conPrezzo });
          return (
            <Box width="100%" display="flex" flexDirection="column" alignItems="center"  justifyContent="center"  > 
  

      {this.state.showStampa &&
              <Box mt={2} ml={1} mr={1}>
          
  {this.state.conPrezzo == null  && this.tipo_stampa == "singolo_ordine" ?
    <>
      <FormLabel component="legend" style={{color:'red', fontWeight:'bold'}} >Stampa prezzi</FormLabel>
      <RadioGroup
          row
          aria-label="conPrezzo"
          name="conPrezzo"
          value={this.state.conPrezzo === null ? '' : this.state.conPrezzo}
          onChange={(event:any) => {
              const value = event.target.value === '' ? null : event.target.value;
              this.handleChangeForm({ target: { name: 'conPrezzo', value } });
          }} >
          <FormControlLabel value="si" control={<Radio size="small" />} label="Si" />
          <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
      </RadioGroup>
    </>
    :
    <>
      <StampaHtml 
          handleShowStampa={this.handleShowStampa}
            urlToPrint={ConstantUtils.url.SERVER_URL + 
            (this.tipo_stampa === "dettaglio" ? "ordini_dettaglio_stampa.php?" :  
            this.tipo_stampa === "testata" ?        "ordini_stampa.php?" : 
            this.tipo_stampa === "singolo_ordine" ?        "ordine_singolo_stampa.php?" : 
            "ordini_articoli_stampa.php?")
            + 
            finalQueryString
            }
        />
    </>
  }
                </Box>
              }

      {!this.state.showStampa &&
      <>
              {this.state.ordineDettaglioToDelete !== null &&
                <ConfirmFialog
                          handleConfirm={this.execDeleteOrdineDettaglio}
                          handleAnnulla={() => { this.handleOrdineDettaglioToDelete(null)}}
                          contextText={"Sei sicuro di vole cancellare l'Ordine "       
                          +
                          " dell'articolo "+  this.state.ordineDettaglioToDelete.articolo_base_codice + "-" + this.state.ordineDettaglioToDelete.colore_codice 
                          + " del cliente "+  this.state.ordineDettaglioToDelete.cliente_descrizione                           
                          + '?'}
                          title="Ordini" />
              }

              {this.state.ordineToDelete !== null &&
                <ConfirmFialog
                          handleConfirm={this.execDeleteOrdine }
                          handleAnnulla={() => { this.handleOrdineToDelete(null)}}
                          contextText={"Sei sicuro di vole cancellare l'Ordine"                      
                          + '?'}
                          title="Ordini" />
              }


              {this.state.isInProgress  &&

              <Box mt={2}>
                  <CircularProgress color="primary" />
              </Box>
              }

              { this.state.ordineSelected === null &&
              
               <>
 
              <Box  id="filtri"   
              sx={{ width: {xs:'98%', sm: '98%', md: '98%', lg: '96%', xl: '90%' }, mt: 2 }}
                     mt={2}> 
               
                  <Ordini_elencoFiltriView  
                      tipo_elenco   ={this.tipo_elenco}   
                      elenco_clienti = {this.props.elenco_clienti}
                      elenco_articoli = {this.props.elenco_articoli}
                      elenco_provenienze = {this.props.elenco_provenienze}
                      initFiltri={this.lastFiltri}   
                      handleExecRicerca={this.handleExecRicerca}   />
              </Box>       
              
            
              <Box mt={2}  width={{ xs:'98%', sm: '98%' , md: '98%', lg: '96%', xl: '90%'}} >            
                
                <Ordini_elencoHeaderView     
                      isMobile={this.props.isMobile}
                      elenco = {this.state.elenco_filtrato}  
                      handleStampaOrdine={this.handleShowStampa} 
                      handleChangeTipoElenco = {this.handleChangeTipoElenco}
                      tipo_elenco={this.tipo_elenco}
                      handleNewOrdine={() => { this.handleOrdineDettaglioSelected(null)}  } />
              </Box>       
    
               <Box mt={2}  width={{xs:'98%',sm: '98%' , md: '98%', lg: '96%', xl: '90%'}} >
                 
              {this.tipo_elenco === "dettaglio" &&
                  <Ordini_elenco_dettaglioView 
                    deleteScheda={this.handleOrdineDettaglioToDelete}
                    showScheda={this.handleOrdineDettaglioSelected}
                    
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              } 

              {this.tipo_elenco === "testata" &&
                  <Ordini_elenco_testataView  
                    showScheda={this.handleOrdineDettaglioSelected}
                    
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              }


              </Box>       
              
                 
              </>
              

              }
              
              {this.state.ordineSelected !== null     &&
            

            

                <Box width="100%" mt={2}> 
                <Ordine_scheda    
                  isMobile={this.props.isMobile}
                  readOnly={
                    this.state.ordineSelected.id_ordine === -1 ? false : 
                    (this.state.ordineSelected.ordineDettaglio.reduce( (accumulator, currentValue) =>   
                    accumulator && (currentValue.id_ordine_dettaglio !== -1 ? currentValue.consegnato : true )  , true ))}
                    handleDelOrdine={this.handleOrdineToDelete}
                    handleStampaOrdine={this.handleShowStampa} 
                  scheda={this.state.ordineSelected}
                  saveOrdine={this.saveOrdine }  />
 
                
                  </Box>   
              }
 

          </>
          
}
          </Box>
            )
          }

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
 

const appOrdine_ElencoPage = connect(mapStateToProps, mapDispatchToProps)(  Ordini_elencoPage );
export    { appOrdine_ElencoPage as Ordini_elenco } ; 
 
