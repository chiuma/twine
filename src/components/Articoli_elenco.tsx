import React  from 'react';
 
import { Articolo } from '../model/Articolo';
 

 
import {   Box, CircularProgress   } from '@material-ui/core';

 
import { connect } from 'react-redux'; 
import { Articoli_elencoFiltriView } from '../views/Articoli_elencoFiltriView';
import { ConfirmFialog } from '../utils/ConfirmDialog';
import { articoliServices } from '../services/articoliServices';
import {NotificationManager} from 'react-notifications'; 
import { articoliActions } from '../actions/articoli.action';

import Articoli_elencoView from '../views/Articoli_elencoView';
import { Articolo_scheda } from './Articolo_scheda';

export interface IProps { 
    actDelArticolo: any,
    elenco_articoli: Articolo[];
   
 
  
  }
     
export interface IState { 
 

    elenco_filtrato: Articolo[], 
    isInProgress: boolean,
    isEditMode: boolean,
    scheda_selected: Articolo | null,
    scheda_delete:  Articolo | null,
     
  }

class Filtri {
    descrizione: string = '';
    codice: string = '';
  }
  
class Articoli_elencoPage  extends React.Component <IProps,IState> {
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
      
   
     if ( prevProps.elenco_articoli !== this.props.elenco_articoli)
     {  
        this.handleExecRicerca   ( this.lastFiltri);
     }
 
    }

    handleExecRicerca   (formFilter: Filtri)
    {      

   //  console.log("handleExecRicerca" , formFilter)
       
 

      let filtroDescrizione =  formFilter.descrizione.toLocaleUpperCase() ;
      let filtroCodice =   formFilter.codice.toLocaleUpperCase() ;
     
      if (this.props.elenco_articoli)
      {
        let elenco_filtrato = this.props.elenco_articoli.filter
        (
          (curr: Articolo) => 
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
  
        this.lastFiltri = formFilter;
        this.setState({ elenco_filtrato: elenco_filtrato   }); 
      }
    }

 

    handleSchedaSelected (scheda:Articolo |null)
    {
   
      this.setState({ scheda_selected: scheda   }); 
    }

 
    handleSchedaToDelete (scheda:Articolo|null)
    {
    
      this.setState({ scheda_delete: scheda   }); 
    }

 


    async execDeleteScheda    ( )
    {
       
      if(this.state.scheda_delete === null  ) return;

      let id_articolo_base = this.state.scheda_delete.id_articolo_base;
      this.handleSchedaToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await articoliServices.deleteScheda(id_articolo_base);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
           
           this.props.actDelArticolo( id_articolo_base).then((response:any) => 
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
            mex = "Impossibile cancellare l'Articolo perchè esistono Ordini con questo Articolo.";  
          else
            mex = "Errore durante l'elaborazione.";
          NotificationManager.error(mex, 'Articolo', 3000);  

      }
    }
 
    render() {    
        // console.log("XXXXXXXX - " ,   this.props.status , this.props.elenco_storico);
          return (
            
            <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center"  > 

              {this.state.scheda_delete !== null &&
                <ConfirmFialog
                          handleConfirm={this.execDeleteScheda}
                          handleAnnulla={() => { this.handleSchedaToDelete(null)}}
                          contextText={'Sei sicuro di vole cancellare il Articolo: ' +      
                           this.state.scheda_delete.descrizione + '?'}
                          title="Articoli" />
              }

              {this.state.isInProgress  &&

              <Box mt={2}>
                  <CircularProgress color="primary" />
              </Box>
              }

              {this.state.scheda_selected === null  &&
              
               <>

                  <Articoli_elencoFiltriView     
                      initFiltri={this.lastFiltri} 
                      handleNewArticolo={this.handleSchedaSelected}
                      handleExecRicerca={this.handleExecRicerca}   />

              
                  <Articoli_elencoView 
                    deleteScheda={this.handleSchedaToDelete}
                    showScheda={this.handleSchedaSelected}
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              </>
              

              }
              
              {this.state.scheda_selected !== null  &&
                <Articolo_scheda  
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
    elenco_articoli: state.articoliReducer.elenco_articoli 
  };
}

function mapDispatchToProps(dispatch) {
    return { 
      actDelArticolo: async (id_articolo_base: Number) => {
        dispatch(articoliActions.delArticolo(id_articolo_base));
      } ,
    }
  }
 

const appArticolo_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Articoli_elencoPage );
export    { appArticolo_schedaPage as Articoli_elenco } ; 
 
