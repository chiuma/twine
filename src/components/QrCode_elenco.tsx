import React  from 'react';
 
import { QrCode } from '../model/QrCode';
 
import {   Box, CircularProgress   } from '@mui/material';
import { connect } from 'react-redux';
 
import { QrCode_elencoFiltriView } from '../views/QrCode_elencoFiltriView';
import { ConfirmFialog } from '../utils/ConfirmDialog';
import { qrCodeServices } from '../services/qrCodeServices';
import {NotificationManager} from 'react-notifications'; 
 

import QrCode_elencoView from '../views/QrCode_elencoView';
import { QrCode_scheda } from './QrCode_scheda';
import { Colore } from '../model/Colore';
import { Articolo } from '../model/Articolo';

export interface IProps {  
  elenco_colori: Colore[],     
  elenco_articoli: Articolo[],
  
  }
     
export interface IState { 
    elenco_filtrato: any, 
    isInProgress: boolean,
    isEditMode: boolean,
    scheda_selected: QrCode | null,
    scheda_delete:  QrCode | null,
     
  }

class Filtri { 
    code: string = '';
  }
  
class QrCode_elencoPage  extends React.Component <IProps,IState> {
    lastFiltri : Filtri =  new Filtri();
    _isMounted = false;
    elenco_qrCode: any;
    
