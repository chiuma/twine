import React from 'react';
import clsx from 'clsx';
import {   makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
 
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
 
import ListItemText from '@material-ui/core/ListItemText';
 
import { Box, IconButton, ListItemIcon,   } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

 

import {IconsMenu} from '../common/Icons'
import { ConstantUtils } from '../ConstantUtils';

const useStyles = makeStyles({
  drawerStyle: { 
    backgroundColor: '#007bff',
  },
  list: {
    width: 250,
    color:'white',
 
  },
  fullList: {
    width: 'auto',
  },
  subtitle:
  {
     
    marginTop:5,
    color: "white",
    fontWeight: 'bolder'
  },

  textList:
  {
     marginTop: 0,
     marginBottom: 0, 
  }
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function MenuApp (props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
 
        <Box p={1}>
            <img className="img-fluid d-block mx-auto w-50"  alt="Twine"
              src= {ConstantUtils.url.HOME_URL +  "img/logo.png"} />
        </Box>

        <List  >
              <Divider />
              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.HomeIcon />
                </ListItemIcon>
                <ListItemText   classes={{root: classes.textList  }}  primary="Home"  onClick={event =>   { props.goToPage("home")    } } />
              </ListItem>
              
              <Divider />
              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.ClientiIcon />
                </ListItemIcon>
                <ListItemText   classes={{root: classes.textList  }}  primary="Elenco Clienti"  onClick={event =>   { props.goToPage("clienti_elenco")    } } />
              </ListItem>

              <ListItem button  >
                <ListItemIcon>
                    <IconsMenu.NuovoIcon />
                </ListItemIcon>
                <ListItemText   classes={{root: classes.textList  }}  primary="Nuovo Cliente"  onClick={event =>   { props.goToPage("clienti_new")    } } />
              </ListItem>

              <Divider  variant="middle" />



 
              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.ColoriIcon />
                </ListItemIcon>

                <ListItemText   classes={{root: classes.textList  }}  primary="Elenco Colori"  onClick={event =>   { props.goToPage("colori_elenco")    } } />
              </ListItem>

              <ListItem button  >
                <ListItemIcon>
                    <IconsMenu.NuovoIcon />
                </ListItemIcon>
                <ListItemText   classes={{root: classes.textList  }}  primary="Nuovo Colore"  onClick={event =>   { props.goToPage("colori_new")    } } />
              </ListItem>

              <Divider  variant="middle"  />
 


 
              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.ProvenienzeIcon />
                </ListItemIcon>

                <ListItemText   classes={{root: classes.textList  }}  primary="Elenco Provenienze"  onClick={event =>   { props.goToPage("provenienze_elenco")    } } />
              </ListItem>


              <ListItem button  >
                <ListItemIcon>
                    <IconsMenu.NuovoIcon />
                </ListItemIcon>                
                <ListItemText   classes={{root: classes.textList  }}  primary="Nuova Provenienza"  onClick={event =>   { props.goToPage("provenienze_new")    } } />
              </ListItem>

              <Divider  variant="middle"  />

 



 

              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.ArticoliIcon />
                </ListItemIcon>
                <ListItemText   classes={{root: classes.textList  }}  primary="Elenco Articoli"  onClick={event =>   { props.goToPage("articoli_elenco")    } } />
              </ListItem>

              <ListItem button  >
                <ListItemIcon>
                    <IconsMenu.NuovoIcon />
                </ListItemIcon>
                <ListItemText   classes={{root: classes.textList  }}  primary="Nuovo Articolo"  onClick={event =>   { props.goToPage("articoli_new")    } } />
              </ListItem>

              <Divider  variant="middle"  />

              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.OrdiniIcon />
                </ListItemIcon>

                <ListItemText   classes={{root: classes.textList  }}  primary="Ordini"  onClick={event =>   { props.goToPage("ordini_elenco")    } } />
              </ListItem>



              <Divider  variant="middle"  />
              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.ConsegneIcon />
                </ListItemIcon>

                <ListItemText   classes={{root: classes.textList  }}  primary="Consegne"  onClick={event =>   { props.goToPage("consegne_elenco")    } } />
              </ListItem>

              {  sessionStorage.getItem("username") === "fulladmin" && 
              <>
              <Divider  variant="middle"  />


              <ListItem button  >
                <ListItemIcon>
                  <IconsMenu.GraficiIcon />
                </ListItemIcon>

                <ListItemText   classes={{root: classes.textList  }}  primary="Grafici"  onClick={event =>   { props.goToPage("grafici")    } } />
              </ListItem>
              </>
              }
        </List>
        

        
        <Divider  variant="middle" />
 
  
        <List>   
              <ListItem button  >
                <ListItemText   classes={{root: classes.textList  }}  primary="Logout"  onClick={event =>   { props.goToPage("logout")    } } />
              </ListItem>
        </List>    
        <Divider  variant="middle" />

    </Box>
  );

  return (
 
       
        <React.Fragment>
  

              <IconButton aria-label="delete"  onClick={toggleDrawer("left", true)}
              
              style={{outline: 'none'}}>
              <MenuIcon  style={{ color: 'white' }}/>
              </IconButton>

        
       
            <Drawer   classes={{paper : classes.drawerStyle  }} anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
              {list("left")}
            </Drawer>
        </React.Fragment>
   
 
  );
}
