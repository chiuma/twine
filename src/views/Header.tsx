import React  from 'react';
import { AppBar,  Box,   Toolbar,  Typography   } from '@mui/material';
  
import { AccountCircle } from '@mui/icons-material';
 
import { withRouter } from "react-router";

 
import {IconsMenu} from '../common/Icons'
import { withStyles } from '@mui/styles';
interface Props { 
  classes: any,
  isMobile:boolean,
  history: any,
}

interface State {    
 
}

const styles =  theme => ({

  barBackground: {backgroundColor:'#007bff'},

 

  title: {
    flexGrow: 1,
  },
});

 

function Scheda(props: any) { 
  return (   
    <AppBar position="static" className={props.classes.barBackground} color="primary">
      <Toolbar>
        <Box mr={2}>
          {props.children}
        </Box>
        
        <Box mr={2}>
          {props.iconPage}
        </Box>
        
        <Typography variant="h6" className={props.classes.title}>
          TWINE - {props.descPage}
        </Typography>

        <Box mr={2}>
          <AccountCircle />
        </Box>
        
        <Box mr={1}>{sessionStorage.getItem("username")}</Box>
      </Toolbar>
    </AppBar>
  );
}

function SchedaSm(props: any) { 
  return (   
    <AppBar position="static" className={props.classes.barBackground} color="primary">
      <Toolbar className={props.classes.toolbar}>
        <Box mr={1}>
          {props.children}
        </Box>
        
        <Box mr={1}>
          {props.iconPage}
        </Box>
        
        <Typography variant="subtitle1" className={props.classes.title}>
          TWINE - {props.descPage}
        </Typography>

        <Box mr={1}>
          <AccountCircle className={props.classes.icon} />
        </Box>
        
        <Box className={props.classes.username} mr={.5}>
          {sessionStorage.getItem("username")}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

class HeaderPage extends   React.Component <Props,State> {

 

  
  

  getDescPage()
  {
    let ris = ""; 

    const page =  this.props.history.location.pathname 
 
    
    if (page === "/home" || page === "/")
    {
      ris ="Home"
     
    }
    else if (page === "/changePwd")
      {
        ris ="Cambio Password"
      }
    else if (page === "/grafici")
    {
      ris ="Grafici"
    }
    else if (page === "/clienti_elenco")
    {
      ris ="Clienti"
    }
    else if (page === "/articoli_elenco")
    {
      ris ="Articoli"
    }
    else if (page === "/ordini_elenco")
    {
      ris ="Ordini"
    }
    else if (page === "/consegne_elenco")
    {
      ris ="Consegne"
    }
    else if (page === "/colori_elenco")
    {
      ris ="Colori"
    }
 
    else if (page === "/provenienze_elenco")
    {
      ris ="Provenienze"
    }
     else if (page === "/qrcode_elenco")
    {
      ris ="Qr Code"
    }
 

    return ris;
  }

  getIconPage()
  {
    
   
    const page =  this.props.history.location.pathname 

    
    if (page === "/home" || page === "/")
    {
      return <IconsMenu.HomeIcon />
     
    }
    else if (page === "/changePwd")
      {
        return <IconsMenu.ChamgePwdIcon />
      }
    else if (page === "/grafici")
    {
      return <IconsMenu.GraficiIcon />
    }
    else if (page === "/clienti_elenco")
    {
      return <IconsMenu.ClientiIcon />
    }
    else if (page === "/articoli_elenco")
    {
      return <IconsMenu.ArticoliIcon />
    }
    else if (page === "/ordini_elenco")
    {
      return <IconsMenu.OrdiniIcon />
    }
    else if (page === "/consegne_elenco")
    {
      return <IconsMenu.ConsegneIcon />
    }
    else if (page === "/colori_elenco")
    {
      return <IconsMenu.ColoriIcon />
    }
 
    else if (page === "/provenienze_elenco")
    {
      return <IconsMenu.ProvenienzeIcon />
    }
    else if (page === "/qrcode_elenco")
    {
      return <IconsMenu.QrCodeIcon />
    }
    return null;
  }
 


  render() {
    return (
      <React.Fragment>
        {this.props.isMobile ? (
          <SchedaSm
            {...this.props}
            descPage={this.getDescPage()}
            iconPage={this.getIconPage()}
          />
        ) : (
          <Scheda
            {...this.props}
            descPage={this.getDescPage()}
            iconPage={this.getIconPage()}
          />
        )}
      </React.Fragment>
    );
  }
}

 
const Header =  withRouter(HeaderPage);
  export default withStyles(styles) (Header) ;  
 
