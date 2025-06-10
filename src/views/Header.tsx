import React  from 'react';
 

import { AppBar,  Box, Toolbar,  Typography } from '@material-ui/core';
 
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle } from '@material-ui/icons';
 
import { withRouter } from "react-router";

 
import {IconsMenu} from '../common/Icons'
interface Props { 
  classes: any,
 
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


class HeaderPage extends   React.Component <Props,State> {

 

  
  

  getDescPage()
  {
    let ris = ""; 

    const page =  this.props.history.location.pathname 
 
    
    if (page === "/home" || page === "/")
    {
      ris ="Home"
     
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
 
 

    return ris;
  }

  getIconPage()
  {
    
   
    const page =  this.props.history.location.pathname 

    
    if (page === "/home" || page === "/")
    {
      return <IconsMenu.HomeIcon />
     
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
 
    return null;
  }
 

  render() {

 
      return (


        <React.Fragment>

<AppBar position="static" className={this.props.classes.barBackground} color="primary">
  <Toolbar>

    <Box mr={2}>
    {this.props.children}
    </Box>

    
    <Box mr={2}>
    {this.getIconPage()}
    </Box>
    
    <Typography variant="h6" className={this.props.classes.title}>
      TWINE - {this.getDescPage() }
    </Typography>
 



    <Box mr={2}>
    <AccountCircle />
    </Box>
    
    <Box mr={1}>{sessionStorage.getItem("username")}</Box>


  </Toolbar>
</AppBar>

 
    
 
        </React.Fragment>
      ) 
   
  }
}

 
const Header =  withRouter(HeaderPage);

export default    withStyles(styles) (Header) ;
