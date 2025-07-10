import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconsMenu } from '../common/Icons';
import { ConstantUtils } from '../ConstantUtils';
import clsx from 'clsx';  
import { withStyles } from '@mui/styles';
import   styles   from '../common/globalStyle'  

const drawerStyles = {
  '& .MuiDrawer-paper': {
    backgroundColor: '#007bff',
  }
};

const listItemTextStyles = {
  marginTop: 0,
  marginBottom: 0,
};

const boxStyles = {
  width: 250,
  color: 'white',
};

const fullListStyles = {
  width: 'auto',
};

type Anchor = 'top' | 'left' | 'bottom' | 'right';

 function MenuApp (props) {
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
      className={clsx(props.classes.menuList)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box p={1}> 
        <img className="img-fluid d-block mx-auto w-50"  alt="Twine"
          src= {ConstantUtils.url.HOME_URL +  "img/logo.png"} />
      </Box>

      <List  >
        <Divider />
        <ListItemButton  >
          <ListItemIcon>
            <IconsMenu.HomeIcon />
          </ListItemIcon>
          <ListItemText  primary="Home" onClick={() => props.goToPage("home")} />
        </ListItemButton>
        
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.ClientiIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Elenco Clienti" onClick={() => props.goToPage("clienti_elenco")} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.NuovoIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Nuovo Cliente" onClick={() => props.goToPage("clienti_new")} />
        </ListItemButton>

        <Divider  variant="middle" />



        <ListItemButton    >
          <ListItemIcon>
            <IconsMenu.ColoriIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Elenco Colori" onClick={() => props.goToPage("colori_elenco")} />
        </ListItemButton>
        {(sessionStorage.getItem("profile") === "admin" || 
          sessionStorage.getItem("profile") === "adm") && 
        <ListItemButton >
          <ListItemIcon>
            <IconsMenu.NuovoIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Nuovo Colore" onClick={() => props.goToPage("colori_new")} />
        </ListItemButton>
        }

        {(sessionStorage.getItem("profile") === "admin" || 
          sessionStorage.getItem("profile") === "adm") && 
        <>
          <Divider  variant="middle"  />

          <ListItemButton    >
            <ListItemIcon>
              <IconsMenu.ProvenienzeIcon />
            </ListItemIcon>
            <ListItemText sx={listItemTextStyles} primary="Elenco Provenienze" onClick={() => props.goToPage("provenienze_elenco")} />
          </ListItemButton>

          <ListItemButton  >
            <ListItemIcon>
              <IconsMenu.NuovoIcon />
            </ListItemIcon>                
            <ListItemText sx={listItemTextStyles} primary="Nuova Provenienza" onClick={() => props.goToPage("provenienze_new")} />
          </ListItemButton>
        </>
        }

        <Divider  variant="middle"  />

        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.ArticoliIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Elenco Articoli" onClick={() => props.goToPage("articoli_elenco")} />
        </ListItemButton>
        {(sessionStorage.getItem("profile") === "admin" || 
          sessionStorage.getItem("profile") === "adm") && 
        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.NuovoIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Nuovo Articolo" onClick={() => props.goToPage("articoli_new")} />
        </ListItemButton>
        }
        <Divider  variant="middle"  />

        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.OrdiniIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Ordini" onClick={() => props.goToPage("ordini_elenco")} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.NuovoIcon />
          </ListItemIcon>                
          <ListItemText sx={listItemTextStyles} primary="Nuovo Ordine" onClick={() => props.goToPage("ordini_new")} />
        </ListItemButton>
        {(sessionStorage.getItem("profile") === "admin" || 
          sessionStorage.getItem("profile") === "adm") && 
        <>
        <Divider  variant="middle"  />
        <ListItemButton>
          <ListItemIcon>
            <IconsMenu.ConsegneIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Consegne" onClick={() => props.goToPage("consegne_elenco")} />
        </ListItemButton>
          </>
        }

      {sessionStorage.getItem("profile") === "admin"   && 
        <>
        <Divider  variant="middle" />

        <ListItemButton   >
          <ListItemIcon>
            <IconsMenu.GraficiIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Grafici" onClick={() => props.goToPage("grafici")} />
        </ListItemButton>
        </>
        }
      </List>
      
      <Divider  variant="middle"  />

<ListItemButton    >
  <ListItemIcon>
    <IconsMenu.QrCodeIcon />
  </ListItemIcon>
  <ListItemText sx={listItemTextStyles} primary="QrCode" onClick={() => props.goToPage("qrcode_elenco")} />
</ListItemButton> 

      <Divider  variant="middle" />


      <List>   
        <ListItemButton   >
        <ListItemIcon>
            <IconsMenu.ChamgePwdIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Cambia Password" onClick={() => props.goToPage("changePwd")} />
        </ListItemButton>
      </List>  


   


      <List>   
        <ListItemButton   >
        <ListItemIcon>
            <IconsMenu.LogoutIcon />
          </ListItemIcon>
          <ListItemText sx={listItemTextStyles} primary="Logout" onClick={() => props.goToPage("logout")} />
        </ListItemButton>
      </List>    
      
      <Divider  variant="middle" />
    </Box>
  );

  
  return (
    <React.Fragment>
    
      <IconButton 
        aria-label="delete"  
        onClick={toggleDrawer("left", true)}
        sx={{ outline: 'none' }}
      >
        <MenuIcon sx={{ color: 'white' }}/>
      </IconButton>

      <Drawer sx={drawerStyles} anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
export default withStyles( styles )( MenuApp );