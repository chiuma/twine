import React  from 'react';
 
 
import {   AppBar,   Box,   Button, CircularProgress,     Dialog,  DialogContent,  FormControl,      Paper,    Toolbar, Typography } from '@material-ui/core';
 
import TextField from '@material-ui/core/TextField/TextField';
 
import { withStyles } from "@material-ui/core/styles";
 
import   styles   from '../common/globalStyle'
import { NumberFormatCustom } from '../utils/NumberFormatCustom';
 
import {IconsMenu} from '../common/Icons'

              
 
 
function SchedaArticolo   (props: any  ) {
  
  const {    propieta } = props;
  
  
 
  return (   
    <Box width="100%">
      {propieta.isInProgress &&

        <Box mt={2}>
            <CircularProgress color="primary" />
            
        </Box>
      }
      <Box   width="100%"  p={2}   > 
        
        <AppBar position="static"  className={propieta.classes.barBackground} color="primary">
        <Toolbar>
        
            <Typography variant="h6" className={propieta.classes.title}>
            Articolo - {propieta.formData.id_articolo_base === -1 ? "Nuovo" : "Modifica"}
            </Typography>


            {!propieta.readOnly && propieta.bChangedForm &&
            <Button  startIcon={<IconsMenu.SaveIcon />}  onClick={propieta.saveScheda} style={{marginRight:10}} size="small" color="primary" variant="contained" >
            Salva
            </Button>
            }

            <Button onClick={propieta.handleClose}  size="small" color="primary" variant="contained"> 
            Chiudi
            </Button>
        </Toolbar>
      </AppBar>



      
      <Box  mt={2}   width="100%">
          <Paper elevation={1}  variant="outlined">
            <FormArticolo propieta={propieta} />
          </Paper>
      </Box>
          
 
              
              
   
         
 
          

      </Box>
    </Box>
   );
}

function FormArticolo   (props: any  ) {
  
  const {    propieta } = props;
   
  return (   
  
           
    <FormControl  >
      <Box  display="flex" flexDirection="row"   alignItems="flex-start" justifyContent="space-around"  height="auto" >
          <Box mt={2} width="50%">
                  <TextField  size="small" 
                      error={propieta.formDataError.descrizione !== ""}
                      helperText={propieta.formDataError.descrizione}
                      InputLabelProps={{shrink: true}}
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

          </Box>
          <Box mt={2} width="20%">
                  <TextField   size="small" 
                      error={propieta.formDataError.codice !== ""}
                      helperText={propieta.formDataError.codice}
                      InputLabelProps={{shrink: true}}
                      disabled={propieta.bReadObnly}   
                      InputProps={{ 
                          classes:{
                            root: propieta.classes.inputRoot,
                            disabled: propieta.classes.disabled,
                          },
                          
                        }}
                       
                      id="codice"
                      name="codice"
                      label="Codice"
                      onChange={propieta.handleChangeForm}   
                      value={propieta.formData.codice}   
                      
                  />          
          </Box>

          <Box mt={2} width="15%">

          <NumberFormatCustom 
 

            value={propieta.formData.prezzo}  
            error={propieta.formDataError.prezzo !== ""}
            helperText={propieta.formDataError.prezzo}
            onChange={propieta.handleChangeForm}  
             
            id="prezzo"
            name="prezzo"
            label="Prezzo"
          />



          </Box>
      </Box>
    </FormControl>
           
 
   );
}
       

export interface IProps { 
    formData: any,
    formDataError: any,
   
    handleChangeForm: any,
    
    scheda: any,
    elenco_colori: any,
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
 

class Articolo_schedaView  extends React.Component <IProps,IState> {
    
  
    constructor(props: any) {
      super(props); 
    }
 
 

    componentDidMount()
    {
 
       
    }

 

    render() {    
   
       
        
        return (

        <> 
          {this.props.isModal && 


            <Dialog scroll="body" open={true} onClose={this.props.handleClose} aria-labelledby="form-dialog-title"
                    disableBackdropClick={true} 
                    classes={{      paperWidthSm: this.props.classes.paperDialogArticoli     }}>

                <DialogContent  style={{ overflow: "hidden" }}>
                    <SchedaArticolo  propieta={this.props} />
                </DialogContent>
            </Dialog>
           
          
          }

          {!this.props.isModal && 
            <Box  display="flex" flexDirection="row" alignItems="center"  
            width={{ xs: '80%', sm: '70%' , md: '65%', lg: '55%', xl: '40%',}} 
            mt={4}   justifyContent="center"  > 
                <Paper  className={this.props.classes.paperFullWidth} variant="outlined"  >
                <Box  width="100%" >
                <SchedaArticolo  propieta={this.props} />
                </Box>
               </Paper>
            </Box>
          }
 

        </>
     
    )}

 
}

 
 
 


export default withStyles(styles) (Articolo_schedaView);