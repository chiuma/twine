import React from 'react';
 
import 'react-notifications/lib/notifications.css';
import '../App.css';
 
import { withRouter } from "react-router";
 
import { connect } from 'react-redux';
import {     CircularProgress, Grid, Link, Tooltip  } from '@material-ui/core';
import {NotificationManager} from 'react-notifications';
import { Box } from '@material-ui/core';
 
import MenuApp from '../views/MenuApp';
 
 
 
import {   Switch , Route} from "react-router-dom";
import { Cliente_scheda } from '../components/Cliente_scheda';
import { Cliente } from '../model/Cliente';
import { Clienti_elenco } from '../components/Clienti_elenco';
import { clientiActions } from '../actions/clienti.action';
import { clientiServices } from '../services/clientiServices';
import Header from '../views/Header';
import { coloriActions } from '../actions/colori.action';
import { Colore_scheda } from '../components/Colore_scheda';
import { Colore } from '../model/Colore';
import { coloriServices } from '../services/coloriServices';
import { Colori_elenco } from '../components/Colori_elenco';
import { articoliActions } from '../actions/articoli.action';
import { articoliServices } from '../services/articoliServices';
import { Articolo } from '../model/Articolo';
import { Articoli_elenco } from '../components/Articoli_elenco';
import { Articolo_scheda } from '../components/Articolo_scheda';
import { Ordini_elenco } from '../components/Ordini_elenco';
import { provenienzeActions } from '../actions/provenienze.action';
import { provenienzeServices } from '../services/provenienzeService';
import { Provenienza } from '../model/Provenienza';
import { Consegne_elenco } from '../components/Consegne_elenco';
import { Provenienze_elenco } from '../components/Provenienze_elenco';
import { Provenienza_scheda } from '../components/Provenienza_scheda';
 
import { QrCode_elenco } from '../components/QrCode_elenco';
import { QrCode_scheda } from '../components/QrCode_scheda';

import { Grafici } from './Garfici';
import { ConstantUtils } from '../ConstantUtils';
import { IconsMenu } from '../common/Icons';
 
 
function HomePage   (propieta: any  ) {
 
 

  return (   
 
  <Box   width="50%"   marginX="auto" marginY="auto" display="flex"  mt={8}
      flexDirection="row" alignItems="center" justifyContent="center"> 
     

      <Grid container spacing={8} >
 
        <Grid item xs={3}>
         
        </Grid>
        <Grid item xs={6}>
            <Box  textAlign="center">
              <Tooltip title="Clienti" arrow>
                <Link component="button" onClick={() => { propieta.goToPage("clienti_elenco")}} color="inherit">
               <IconsMenu.ClientiIcon color="primary"  className="big_icons"  />
                </Link>
               </Tooltip>
            </Box>
      
        </Grid>
        <Grid item xs={3}>
       
        </Grid>
    

        <Grid item xs={12}/>


        <Grid item xs={3}> 
            <Box>
            <Tooltip title="Ordini" arrow>
            <Link component="button" onClick={() => { propieta.goToPage("ordini_elenco")}} color="inherit">
              <IconsMenu.OrdiniIcon  className="big_icons"  color="primary"   />
            </Link>
            </Tooltip>
            </Box>
        </Grid>
        
        <Grid item xs={6}>
   
         
         <img className="img-fluid d-block mx-auto  " alt="Twine"
                 src={ConstantUtils.url.HOME_URL +  "img/logo.png"} /> 

 
        </Grid>
        
        <Grid item xs={3}  >
            <Box width="100%" textAlign="right">
            <Tooltip title="Consegne" arrow>
            <Link component="button" onClick={() => { propieta.goToPage("consegne_elenco")}} color="inherit">
            <IconsMenu.ConsegneIcon color="primary"  className="big_icons" />
             </Link>
             </Tooltip>
            </Box>
        </Grid>
    


        <Grid item xs={12}/>

        <Grid item xs={3}>
          
        </Grid>
        <Grid item xs={6}>

            <Box  textAlign="center">
              <Tooltip title="Articoli" arrow>
              <Link component="button" onClick={() => { propieta.goToPage("articoli_elenco")}} color="inherit">
              <IconsMenu.ArticoliIcon  className="big_icons" color="primary"   />
              </Link>
              </Tooltip>
            </Box>
        </Grid>
        <Grid item xs={3}>
        
        </Grid>

      </Grid>


    </Box>
   );
}

export interface IProps { 
  history: any,
  actSetElencoProvenienze:any,
  actSetElencoClienti: any,
  actSetElencoColori: any,
  
