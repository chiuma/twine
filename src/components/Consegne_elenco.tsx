import React  from 'react';
 
 
 
import {   Box, CircularProgress   } from '@mui/material';

 
import { connect } from 'react-redux';
 

import { ConfirmDialog } from '../utils/ConfirmDialog'; 
import {NotificationManager} from 'react-notifications'; 

import { Cliente } from '../model/Cliente';
 
import { Consegna, ConsegnaFiltri } from '../model/Consegna';
  
 
 
import Consegne_elencoView from '../views/Consegne_elencoView';
import { Consegne_elencoFiltriView } from '../views/Consegne_elencoFiltriView';
 
import { Consegne_elencoHeaderView } from '../views/Consegne_elencoHeaderView';
import { consegneServices } from '../services/consegneServices';
import { Consegna_scheda } from './Consegna_scheda';
import { CommonFunctions } from '../common/CommonFunctions';
import { StampaHtml } from '../utils/StampaHtml';
import { ConstantUtils } from '../ConstantUtils';
 
 
  

 
export interface IProps { 
   
  elenco_clienti: Cliente[],
  id_cliente: number | null
  
  
  }
     
export interface IState { 
 

    elenco_filtrato:  any, 
    isInProgress: boolean,
    isEditMode: boolean,
    showEtichetteStampa: boolean,
    id_consegna_selected: number  | null,
    consegnaToDelete:  any | null,
    flag_consegna_saved: boolean
  
  }

 
  
class Consegne_elencoPage  extends React.Component <IProps,IState> {
    _isMounted = false;
    lastFiltri : ConsegnaFiltri =  new ConsegnaFiltri();
    elenco_consegne: any;
    componentRef: any;
    elenco_etichette_stampa: string="";

    constructor(props: any) {
      super(props);  
      this.handleExecRicerca = this.handleExecRicerca.bind(this);
       
      this.handleConsegnaSelected = this.handleConsegnaSelected.bind(this);
      this.handleConsegnaToDelete = this.handleConsegnaToDelete.bind(this);
       
      this.execDeleteConsegna = this.execDeleteConsegna.bind(this);
      this.loadConsegne = this.loadConsegne.bind(this);
      this.saveConsegna = this.saveConsegna.bind(this);
      this.handleStampaEtichette = this.handleStampaEtichette.bind(this);
      this.hiddingScheda = this.hiddingScheda.bind(this);
      
      
      this.state = {  
        elenco_filtrato: [], isInProgress: false , isEditMode: true, id_consegna_selected: null  , 
        consegnaToDelete:null ,   flag_consegna_saved: false, showEtichetteStampa: false
        }; 
    }


    componentWillUnmount() {
      this._isMounted = false;
    }
   
    componentDidMount()
    { 
      this._isMounted = true;
       
      this.loadConsegne(); 
      if (!(this.props.id_cliente  === null  || this.props.id_cliente  === undefined ))
      {
        this.lastFiltri.id_cliente = this.props.id_cliente
        this.lastFiltri.data_consegna_effettuata_dal = "";
      }
    }

    
    componentDidUpdate(prevProps) 
    {
    }

