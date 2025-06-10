import React  from 'react';
 
import { Provenienza } from '../model/Provenienza';
 

 
import {   Box, CircularProgress   } from '@material-ui/core';

 
import { connect } from 'react-redux';
//import { Provenienza_scheda } from './Provenienza_scheda';
 
import { ConfirmFialog } from '../utils/ConfirmDialog';
 
import {NotificationManager} from 'react-notifications'; 
import { provenienzeActions } from '../actions/provenienze.action';

import Provenienze_elencoView from '../views/Provenienze_elencoView';
import { provenienzeServices } from '../services/provenienzeService';
import { Provenienza_scheda } from './Provenienza_scheda';

export interface IProps { 
    actDelProvenienza: any,
    elenco_provenienze: Provenienza[];
 
  
  }
     
export interface IState { 
 

    elenco_filtrato: Provenienza[], 
    isInProgress: boolean,
    isEditMode: boolean,
    scheda_selected: Provenienza | null,
    scheda_delete:  Provenienza | null,
     
  }

class Filtri {
    descrizione: string = '';
    codice: string = '';
  }
  
class Provenienze_elencoPage  extends React.Component <IProps,IState> {
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
      
   
     if ( prevProps.elenco_provenienze !== this.props.elenco_provenienze)
     {  
     
      let elenco=  [...this.props.elenco_provenienze]
      console.log("elenco" , elenco);

        this.handleExecRicerca   ( this.lastFiltri);
     }
 
    }

    handleExecRicerca   (formFilter: Filtri)
    {      

  //    console.log("handleExecRicerca" , formFilter)
       
 

      let filtroDescrizione =  formFilter.descrizione.toLocaleUpperCase() ;
 
     
      if (this.props.elenco_provenienze)
      {
        let elenco_filtrato = this.props.elenco_provenienze.filter
        (
          (curr: Provenienza) => 
          {
              var ris = true;
              if ( filtroDescrizione !== "")
              {
                  if ( !curr.descrizione.toLocaleUpperCase().includes (filtroDescrizione ) )
                
                  return false;
              }  

    

 
              
              return ris;
          }
        )
 
        this.lastFiltri = formFilter;
        this.setState({ elenco_filtrato: elenco_filtrato   }); 
      }
    }

 

    handleSchedaSelected (scheda:Provenienza |null)
    {
   
      this.setState({ scheda_selected: scheda   }); 
    }

 
    handleSchedaToDelete (scheda:Provenienza|null)
    {
    
      this.setState({ scheda_delete: scheda   }); 
    }

 


    async execDeleteScheda    ( )
    {
       
      

      if(this.state.scheda_delete === null  ) return;
      let descProvenienza =   this.state.scheda_delete.descrizione  ;
      let id_provenienza = this.state.scheda_delete.id_provenienza;
      this.handleSchedaToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await provenienzeServices.deleteScheda(id_provenienza);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
           
           this.props.actDelProvenienza( id_provenienza).then((response:any) => 
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
            mex = "Impossibile cancellare il colore: " +  descProvenienza +  " perchè esistono articoli con questo colore.";       
          else
            mex = "Errore durante l'elaborazione.";
          NotificationManager.error(mex, 'Provenienza', 3000);  

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
                          contextText={'Sei sicuro di vole cancellare la provenienza: ' +      
                           this.state.scheda_delete.descrizione + '?'}
                          title="Provenienze" />
              }

              {this.state.isInProgress  &&

              <Box mt={2}>
                  <CircularProgress color="primary" />
              </Box>
              }

              {this.state.scheda_selected === null  &&
              
               <>

              

              
                  <Provenienze_elencoView 
                    deleteScheda={this.handleSchedaToDelete}
                    showScheda={this.handleSchedaSelected}
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              </>
              
              }

 
            {this.state.scheda_selected !== null  &&
                <Provenienza_scheda  
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
    elenco_provenienze: state.provenienzeReducer.elenco_provenienze 
  };
}

function mapDispatchToProps(dispatch) {
    return { 
      actDelProvenienza: async (id_provenienza: Number) => {
        dispatch(provenienzeActions.delProvenienza(id_provenienza));
      } ,
    }
  }
 

const appProvenienza_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Provenienze_elencoPage );
export    { appProvenienza_schedaPage as Provenienze_elenco } ; 
 
