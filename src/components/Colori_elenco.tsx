import React  from 'react';
 
import { Colore } from '../model/Colore';
 

 
import {   Box, CircularProgress   } from '@mui/material';

 
import { connect } from 'react-redux';
import { Colore_scheda } from './Colore_scheda';
import { Colori_elencoFiltriView } from '../views/Colori_elencoFiltriView';
import { ConfirmFialog } from '../utils/ConfirmDialog';
import { coloriServices } from '../services/coloriServices';
import {NotificationManager} from 'react-notifications'; 
import { coloriActions } from '../actions/colori.action';

import Colori_elencoView from '../views/Colori_elencoView';

export interface IProps { 
    actDelColore: any,
    elenco_colori: Colore[]  
  }
     
export interface IState { 
 

    elenco_filtrato: Colore[], 
    isInProgress: boolean,
    isEditMode: boolean,
    scheda_selected: Colore | null,
    scheda_delete:  Colore | null,
     
  }

class Filtri {
    descrizione: string = '';
    codice: string = '';
  }
  
class Colori_elencoPage  extends React.Component <IProps,IState> {
    lastFiltri : Filtri =  new Filtri();

 
    
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
      
   
     if ( prevProps.elenco_colori !== this.props.elenco_colori)
     {  
      
 

        this.handleExecRicerca   ( this.lastFiltri);
     }
 
    }

    handleExecRicerca   (formFilter: Filtri)
    {      

  //    console.log("handleExecRicerca" , formFilter)
       
 

      let filtroDescrizione =  formFilter.descrizione.toLocaleUpperCase() ;
      let filtroCodice =   formFilter.codice.toLocaleUpperCase() ;
     
      if (this.props.elenco_colori)
      {
        let elenco_filtrato = this.props.elenco_colori.filter
        (
          (curr: Colore) => 
          {
              var ris = true;
              if ( filtroDescrizione !== "")
              {
                  if ( !curr.descrizione.toLocaleUpperCase().includes (filtroDescrizione ) )
                
                  return false;
              }  

    

              if ( filtroCodice !== "")
              {
                  if ( !curr.codice.toLocaleUpperCase().includes (filtroCodice ) )
                
                  return false;
              }  
  
              
              return ris;
          }
        )
 //  console.log("elenco_filtrato" , elenco_filtrato)
        this.lastFiltri = formFilter;
        this.setState({ elenco_filtrato: elenco_filtrato   }); 
      }
    }

 

    handleSchedaSelected (scheda:Colore |null)
    {
   
      this.setState({ scheda_selected: scheda   }); 
    }

 
    handleSchedaToDelete (scheda:Colore|null)
    {
    
      this.setState({ scheda_delete: scheda   }); 
    }

 


    async execDeleteScheda    ( )
    {   
     
      if(this.state.scheda_delete === null  ) return;
      let descColore =   this.state.scheda_delete.descrizione + "(" + this.state.scheda_delete.codice + ")";
      let id_colore = this.state.scheda_delete.id_colore;
      this.handleSchedaToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await coloriServices.deleteScheda(id_colore);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      {            
           this.props.actDelColore( id_colore).then((response:any) => 
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
            mex = "Impossibile cancellare il colore: " +  descColore +  " perchè esistono articoli con questo colore.";       
          else
            mex = "Errore durante l'elaborazione.";
          NotificationManager.error(mex, 'Colore', 3000);  

      }
    }
 
    render() {    
        // console.log("XXXXXXXX - " ,   this.props.status , this.props.elenco_storico);
          return (
            
            <Box  display="flex" flexDirection="column" p={1} alignItems="center"  justifyContent="center"  > 
 
              {this.state.scheda_delete !== null &&
                <ConfirmFialog
                          handleConfirm={this.execDeleteScheda}
                          handleAnnulla={() => { this.handleSchedaToDelete(null)}}
                          contextText={'Sei sicuro di vole cancellare il Colore: ' +      
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

                  <Colori_elencoFiltriView     
                      initFiltri={this.lastFiltri} 
                      handleNewColore={this.handleSchedaSelected}
                      handleExecRicerca={this.handleExecRicerca}   />

              
                  <Colori_elencoView 
                    deleteScheda={this.handleSchedaToDelete}
                    showScheda={this.handleSchedaSelected}
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              </>
              
              }

              {this.state.scheda_selected !== null  &&
                <Colore_scheda  
                  isModal={false}
                  handleClose={() => { this.handleSchedaSelected(null)}}
                  scheda={this.state.scheda_selected } />
              }

          </Box>
          
            )
          }

  }
 

  
function mapStateToProps(state) {
 
  return {
    elenco_colori: state.coloriReducer.elenco_colori 
  };
}

function mapDispatchToProps(dispatch) {
    return { 
      actDelColore: async (id_colore: Number) => {
        dispatch(coloriActions.delColore(id_colore));
      } ,
    }
  }
 

const appColore_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Colori_elencoPage );
export    { appColore_schedaPage as Colori_elenco } ; 
 