  actSetElencoArticoli: any,
  actShowCliente:any,
  actShowColore: any,
  actShowArticolo: any,
  actShowProvenienza: any,


  provenienza_show: any,
  cliente_show:any,
  colore_show: any,
  articolo_show: any,
}
   
export interface IState {
 
 
 isInProgress: boolean;
 
 

}


 
class AppPage   extends React.Component <IProps,IState> {
   
  constructor(props: any) 
  {
    super(props); 
    
    this.state = {   isInProgress:false  }; 
    this.goToPage  = this.goToPage.bind(this);
    this.handleHideSchedaCliente  = this.handleHideSchedaCliente.bind(this);
    this.handleHideSchedaColore  = this.handleHideSchedaColore.bind(this);
    this.handleHideSchedaArticolo  = this.handleHideSchedaArticolo.bind(this);
    this.handleHideSchedaProvenienza = this.handleHideSchedaProvenienza.bind(this);
  
    // let myprop1 = (window as any)?.Configs.prop1;
 
  
  }

  async loadArchivio()
  {
    
    this.setState({ isInProgress: true   }); 

    let resp = await provenienzeServices.getElenco();
    if ( resp.esito === "OK" )
    {
     
      let elenco =  resp.elenco.map ( x =>  new Provenienza(x)  ) ; 
      this.props.actSetElencoProvenienze (  elenco );
    }
    else
    {
      this.setState({ isInProgress: false   }); 
      NotificationManager.error('Errore server', 'Twine', 3000); 
      return;
    }

    resp = await clientiServices.getElenco();
    if ( resp.esito === "OK" )
    {
     
      let elenco =  resp.elenco.map ( x =>  new Cliente(x)  ) ; 
      this.props.actSetElencoClienti (  elenco );
    }
    else
    {
      this.setState({ isInProgress: false   }); 
      NotificationManager.error('Errore server', 'Twine', 3000); 
      return;
    }

    resp = await coloriServices.getElenco();
    if ( resp.esito === "OK" )
    {
     
      let elenco =  resp.elenco.map ( x =>  new Colore(x)  ) ; 
      this.props.actSetElencoColori ( elenco );
    }
    else
    {
      this.setState({ isInProgress: false   }); 
      NotificationManager.error('Errore server  durante il caricamento dei Colori', 'Twine', 3000); 
      return;
    }


    resp = await articoliServices.getElenco();
    if ( resp.esito === "OK" )
    {
     
      let elenco =  resp.elenco.map ( x =>  new Articolo(x)  ) ; 
      this.props.actSetElencoArticoli ( elenco );
    }
    else
    {
      this.setState({ isInProgress: false   }); 
      NotificationManager.error('Errore server  durante il caricamento Articoli', 'Twine', 3000); 
      return;
    }


    this.setState({ isInProgress: false   }); 

  }

  
  componentDidMount()
  { 
    //const windowUrl = window.location.search;
     this.loadArchivio();
  }

  handleHideSchedaCliente()
  {
     
    this.props.actShowCliente ( null );
  }
 
  handleHideSchedaColore()
  {
     
    this.props.actShowColore ( null );
  }


  handleHideSchedaProvenienza()
  {
     
    this.props.actShowProvenienza ( null );
  }

  handleHideSchedaArticolo()
  {
     
    this.props.actShowArticolo ( null );
  }



  goToPage(page:string)
  {

   //  console.log("this.props.history - goToPage" ,page )
    if ( page === "clienti_new")
    {
      this.props.actShowCliente ( new Cliente() );
      
    }
    else if (page === "logout")
    {
       sessionStorage.clear();
       window.location.reload();
    }
    else if ( page === "home")
    {
      this.props.history.push("/home");
    }
    else if ( page === "grafici")
    {
      this.props.history.push("/grafici");
    }
    else if ( page === "clienti_elenco")
    {
      this.props.history.push("/clienti_elenco");
    }

    else if ( page === "colori_new")
    {
      this.props.actShowColore ( new Colore() );
      
    }

    else if ( page === "articoli_new")
    {
      this.props.actShowArticolo ( new Articolo() );
      
    }

    else if ( page === "provenienze_new")
    {
      
      this.props.actShowProvenienza ( new Provenienza() );
      
    }

    else if ( page === "articoli_elenco")
    {
      this.props.history.push("/articoli_elenco");
    }

    else if ( page === "colori_elenco")
    {
      this.props.history.push("/colori_elenco");
    }

    else if ( page === "ordini_elenco")
    {
      this.props.history.push("/ordini_elenco");
    }
    else if ( page === "consegne_elenco")
    {
      this.props.history.push("/consegne_elenco");
    }    
    

    else if ( page === "provenienze_elenco")
    {
      this.props.history.push("/provenienze_elenco");
    }    
     else if ( page === "qrcode_elenco")
    {
      this.props.history.push("/qrcode_elenco");
    }

  }

