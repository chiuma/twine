
import React  from 'react';

import { connect } from 'react-redux';
 
 
import { Box, CircularProgress } from '@material-ui/core';
import { consegneServices } from '../services/consegneServices';
import {NotificationManager} from 'react-notifications';  
import { CommonFunctions } from '../common/CommonFunctions';
import { Consegne_elencoFiltriView } from '../views/Consegne_elencoFiltriView';
import { ConsegnaFiltri } from '../model/Consegna';
 

export interface IProps {  
    classes: any,  
    elenco_clienti: any,
    elenco_articoli:any
}
   
export interface IState { 
    chartDataConsegneClienti: any,
    chartDataConsegneMeseAnno: any,
    chartDataOrdiniClienti: any, 
    chartDataConsegneArticoli: any,
    chartDataArticoli:any,
    isInProgress: boolean,
}

  function getRandomColor()
  {

    let idxColore = Math.random() * 16777215;
    return "#"+ ('000000' + ((idxColore)>>>0).toString(16)).slice(-6)
  }

 
  function formatToChartData (   elenco )
  {
   //  console.log("elenco",elenco)
    let labels = elenco.map(data =>  data.anno_mese).filter(   (value, index, self) => self.indexOf(value) === index ).sort();
    let datasets:any = [];
  
    let currId = "";
    
    let  item ;
    elenco.forEach((element, index) => 
      {  
  
        if (currId !== element.id)
        {
          if (item) datasets.push (item); 
          currId = element.id;  
          item = {  
            label:   currId  , 
            data:  new Array(labels.length).fill(0)  , 
            backgroundColor: getRandomColor()
          };
            
        }
        
        let idxLabel = labels.findIndex (x => x === element.anno_mese);
        item.data[idxLabel] = element.totale; 
      } );
  
      if (item) datasets.push (item); 
    
      return  {
        labels: labels,
        datasets: datasets
      }
    
      
  }
   
 

class Grafici_schedaPage  extends React.Component <IProps,IState> {
    _isMounted = false;
    lastFiltri : ConsegnaFiltri =  new ConsegnaFiltri();
    
    constructor(props: any) {
      super(props);  
      this.state = {  chartDataConsegneArticoli: [], chartDataConsegneMeseAnno: [] , chartDataConsegneClienti: [],  chartDataArticoli:[], chartDataOrdiniClienti :[], isInProgress: false ,}; 
      this.handleExecRicerca = this.handleExecRicerca.bind(this);
      this.lastFiltri.data_consegna_effettuata_dal = "";
    }
 

    componentWillUnmount() {
        this._isMounted = false;
      }
     
      componentDidMount()
      { 
        this._isMounted = true;
         
        this.loadDati();
        
        
        
      }

    async loadDati()
    {
      if (!this._isMounted)  return;
      this.setState({ isInProgress: true   }); 
      let resp = await consegneServices.getGrafico(this.lastFiltri);
 
     
      if ( resp.esito === "OK" )
      {
 
        let chartDataArticoli = formatToChartData ( 
          resp.elenco_consegne_articoli_annomese.map ( x => Object.assign( {},x, {id: x.articolo_base_codice,  totale: x.importo_totale}))); 


        let chartDataOrdiniClienti = formatToChartData ( 
          resp.elenco_consegne_clienti_annomese.map ( x => Object.assign( {},x, {id: x.id_cliente,  totale: x.importo_totale}))); 

        let chartLabelsConsegneMeseAnno =  resp.elenco_consegne_annomese.map ( x => x.anno_mese); 
        let chartColorsConsegneMeseAnno =  resp.elenco_consegne_annomese.map ( x =>  getRandomColor());        
        let chartDataConsegneMeseAnno  = {
          labels: chartLabelsConsegneMeseAnno,
          datasets: [
            {
              label: 'Importo €',
              data: resp.elenco_consegne_annomese.map ( x => x.importo_totale),
              borderWidth: 1,
              backgroundColor: chartColorsConsegneMeseAnno
            },
          ],
       }


       let chartLabelsConsegneClienti =  resp.elenco_consegne_cliente.map ( x => CommonFunctions.titleCase( x.cliente.length < 20 ? x.cliente : x.cliente.substring(0, 20) + "...")); 
       let chartColorsConsegneClienti =  resp.elenco_consegne_cliente.map ( x =>  getRandomColor()); 
       let chartDataConsegneClienti  = {
         labels: chartLabelsConsegneClienti,
         datasets: [
           {
             label: 'Importo €',
             data: resp.elenco_consegne_cliente.map ( x => x.importo_totale ),
             dataIdCliente: resp.elenco_consegne_cliente.map ( x => x.id_cliente ),
             borderWidth: 1,
             backgroundColor: chartColorsConsegneClienti
           },
         ],
        }

 
        let chartLabelsConsegneArticoli =  resp.elenco_consegne_articoli.map ( x =>  x.codice ); 
        let chartColorsConsegneArticoli =  resp.elenco_consegne_articoli.map ( x =>  getRandomColor()); 
        let chartDataConsegneArticoli  = {
          labels: chartLabelsConsegneArticoli,
          datasets: [
            {
              label: 'Importo €',
              data: resp.elenco_consegne_articoli.map ( x => x.importo_totale ),     
              dataIdArticoloBase: resp.elenco_consegne_articoli.map ( x => x.id_articolo_base ),        
              borderWidth: 1,
              backgroundColor: chartColorsConsegneArticoli
            },
          ],
         }



       this.setState({chartDataConsegneArticoli: chartDataConsegneArticoli, isInProgress: false , chartDataConsegneMeseAnno:  chartDataConsegneMeseAnno, chartDataConsegneClienti: chartDataConsegneClienti,  chartDataArticoli: chartDataArticoli , chartDataOrdiniClienti: chartDataOrdiniClienti  }); 
      }
      else
      {
        this.setState({ isInProgress: true   }); 
        NotificationManager.error('Errore server', 'Grafici', 3000); 
        return;
      }
    }
 

