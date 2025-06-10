import React  from 'react';
 
import { Cliente, ClienteFiltri } from '../model/Cliente';
 
import {   Box, CircularProgress   } from '@material-ui/core';
import { connect } from 'react-redux';
import { Cliente_scheda } from './Cliente_scheda';
import { Clienti_elencoFiltriView } from '../views/Clienti_elencoFiltriView';
import { ConfirmFialog } from '../utils/ConfirmDialog';
import { clientiServices } from '../services/clientiServices';
import {NotificationManager} from 'react-notifications'; 
import { clientiActions } from '../actions/clienti.action';

import Clienti_elencoView from '../views/Clienti_elencoView';

export interface IProps { 
    actDelCliente: any,
    elenco_clienti: Cliente[];
  
  }
     
export interface IState { 
    elenco_filtrato: Cliente[], 
    isInProgress: boolean,
    isEditMode: boolean,
    scheda_selected: Cliente | null,
    scheda_delete:  Cliente | null,     
  }


  
class Clienti_elencoPage  extends React.Component <IProps,IState> {
    lastFiltri :   ClienteFiltri =  new ClienteFiltri();

 
    
    constructor(props: any) {
      super(props);  
      this.handleExecRicerca = this.handleExecRicerca.bind(this);
       
      this.handleSchedaSelected = this.handleSchedaSelected.bind(this);
      this.handleSchedaToDelete = this.handleSchedaToDelete.bind(this);
       
      this.execDeleteScheda = this.execDeleteScheda.bind(this);
   
      
      
      this.state = {  elenco_filtrato: [], isInProgress: false , isEditMode: true, scheda_selected:null  , scheda_delete:null }; 
    }


 
    componentDidMount()
    { 

    
      this.handleExecRicerca   ( this.lastFiltri);
      
      
    }

    
    componentDidUpdate(prevProps) 
    {
      
   
     if ( prevProps.elenco_clienti !== this.props.elenco_clienti)
     {  
        this.handleExecRicerca   ( this.lastFiltri);
     }
 
    }

    handleExecRicerca   (formFilter: ClienteFiltri)
    {      

  //    console.log("handleExecRicerca" , formFilter)
       
 

      let filtroDescrizione =  formFilter.descrizione.toLocaleUpperCase() ;
      let filtroPiva =   formFilter.piva.toLocaleUpperCase() ;
      let filtroComune=   formFilter.comune.toLocaleUpperCase() ;
      if (this.props.elenco_clienti)
      {
        let elenco_filtrato = this.props.elenco_clienti.filter
        (
          (curr: Cliente) => 
          {
              var ris = true;
              if ( filtroComune !== "")
              {
                  if ( !curr.comune.toLocaleUpperCase().includes (filtroComune ) )
                
                  return false;
              }  

              if ( filtroDescrizione !== "")
              {
                  if ( !curr.descrizione.toLocaleUpperCase().includes (filtroDescrizione ) )
                
                  return false;
              }  


              if ( filtroPiva !== "" )
              {
                  if ( !curr.piva.toLocaleUpperCase().includes (filtroPiva ) && !curr.codfiscale.toLocaleUpperCase().includes (filtroPiva ) )
                
                  return false;
              }  

              

  
              
              
              return ris;
          }
        )
  
        this.lastFiltri = formFilter;
        this.setState({ elenco_filtrato: elenco_filtrato   }); 
      }
    }

 

    handleSchedaSelected (scheda:Cliente |null)
    {
   
      this.setState({ scheda_selected: scheda   }); 
    }

 
    handleSchedaToDelete (scheda:Cliente|null)
    {
    
      this.setState({ scheda_delete: scheda   }); 
    }

 


    async execDeleteScheda    ( )
    {
       
      if(this.state.scheda_delete === null  ) return;

      let descCliente =   this.state.scheda_delete.descrizione;
      let id_cliente = this.state.scheda_delete.id_cliente;
      this.handleSchedaToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await clientiServices.deleteScheda(id_cliente);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
           
           this.props.actDelCliente( id_cliente).then((response:any) => 
           {   
            NotificationManager.success('Operazione eseguita con successo.' , 'Clienti', 3000);  
          });
      }
      else
      {
  
          let mex = ""
          if (ris.err_code === "001" )
            mex = "Errore server.";
          else if (ris.err_code === "003" )
            mex = "Impossibile cancellare il Cliente: " +  descCliente +  " perchè esistono Ordini fatti dal cliente.";  
          else
            mex = "Errore durante l'elaborazione.";
          NotificationManager.error(mex, 'Cliente', 3000);  

      }
    }
 
    render() {    
        // console.log("XXXXXXXX - " ,   this.props.status , this.props.elenco_storico);
          return ( 
            
            <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center"   > 

              {this.state.scheda_delete !== null &&
                <ConfirmFialog
                          handleConfirm={this.execDeleteScheda}
                          handleAnnulla={() => { this.handleSchedaToDelete(null)}}
                          contextText={'Sei sicuro di vole cancellare il Cliente: ' +      
                           this.state.scheda_delete.descrizione + '?'}
                          title="Clienti" />
              }

              {this.state.isInProgress  &&

                <Box mt={2}>
                  <CircularProgress color="primary" />
              </Box>
              }

              {this.state.scheda_selected === null  &&
              
               <>

                  <Clienti_elencoFiltriView     
                      initFiltri={this.lastFiltri} 
                      handleNewCliente={this.handleSchedaSelected}
                      handleExecRicerca={this.handleExecRicerca}   />

              
                  <Clienti_elencoView 
                    deleteScheda={this.handleSchedaToDelete}
                    showScheda={this.handleSchedaSelected}
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              </>
              
              }

              {this.state.scheda_selected !== null  &&
                <Cliente_scheda  
                  showConsegne={true}
                  isModal={false}
                  handleClose={() => { this.handleSchedaSelected(null)}}
                  scheda={this.state.scheda_selected } />
              }

</Box>
          
            )
          }

  }
 

  
function mapStateToProps(state) {
  console.log("state.clientiReducer.elenco_clienti", state.clientiReducer.elenco_clienti)
  return {
    elenco_clienti: state.clientiReducer.elenco_clienti 
  };
}

function mapDispatchToProps(dispatch) {
    return { 
      actDelCliente: async (id_cliente: Number) => {
        dispatch(clientiActions.delCliente(id_cliente));
      } ,
    }
  }
 

const appCliente_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Clienti_elencoPage );
export    { appCliente_schedaPage as Clienti_elenco } ; 
 
