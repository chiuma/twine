import React  from 'react';
 
 
import {   AppBar,   Box,   Button, CircularProgress,     Dialog,  DialogContent,  FormControl,    Grid,    Paper,        Tab,    Tabs,    Toolbar, Typography } from '@mui/material';
 
import TextField from '@mui/material/TextField/TextField';
 

 
import EmailIcon from '@mui/icons-material/EmailRounded';
import TelefonoIcon from '@mui/icons-material/PhoneRounded';
import CellulareIcon from '@mui/icons-material/PhoneAndroid';
 
import   styles   from '../common/globalStyle'
import { Consegne_elenco } from '../components/Consegne_elenco';
import { IconsMenu } from '../common/Icons';
import { withStyles } from '@mui/styles';
import { CustomComponents } from '../utils/CustomComponents';
 
 
function Scheda   (props: any  ) {
 
//  console.log("Scheda", props )
  let propieta = props ;
  return (   
    <Box width="100%">
          {propieta.isInProgress &&   <Box mt={2}><CircularProgress color="primary"/></Box>   }

       

      <Box mb={2} mt={2} >

          <FormControl style={{width: '100%'}}>

          <Grid container spacing={3} >
    
                <Grid item xs={6} > 
                        <CustomComponents.CustomTextField  
                            error={propieta.formDataError.descrizione !== ""}
                            helperText={propieta.formDataError.descrizione}
                            
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="descrizione"
                            name="descrizione"
                            label="Descrizione"
                            value={propieta.formData.descrizione}   
                            onChange={propieta.handleChangeForm}    
                        />

                </Grid>
                <Grid item xs={3} >
                         <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="piva"
                            name="piva"
                            label="P. iva"
                        
                            value={propieta.formData.piva}   
                            onChange={propieta.handleChangeForm}    
                        />          
                </Grid>
                <Grid item xs={3} >
                      <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="codfiscale"
                            name="codfiscale"
                            label="Cod. fiscale"
                            value={propieta.formData.codfiscale}   
                            onChange={propieta.handleChangeForm}    
                        />

                </Grid>



                <Grid item xs={4} >
                       
                       <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                startAdornment: (<TelefonoIcon color="primary" />),
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="telefono"
                            name="telefono"
                            label="Telefono"
                    
                            value={propieta.formData.telefono}   
                            onChange={propieta.handleChangeForm}    
                        />   


                </Grid>

                
                <Grid item xs={4} >
                       
                        <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                startAdornment: (<CellulareIcon color="primary" />),
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="cellulare"
                            name="cellulare"
                            label="Cellulare"
                    
                            value={propieta.formData.cellulare}   
                            onChange={propieta.handleChangeForm}    
                        />   


                </Grid>


                <Grid item xs={4} >
                         <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                              startAdornment: (<EmailIcon color="primary" />),
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="email"
                            name="email"
                            label="Email"
                        
                            value={propieta.formData.email}   
                            onChange={propieta.handleChangeForm}    
                        />          
                </Grid>

                <Grid item xs={1} >
                         <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="cap"
                            name="cap"
                            label="Cap"
                    
                            value={propieta.formData.cap}   
                            onChange={propieta.handleChangeForm}    
                        />            

                </Grid>










                <Grid item xs={4} >
                        <CustomComponents.CustomTextField  
                          disabled={propieta.bReadObnly}   
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="comune"
                            name="comune"
                            label="Comune"
                            value={propieta.formData.comune}   
                            onChange={propieta.handleChangeForm}    
                        />

                </Grid>
                <Grid item xs={1} >
                        <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}  
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="provincia"
                            name="provincia"
                            label="Provincia"
                        
                            value={propieta.formData.provincia}   
                            onChange={propieta.handleChangeForm}    
                        />          
                </Grid>
                <Grid item xs={6} >
                        <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}  
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="indirizzo"
                            name="indirizzo"
                            label="Indirizzo"
                    
                            value={propieta.formData.indirizzo}   
                            onChange={propieta.handleChangeForm}    
                        />            

                </Grid>


                <Grid item xs={12} >
                         <CustomComponents.CustomTextField  
                            disabled={propieta.bReadObnly}  
                            InputProps={{ 
                                classes:{
                                  root: propieta.classes.inputRoot,
                                  disabled: propieta.classes.disabled,
                                }
                              }}
                             
                            id="indirizzo_legale"
                            name="indirizzo_legale"
                            label="Indirizzo legale"
                    
                            value={propieta.formData.indirizzo_legale}   
                            onChange={propieta.handleChangeForm}    
                        />            

                </Grid>

            </Grid>


          </FormControl>
      </Box>


    </Box>
   );
}
        
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function SchedaTabs (props: any  ) {
 // console.log("TEST sss", props.formData)
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
   
  return (
    
    < >
      <AppBar position="static">

      <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="space-between"  > 
        <Box>
     
          <Tabs value={value} onChange={handleChange} aria-label="Scheda"    
              TabIndicatorProps={{ style: { background: "white"  } }}>
            <Tab label="Scheda"    sx={{
                color: 'antiquewhite', // Colore per lo stato non selezionato
                '&.Mui-selected': {
                  color: 'white', // Colore per lo stato selezionato
                },
              }} icon={<IconsMenu.ClientiIcon  sx={{ color: 'white' }} />} />

            {props.formData.id_cliente !== -1 && props.showConsegne &&
            <Tab label="Consegne"   sx={{
                color: 'antiquewhite', // Colore per lo stato non selezionato
                '&.Mui-selected': {
                  color: 'white', // Colore per lo stato selezionato
                },
              }} icon={<IconsMenu.ConsegneIcon sx={{ color: 'white' }} />}/>
            }
    
          </Tabs>
        </Box>

        <Box  mr={4} >
          <Box  fontWeight={700} style={{color:'white'}}   >
           {props.formData.id_cliente === -1 ? "Nuovo Cliente" : "" + props.formData.descrizione}
           </Box>
        </Box>

        <Box    justifyContent="flex-end" display="flex">
        <Toolbar> 
        
          {!props.readOnly && props.bChangedForm &&
          <Button  startIcon={<IconsMenu.SaveIcon />}  onClick={props.saveScheda} style={{marginRight:10}} size="small"  color="primary" variant="contained" >
          Salva
          </Button>
          }

          <Button onClick={props.handleClose}  size="small"   color="primary" variant="contained"> 
           Chiudi
          </Button>
        </Toolbar>
        </Box>
      </Box>
      </AppBar>


      <TabPanel value={value} index={0}>
        <Scheda    {...props} />
      </TabPanel>

      {props.formData.id_cliente !== -1 &&
      <TabPanel value={value} index={1}>
        <Consegne_elenco   id_cliente={props.formData.id_cliente}  {...props}/> 
      </TabPanel>
       }
 
    </>
  );
}