    async handleExecRicerca   (formFilter: ConsegnaFiltri)
    {
      
      if ( this.lastFiltri.data_consegna_effettuata_dal !== formFilter.data_consegna_effettuata_dal 
        || this.lastFiltri.data_consegna_effettuata_al !== formFilter.data_consegna_effettuata_al
        || this.lastFiltri.id_cliente !== formFilter.id_cliente)
      {
 
           
       //   console.log("handleExecRicerca LOAD")
          this.lastFiltri = formFilter;   
          this.loadDati();
        
      }
      
    }

    render() {    
      const that = this;

      const    optionsOrdiniCLienti = {
        indexAxis: 'x' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        plugins: {
          tooltip: {
            callbacks: {
                label: function(context) { 
                return  context.dataset.label + " - " +  that.props.elenco_clienti.find( (x :any) => x.id_cliente === parseInt(context.dataset.label))?.descrizione
                } 
              } 
            }    ,
                  
          legend: {
             display: false,
          },
          title: {
            display: true,
            text: 'CONSEGNE CLIENTI x MESE ANNO',
          },
        },
 
      };

      const optionsArticoliOrdinati = {
        indexAxis: 'x' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        plugins: {
          tooltip: {
            callbacks: {
                label: function(context:any) {  
                return  context.dataset.label + " - " +  that.props.elenco_articoli.find( (x :any) => x.codice === context.dataset.label)?.descrizione
                } 
              } 
            }    ,
          legend: {
             display: false,
          },
          title: {
            display: true,
            text: 'CONSEGNE ARTICOLI X MESE ANNO',
          },
        },
 
      };
      

 
   const optionsConsegneMeseAnno = {
    indexAxis: 'x' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false, // Modo corretto per nascondere la legenda
        },
        title: {
            display: true,
            text: 'CONSEGNE IMPORTI MENSILI',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Periodo'
            }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Importo'
            }
        }
      } 
    };
              
 
      const optionsConsegneCliente = {
        indexAxis: 'x' as const, 

        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {

          tooltip: {
            callbacks: {
                label: function(context:any) { 
                
                let id_cliente_sel  =parseInt( context.dataset.dataIdCliente[context.dataIndex] );
                let cliente_sel =  that.props.elenco_clienti.find( (x :any) => x.id_cliente === id_cliente_sel)
                return  "Importo € " + context.dataset.data[context.dataIndex] + " - " 
                 + cliente_sel?.descrizione + " (" + cliente_sel.comune +")"
                } 
              } 
            }    ,
            
            
          legend: {
             display: false,
          },

          title: {
            display: true,
            text: 'CONSEGNE CLIENTI',
          },
        },
        scales: {
          x: {
              title: {
                  display: true,
                  text: 'Periodo'
              }
          },
          y: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'Importo'
              }
          }
        } 
      };



      
      const optionsConsegneArticoli = {
        indexAxis: 'x' as const, 

        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
 
          tooltip: {

            callbacks: {
                label: function(context) { 
                
                let id_articolo_sel  =parseInt( context.dataset.dataIdArticoloBase[context.dataIndex] );
                let articolo_sel =  that.props.elenco_articoli.find( (x :any) => x.id_articolo_base === id_articolo_sel)
                return  "Importo € " + context.dataset.data[context.dataIndex] + " - " 
                 + articolo_sel?.descrizione  
                } 
              } 
            }    ,            
            
          legend: {
            display: false,
          },

          title: {
            display: true,
            text: 'CONSEGNE ARTICOLI',
          },
        },
      };





        return (

        <> 
        <Box  mt={4} display="flex" flexDirection="column" alignItems="center"  width="100%" 
                  justifyContent="center"    mb={1} > 

          {this.state.isInProgress &&
            <Box mt={2}  mb={2}>
                <CircularProgress color="primary" />                
            </Box>
            }

        <Box width="75%"  mt={2}> 
          
          <Consegne_elencoFiltriView    
              elenco_clienti = {this.props.elenco_clienti}
              showFiltroCliente={true}
              initFiltri={this.lastFiltri}   
              handleExecRicerca={this.handleExecRicerca}   />
        </Box>
    

{!this.state.isInProgress &&
<>

 
  
            
 


 
      
      
      </>
    }
        </Box>

        </>
     
    )}

 
}


function mapStateToProps(state) {
  
  
  return {
    elenco_clienti: state.clientiReducer.elenco_clienti ,
    elenco_articoli: state.articoliReducer.elenco_articoli

  };
}

function mapDispatchToProps(dispatch) {
    return {
  
        
        
    }
  }
 

const appGrafici_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  Grafici_schedaPage );
export    { appGrafici_schedaPage as Grafici } ; 
 