    constructor(props: any) {
      super(props);  
      this.handleExecRicerca = this.handleExecRicerca.bind(this);
       
      this.handleSchedaSelected = this.handleSchedaSelected.bind(this);
      this.handleSchedaToDelete = this.handleSchedaToDelete.bind(this);
       
      this.execDeleteScheda = this.execDeleteScheda.bind(this);
      this.load  = this.load.bind(this);
      this.savedScheda = this.savedScheda.bind(this);
      
      this.state = {  elenco_filtrato: [], isInProgress: false , isEditMode: true, scheda_selected:null  , scheda_delete:null }; 
    }


 
    componentDidMount()
    { 

      this._isMounted = true;
       
      this.load();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
     

    async load ()
    {
  
      if (!this._isMounted)  return;
      
 
      this.setState({  isInProgress: true }); 
      let resp = await qrCodeServices.getElenco( );
      this.setState({  isInProgress: false }); 
  
      
      if ( resp.esito === "OK" )
      {
        

        this.elenco_qrCode =  resp.elenco; 

      //  console.log("loadOrdini elenco_ordini" , this.elenco_ordini);

        if (this._isMounted) 
        {
        
        this.setState({ elenco_filtrato:  this.elenco_qrCode    }); 
        }
      
        
      }
      else
      {
          
        NotificationManager.error('Errore server', 'Ordini', 3000); 
        return;
      }
    }

    savedScheda(scheda:QrCode)
    {
      console.log("savedScheda", scheda)
      let idx_qrCode = this.elenco_qrCode.findIndex( x => x.id_qrcode === scheda.id_qrcode)
      let new_scheda:any =   Object.assign( {},  scheda);
      new_scheda.cod_articolo = this.props.elenco_articoli.find( x => x.id_articolo_base === scheda.id_articolo_base)?.codice
      new_scheda.cod_colore = this.props.elenco_colori.find( x => x.id_colore === scheda.id_colore)?.codice
      new_scheda.cod_colore_2 = this.props.elenco_colori.find( x => x.id_colore === scheda.id_colore_2)?.codice
      new_scheda.cod_colore_3 = this.props.elenco_colori.find( x => x.id_colore === scheda.id_colore_3)?.codice   

      if (idx_qrCode == -1)
      { 
         this.elenco_qrCode.push(new_scheda)
         
      }
      else
      {
          this.elenco_qrCode[idx_qrCode] = new_scheda;
      }

 

      this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri ), scheda_selected: null   }); 
    }

    handleExecRicerca   (formFilter: Filtri)
    {      

   //  console.log("handleExecRicerca" , formFilter)
       
        this.lastFiltri = formFilter;
        let elenco_filtrato = this.getElencoFilter(formFilter)
        this.setState({ elenco_filtrato: elenco_filtrato   }); 
 

    }

 

    handleSchedaSelected (scheda:QrCode |null)
    {
   
      this.setState({ scheda_selected: scheda   }); 
    }

 
    handleSchedaToDelete (scheda:QrCode|null)
    {
    
      this.setState({ scheda_delete: scheda   }); 
    }

 
    getElencoFilter   (formFilter: Filtri)
    {      
      let filtroCode=   formFilter.code.toLocaleUpperCase() ;
   
      if (this.elenco_qrCode)
      {
        let elenco_filtrato = this.elenco_qrCode.filter
        (
          (curr: any) => 
          {
              var ris = true;
 
    

              if ( filtroCode !== "")
              {
                  if ( !curr.code.toLocaleUpperCase().includes (filtroCode ) )
                
                  return false;
              }  

              

  
              
              
              return ris;
          }
        )
        return elenco_filtrato

      }
      else return []
    }

    async execDeleteScheda    ( )
    {
       
      if(this.state.scheda_delete === null  ) return;

      let id_qrcode = this.state.scheda_delete.id_qrcode;
      this.handleSchedaToDelete(null);
      this.setState({  isInProgress: true }); 
      let ris = await qrCodeServices.deleteScheda(id_qrcode);
      this.setState({  isInProgress: false }); 

      if ( ris.esito === "OK")
      { 
        let elenco_filtrato = this.elenco_qrCode.filter
        (
          (curr: any) => 
          {
               
              if ( id_qrcode !== curr.id_qrcode) return true;
              
              else      return false;
          }
        )
         
   
          this.elenco_qrCode = elenco_filtrato;
          this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri) , scheda_selected: null , scheda_delete: null }); 
    
            NotificationManager.success('Operazione eseguita con successo.' , 'QrCode', 3000);  
          
      }
      else
      {
  
          let mex = ""
          if (ris.err_code === "001" )
            mex = "Errore server.";
          else if (ris.err_code === "003" )
            mex = "Impossibile cancellare l'QrCode perchè esistono Ordini con questo QrCode.";  
          else
            mex = "Errore durante l'elaborazione.";
          NotificationManager.error(mex, 'QrCode', 3000);  

      }
    }
 
    render() {    
        
          return (
            
            <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center"  > 

              {this.state.scheda_delete !== null &&
                <ConfirmFialog
                          handleConfirm={this.execDeleteScheda}
                          handleAnnulla={() => { this.handleSchedaToDelete(null)}}
                          contextText={'Sei sicuro di vole cancellare il QrCode: ' +      
                           this.state.scheda_delete.code + '?'}
                          title="QrCode" />
              }

              {this.state.isInProgress  &&

              <Box mt={2}>
                  <CircularProgress color="primary" />
              </Box>
              }

              {this.state.scheda_selected === null  &&
              
               <>

                  <QrCode_elencoFiltriView     
                      initFiltri={this.lastFiltri} 
                      handleNewQrCode={this.handleSchedaSelected}
                      handleExecRicerca={this.handleExecRicerca}   />

              
                  <QrCode_elencoView 
                    deleteScheda={this.handleSchedaToDelete}
                    showScheda={this.handleSchedaSelected}
                    isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
              </>
              

              }
              
              {this.state.scheda_selected !== null  &&
                <QrCode_scheda   
                    savedScheda={this.savedScheda}
                 elenco_colori={this.props.elenco_colori }
                  elenco_articoli={this.props.elenco_articoli }
                  handleClose={() => { this.handleSchedaSelected(null)}}
                  scheda={this.state.scheda_selected } />
              }


            </Box>
          
            )
          }

  }
 
function mapDispatchToProps(dispatch) {
    return { 
        
          
    }
  }
  
function mapStateToProps(state) {
   
  return {
    elenco_colori: state.coloriReducer.elenco_colori , 
    elenco_articoli: state.articoliReducer.elenco_articoli ,
  };
}


const appQrCode_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  QrCode_elencoPage );
export    { appQrCode_schedaPage as QrCode_elenco } ; 
 