    async loadConsegne()
    {
      if (!this._isMounted)  return;

      this.setState({ isInProgress: true   });
     // console.log("loadConsegne - date_consegne", this.lastFiltri.data_consegna_effettuata_dal, this.lastFiltri.data_consegna_effettuata_al)
      let resp   ;
      if ((this.props.id_cliente  === null  || this.props.id_cliente  === undefined ))
      {
        resp = await consegneServices.getElenco(null, this.lastFiltri.data_consegna_effettuata_dal, this.lastFiltri.data_consegna_effettuata_al);
      }
      else
      {
        resp = await consegneServices.getElenco(this.props.id_cliente, "", "");
      }

      this.setState({ isInProgress: false   }); 
      if ( resp.esito === "OK" )
      {
       
       this.elenco_consegne =  resp.elenco.map ( ( consegna:any)  =>  Object.assign ({'stampa' : false}, {...consegna})); 
 //   console.log("loadConsegne - elenco_consegne", this.elenco_consegne)
       if (this._isMounted) 
       this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri)   }); 
     
       
      }
      else
      {
         
        NotificationManager.error('Errore server', 'Consegne', 3000); 
        return;
      }
    }

 

    async saveConsegna(consegna:any)
    {
      if (consegna === null)
      {
        this.setState({ id_consegna_selected: null  }); 
      }
      else
      {
         
        let ris = await consegneServices.modScheda( consegna  );
        this.setState({  isInProgress: false });
        
        if ( ris.esito === "OK")
        { 
          let importoTotaleScontato =    ris.scheda.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
          (currentValue.consegnato ? 
            (currentValue.prezzo*currentValue.qta) - 
            ((currentValue.prezzo*currentValue.qta)*currentValue.sconto/100)
            : 0)  , 0 );

          let importoTotale =    ris.scheda.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
              (currentValue.consegnato ? 
                (currentValue.prezzo*currentValue.qta)  
                : 0)  , 0 );
          let qtaTotale =    ris.scheda.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
              (currentValue.consegnato ? currentValue.qta : 0)  , 0 );
          let qtaEvasaTotale =    ris.scheda.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
              (currentValue.consegnato ? currentValue.qta_evasa : 0)  , 0 );
  
          let schedaModificata = {...ris.scheda, 
            ...{qta_evasa: qtaEvasaTotale, qta: qtaTotale, importo: importoTotale, importo_scontato: importoTotaleScontato   }};
          delete schedaModificata.consegnaDettaglio; 
          
          if (consegna.id_consegna === -1)
          {  
            this.elenco_consegne.push(schedaModificata);
          }
          else
          {
            this.elenco_consegne = this.elenco_consegne.map ( x => x.id_consegna === consegna.id_consegna ? 
              schedaModificata : 
              x);
          }
  
 
          this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri ), 
            id_consegna_selected: ris.scheda.id_consegna , flag_consegna_saved: !this.state.flag_consegna_saved   }); 
          NotificationManager.success('Operazione eseguita con successo.' , 'Consegne', 3000);  
        }
        else
        {
            this.setState({ isInProgress: false })   ;
            let mex = ""
            if (ris.err_code === "001" )
              mex = "Errore server."; 
            else
              mex = "Errore durante l'elaborazione.";
            NotificationManager.error(mex, 'Consegne', 3000);  

        }
  
      }
    
    }

    
    async handleExecRicerca   (formFilter: ConsegnaFiltri)
    {

      
      
      if ( this.lastFiltri.data_consegna_effettuata_dal !== formFilter.data_consegna_effettuata_dal || this.lastFiltri.data_consegna_effettuata_al !== formFilter.data_consegna_effettuata_al)
      {
        if ( CommonFunctions.isValidYear (this.lastFiltri.data_consegna_effettuata_dal) &&  CommonFunctions.isValidYear (this.lastFiltri.data_consegna_effettuata_al) )
        { 
          this.lastFiltri = formFilter;     
          
          await this.loadConsegne();
        }
          
      
        
      }
  
        this.lastFiltri = formFilter;      
        this.setState({ elenco_filtrato: this.getElencoFilter(formFilter)   }); 
          
          

      
    }

    getElencoFilter   (formFilter: ConsegnaFiltri)
    {       
      let filtroDataConsegnaDal =  formFilter.data_consegna_effettuata_dal.toLocaleUpperCase().replaceAll("-","/") ;
      let filtroDataConsegnaAl =   formFilter.data_consegna_effettuata_al.toLocaleUpperCase().replaceAll("-","/") ;   

      let filtroIdCliente =   formFilter.id_cliente ;
 

      if (this.elenco_consegne)
      {
        let elenco_filtrato = this.elenco_consegne.filter
        (
          (curr: any) => 
          {
              var ris = true;
 


              if ( filtroDataConsegnaDal !== "")
              {
                if ( curr.data_consegna_effettuata.substring(0,10)  <   filtroDataConsegnaDal   )
                {
                  return false;
                }
                  
              }  
   
              if ( filtroDataConsegnaAl !== "")
              {
                
                if ( curr.data_consegna_effettuata.substring(0,10)  >   filtroDataConsegnaAl  )
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
        return elenco_filtrato;

      }
      else return [];
    }

 

    handleConsegnaSelected (scheda:any |null)
    { 
 
      this.setState({ id_consegna_selected: scheda.id_consegna ,   flag_consegna_saved: false  }); 
    }

 
    handleConsegnaToDelete (scheda:Consegna|null)
    {
    
      this.setState({ consegnaToDelete: scheda   }); 
    }

    handleStampaEtichette(showStampa)
    {
      let elenco_filtrato = this.state.elenco_filtrato.filter( (curr: any) =>     { return curr.stampa});
      let elenco_stampa = elenco_filtrato.map ( x => x.id_consegna)
      

      
      this.elenco_etichette_stampa =  elenco_stampa.toString()
      this.setState({     showEtichetteStampa    : showStampa   });  
      
    }

    

    handleChangeForm = (event) => {
     
     let id_consegna = event.target.id_consegna;

     let elenco = this.state.elenco_filtrato.map ( (x:any) => 
     {
       if ( x.id_consegna === id_consegna)  {x.stampa = event.target.value;}
       return x;
     })
     this.elenco_consegne = elenco;

     this.setState({ elenco_filtrato: elenco   }); 
     // console.log("handleChangeForm" , this.state.elenco_filtrato);
      
    }  

    async hiddingScheda  ( id_consegna )
    {
      
         
        let ris = await consegneServices.hideScheda( id_consegna  );
        this.setState({  isInProgress: false });
        
        if ( ris.esito === "OK")
        { 
          this.elenco_consegne = this.elenco_consegne.map ( x => x.id_consegna ===   id_consegna ? 
            {...x, ...{hide: x.hide === 1 ? 0 : 1}} : 
            x);
         


        this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri )  }); 
    

           NotificationManager.success('Operazione eseguita con successo.' , 'Consegne', 2000);  
        }
        else
        {
            this.setState({ isInProgress: false })   ;
            let mex = ""
            if (ris.err_code === "001" )
              mex = "Errore server."; 
            else
              mex = "Errore durante l'elaborazione.";
            NotificationManager.error(mex, 'Consegne', 3000);  

        }
  
      
    }


    async execDeleteConsegna    ( )
    {
      if(this.state.consegnaToDelete === null  ) return;

      let id_consegna = this.state.consegnaToDelete.id_consegna;
      this.handleConsegnaToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await consegneServices.deleteScheda(id_consegna);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
           
        let idx = this.elenco_consegne.findIndex( (x :any) => x.id_consegna === id_consegna);
        if (idx !== -1)
        {
          this.elenco_consegne = [ ...this.elenco_consegne.slice(0, idx),    ...this.elenco_consegne.slice(idx+ 1) ] ;
          this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri)   }); 
        }
        NotificationManager.success('Operazione eseguita con successo.' , 'Consegne', 3000);  
  
      }
      else
      {
  
          let mex = ""
          if (ris.err_code === "001" )
            mex = "Errore server.";

          else
            mex = "Errore durante l'elaborazione.";
          NotificationManager.error(mex, 'Consegne', 3000);  

      }
      
    }
 
    render() {    
  
          return (
            
<>


            <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center"  > 

            {this.state.showEtichetteStampa &&
              <Box width="95%">      
                    <StampaHtml 
                        handleShowStampa={this.handleStampaEtichette}
                          urlToPrint={ConstantUtils.url.SERVER_URL + 
                            "clienti_etichetta_stampa.php?elenco_consegne=" + this.elenco_etichette_stampa}
                        />
                </Box>
              }

              {this.state.consegnaToDelete !== null &&
                <ConfirmDialog
                          handleConfirm={this.execDeleteConsegna}
                          handleAnnulla={() => { this.handleConsegnaToDelete(null)}}
                          contextText={'Sei sicuro di vole cancellare la Consegna'       
                          + " con codice "+  this.state.consegnaToDelete.progressivo 
                          + " del cliente "+  this.state.consegnaToDelete.cliente_descrizione 
                          
                          + '?'}
                          title="Consegne" />
              }

              {this.state.isInProgress  &&

              <Box mt={2}>
                  <CircularProgress color="primary" />
              </Box>
              }




              { !this.state.showEtichetteStampa  && this.state.id_consegna_selected === null &&
              
               <>

              <Box  width={{xs:'98%',  sm: '98%' , md: '98%', lg: '96%', xl: '90%',}}   mt={2}> 
 
                  <Consegne_elencoFiltriView    
                      elenco_clienti = {this.props.elenco_clienti}
                      showFiltroCliente={this.props.id_cliente  === null  || this.props.id_cliente  === undefined  }
                      initFiltri={this.lastFiltri}   
                      handleExecRicerca={this.handleExecRicerca}   />
              </Box>
              <Box width={{xs:'98%',  sm: '98%' , md: '98%', lg: '96%', xl: '90%',}}   mt={2} >  
                <Consegne_elencoHeaderView     
                      handleStampaEtichette={this.handleStampaEtichette}
                      elenco = {this.state.elenco_filtrato}    
                      handleNewConsegna={() => { this.handleConsegnaSelected(
                        this.props.id_cliente === null  || this.props.id_cliente  === undefined ?
                        new Consegna( )
                        :
                        new Consegna( {id_cliente : this.props.id_cliente} )
                        )}  } />
              </Box>

              <Box width={{xs:'98%',  sm: '98%' , md: '98%', lg: '96%', xl: '90%',}}   mt={2} > 

 
                  <Consegne_elencoView 
                  handleChangeForm={this.handleChangeForm}
                    deleteScheda={this.handleConsegnaToDelete}
                    hiddingScheda={this.hiddingScheda}
                    showScheda={this.handleConsegnaSelected}
                    showCliente={this.props.id_cliente  === null  || this.props.id_cliente  === undefined  }
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              </Box>              

                 
              </>
              

              }
 
  
              {this.state.id_consegna_selected !==  null     &&
                          
                  <Box width="96%" mt={2}>  
                      <Consegna_scheda    
                        readOnly={ false  }
                        flag_consegna_saved={this.state.flag_consegna_saved }
                        id_consegna={this.state.id_consegna_selected }
                        id_cliente={this.props.id_cliente }
                        saveConsegna={this.saveConsegna }  />
                  </Box>   
              }


            </Box>
  </>        
            )
          }

  }
 

  
function mapStateToProps(state) {
   
  return {
 
    elenco_clienti: state.clientiReducer.elenco_clienti ,
  
  };
}

function mapDispatchToProps(dispatch) {
    return { 
 
    }
  }
 

const appConsegna_ElencoPage = connect(mapStateToProps, mapDispatchToProps)(  Consegne_elencoPage );
export    { appConsegna_ElencoPage as Consegne_elenco } ; 
 