  render() {
    


    if (this.state.isInProgress )
    {
      return (

        <Box style={{  width: '50%', margin: 'auto', marginTop:'2%', }}>
            <CircularProgress color="primary" />
        </Box>

       )
    }
 
     

    return (

<>
 

 



          <Box  display="flex" flexDirection="column" alignItems="stretch"  width="100%"   
                  justifyContent="flex-start"   > 
 
       
              <Box mb={2}>
              <Header>
                  <MenuApp  goToPage={this.goToPage}  />
              </Header>
              </Box>

              {this.props.cliente_show != null && 
                <Cliente_scheda  
                  showConsegne={false}
                  isModal={true}
                  handleClose={this.handleHideSchedaCliente}
                  scheda={this.props.cliente_show } />
              }           
              
              {this.props.colore_show != null && 
                <Colore_scheda  
                  isModal={true}
                  handleClose={this.handleHideSchedaColore}
                  scheda={this.props.colore_show } />
              }    

              {this.props.provenienza_show != null && 
                <Provenienza_scheda  
                  isModal={true}
                  handleClose={this.handleHideSchedaProvenienza}
                  scheda={this.props.provenienza_show } />
              }    

              {this.props.articolo_show  != null && 
                <Articolo_scheda  
                isModal={true}
                handleClose={this.handleHideSchedaArticolo}
                
                scheda={this.props.articolo_show  } />
              }    



            
                <Switch>
                
                  <Route path="/home" exact    render={(props) => (
                      <HomePage  goToPage={this.goToPage}   {...props}/>)} />

                  <Route path="/" exact    render={(props) => (
                      <HomePage   goToPage={this.goToPage}    {...props}/>)} />

                  {  sessionStorage.getItem("username") === "fulladmin" && 
                  <Route path="/grafici" exact    render={(props) => (
                    <Grafici     {...props}/>)} />
                
                  }

                  <Route path="/clienti_elenco" exact    render={(props) => (
                     <Clienti_elenco     {...props}/> )} />

                  <Route path="/colori_elenco" exact    render={(props) => (
                     <Colori_elenco     {...props}/>  )} />   


                  <Route path="/qrcode_elenco" exact    render={(props) => (
                     <QrCode_elenco     {...props}/>  )} />   

                  <Route path="/provenienze_elenco" exact    render={(props) => (
                      <Provenienze_elenco     {...props}/>)} />                         

                  <Route path="/articoli_elenco" exact    render={(props) => (
                     <Articoli_elenco     {...props}/>)} />   

                  <Route path="/ordini_elenco" exact    render={(props) => (
                      <Ordini_elenco     {...props}/>)} />   

                  <Route path="/consegne_elenco" exact    render={(props) => (
                      <Consegne_elenco     {...props}/>)} />   

 

                </Switch>
                </Box> 

 
</>      
  )}
 
}
 
 


function mapStateToProps(state) {
  
  
  return { 
    cliente_show: state.clientiReducer.cliente_show ,
    colore_show: state.coloriReducer.colore_show ,
    articolo_show: state.articoliReducer.articolo_show ,
    provenienza_show: state.provenienzeReducer.provenienza_show ,
    
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actSetElencoProvenienze: async (elenco) => {
        dispatch(provenienzeActions.elencoProvenienze(elenco));
      } ,

      actSetElencoClienti: async (elenco) => {
    
        dispatch(clientiActions.elencoClienti(elenco));
      } ,

      actSetElencoColori: async (elenco) => {
        
        dispatch(coloriActions.elencoColori(elenco));
      } ,

      actSetElencoArticoli: async (elenco) => {
        
        dispatch(articoliActions.elencoArticoli(elenco));
      } ,

      actShowCliente: async (scheda) => {
        dispatch(clientiActions.showCliente(scheda));
      } ,

      actShowProvenienza: async (scheda) => {
        dispatch(provenienzeActions.showProvenienza(scheda));
      } ,

      
      actShowColore: async (scheda) => {
        dispatch(coloriActions.showColore(scheda));
      } ,

      actShowArticolo: async (scheda) => {
        dispatch(articoliActions.showArticolo(scheda));
      } , 

    }
  }
 
  
  const appCliente_schedaPage = connect(mapStateToProps, mapDispatchToProps)(  withRouter(AppPage) );
  export    { appCliente_schedaPage as Home } ; 
 
 