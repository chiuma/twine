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
import QrCode_schedaView from '../views/QrCode_schedaView';
import { StampaHtml } from '../utils/StampaHtml';

export interface IProps {  
  elenco_colori: Colore[],     
  elenco_articoli: Articolo[],
  
  }
     
export interface IState { 
    elenco_filtrato: QrCode[], 
    isInProgress: boolean,
    isEditMode: boolean,
    scheda_delete:  QrCode | null,
    showStampa: boolean,
    html_stampa: string,
  }

class Filtri { 
    code: string = '';
  }
  
class QrCode_elencoPage  extends React.Component <IProps,IState> {
    lastFiltri : Filtri =  new Filtri();
    _isMounted = false;
    elenco_qrCode: any[]=[];
    sHtml:string ="";
    constructor(props: any) {
      super(props);  
      this.handleExecRicerca = this.handleExecRicerca.bind(this);
       
      this.handleSchedaToDelete = this.handleSchedaToDelete.bind(this);
       
      this.execDeleteScheda = this.execDeleteScheda.bind(this);
      this.savedScheda = this.savedScheda.bind(this);
      this.getHtmlStampa = this.getHtmlStampa.bind(this);
      this.handleShowStampa = this.handleShowStampa.bind(this);

      
      this.state = { showStampa:false, html_stampa:"",
         elenco_filtrato: [], isInProgress: false , isEditMode: true,  scheda_delete:null }; 
    }


 
    componentDidMount()
    { 

      this._isMounted = true;
     
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
     

 
    savedScheda(scheda:QrCode)
    {
      
 
      let new_scheda:any =   Object.assign( {},  scheda, {id_qrcode: this.state.elenco_filtrato.length });

      new_scheda.cod_articolo = this.props.elenco_articoli.find( x => x.id_articolo_base === scheda.id_articolo_base)?.codice
      new_scheda.cod_colore = this.props.elenco_colori.find( x => x.id_colore === scheda.id_colore)?.codice
      new_scheda.cod_colore_2 = this.props.elenco_colori.find( x => x.id_colore === scheda.id_colore_2)?.codice
      new_scheda.cod_colore_3 = this.props.elenco_colori.find( x => x.id_colore === scheda.id_colore_3)?.codice   
     
    
      this.elenco_qrCode.push(new_scheda)

      this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri ) }); 
    }

    handleExecRicerca   (formFilter: Filtri)
    {      

   //  console.log("handleExecRicerca" , formFilter)
       
        this.lastFiltri = formFilter;
        let elenco_filtrato = this.getElencoFilter(formFilter)
        this.setState({ elenco_filtrato: elenco_filtrato   }); 
 

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

     execDeleteScheda    ( )
    {
       
      if(this.state.scheda_delete === null  ) return;

      let id_qrcode = this.state.scheda_delete.id_qrcode;
      this.handleSchedaToDelete(null);
 
 
        let elenco_filtrato = this.elenco_qrCode.filter
        (
          (curr: any) => 
          {
               console.log("id_qrcode", id_qrcode, curr.id_qrcode )
              if ( id_qrcode !== curr.id_qrcode) return true;
              
              else      return false;
          }
        )
         
   
        this.elenco_qrCode = elenco_filtrato;
        this.setState({ elenco_filtrato: this.getElencoFilter(this.lastFiltri) ,  scheda_delete: null }); 
  
        NotificationManager.success('Operazione eseguita con successo.' , 'QrCode', 3000);  
          
      
    }
  
    handleShowStampa(showStampa:boolean )
    {
      let sHtml = ""
      if (showStampa)   sHtml = this.getHtmlStampa()
      this.setState({ showStampa: showStampa, html_stampa:  sHtml }); 
 
    }
    getHtmlStampa()
    {

    let sHtml = `
    <html>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
 
            <style>
             @page {
                size: A4;
                margin: 10;
              }

              @media print {
                html, body {
                  width: 210mm;
                  height: 287mm;
                }
              
              }
                
              body {

                      /* to centre page on screen*/
                      margin-left: auto;
                      margin-right: auto;
                      font-family: 'Roboto'; font-size: 10pt;
                  }

              table {
                    width: 100%;
                    border-collapse: collapse;
                }
                td {
                    width: 33.33%;
                    text-align: center;
                    padding: 10px;
                    page-break-inside: avoid;
                }
            </style>
        </head>
        <body>
            <table>
    `;

    this.state.elenco_filtrato.forEach((item: QrCode, index: number) => {
        if (index % 3 === 0) {
            sHtml += '<tr>';
        }
        let descrizione = ""
        let arrQrCode = item.code.split("*");
        if (arrQrCode[0] == "ART")
        {
          descrizione ="Articolo " + arrQrCode[1];
          if (arrQrCode.length > 2 && arrQrCode[2] != "")   descrizione = descrizione + "-" + arrQrCode[2]
          if (arrQrCode.length > 3 && arrQrCode[3] != "")   descrizione = descrizione + "-" + arrQrCode[3]
        }
        else
        {
          descrizione = "Colore " + arrQrCode[1];
          
        }
        sHtml += `
            <td>
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(item.code)}&size=150x150" alt="QR Code for ${item.code}" />
                <div style="margin-top: 7px;font-size:120%;">${item.code}</div>
                <div style="margin-top: 4px;font-size:120%;">${descrizione}</div>
            </td>
        `;

        if (index % 3 === 2 || index === this.state.elenco_filtrato.length - 1) {
            sHtml += '</tr>';
        }
    });
    
    sHtml += `
            </table>
        </body>
    </html>
    `;

     return sHtml;
    }
    render() {    
        
          return (
            <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center" 
            width="100%"  >         
       
       {this.state.showStampa &&
              <Box mt={2} ml={1} mr={1}>
              <StampaHtml 
                  html={this.state.html_stampa}
                  handleShowStampa={e => this.handleShowStampa(false)}
                  
                  />
                  </Box>
              }


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

{!this.state.showStampa &&
               <>
               <Box  width={{ xs: '98%', sm: '90%' , md: '80%', lg: '75%', xl: '60%',}} >
                  <QrCode_elencoFiltriView   
                  handleStampa ={e => this.handleShowStampa(true)} 
                      initFiltri={this.lastFiltri}  
                      handleExecRicerca={this.handleExecRicerca}   />
              </Box>
              <Box  width={{ xs: '98%', sm: '90%' , md: '80%', lg: '75%', xl: '70%',}} >
                  <QrCode_elencoView 
                    deleteScheda={this.handleSchedaToDelete}
                     isEditMode={this.state.isEditMode}
                    elenco={this.state.elenco_filtrato}  
                    /> 
               </Box>
            
              

          
              <Box width={{ xs: '98%', sm: '90%' , md: '80%', lg: '75%', xl: '60%',}} >
                <QrCode_scheda    
                  savedScheda={this.savedScheda}
               
                  elenco_colori={this.props.elenco_colori }
                  elenco_articoli={this.props.elenco_articoli } 
               
                  />
              </Box>

              </>
          
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
 