export interface IProps { 
    formData: any,
    formDataError: any,
 
    showConsegne: boolean,
    handleChangeForm: any,

    scheda: any,

    classes: any,
    isModal:boolean,
    handleClose:any,
    saveScheda:any,
    isInProgress: boolean,
    readOnly:boolean,
    bChangedForm: boolean

}
   
export interface IState {
    
 
}
 

class Cliente_schedaView  extends React.Component <IProps,IState> {
    
  
    constructor(props: any) {
      super(props); 
    }
 
 

    render() {    
   
 
        
        return (

        <> 
          {this.props.isModal && 


            <Dialog scroll="body" open={true} onClose={this.props.handleClose} aria-labelledby="form-dialog-title"
                    classes={{      paperWidthSm: this.props.classes.paperDialogClienti     }}>

                <DialogContent  style={{ overflow: "hidden" }}>
                <SchedaTabs  {...this.props} />
                </DialogContent>
            </Dialog>
           
          
          }

          {!this.props.isModal && 
            <Box  display="flex" flexDirection="row" alignItems="center"  height="70%"  

            width={{ xs: '95%', sm: '90%' , md: '90%', lg: '85%', xl: '80%',}} 
            mt={4}   justifyContent="center"  > 
                       <Paper className={this.props.classes.paperElenco} variant="outlined"  >

                <SchedaTabs  {...this.props} />

               </Paper>
            </Box>
          }
 

        </>
     
    )}

 
}

 
 
 
  export default withStyles(styles) (Cliente_schedaView) ;  
