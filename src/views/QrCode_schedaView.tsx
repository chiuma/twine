import React from 'react';
import { 
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  Paper,
  Toolbar,
  Typography,
  TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import styles from '../common/globalStyle';
import { CustomComponents } from '../utils/CustomComponents';

import { Colore } from '../model/Colore';
import { Articolo } from '../model/Articolo';
import { QRCodeSVG } from 'qrcode.react';
import { withStyles } from '@mui/styles';

function SchedaQrCode(props: any) {
  const { propieta } = props;
  
  return  (   
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
            Qr Code - {propieta.formData.id_qrcode === -1 ? "Nuovo" : "Modifica"}
            </Typography>


            {!propieta.readOnly && propieta.bChangedForm &&
            <Button  startIcon={<SaveIcon />}  onClick={propieta.saveScheda} style={{marginRight:10}} size="small" color="primary" variant="contained" >
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
            <FormQrCode propieta={propieta} />
          </Paper>
      </Box>
          
 
              
              
   
         
 
          

      </Box>
    </Box>
   );
}

function FormQrCode(props: any) {
  const { propieta } = props;
   
  return (   
     
           
    <FormControl  >
      <Box  display="flex" flexDirection="row"   alignItems="flex-start" justifyContent="space-around"  height="auto" >
          <Box mt={2} mr={2} width="25%">
            {propieta.formData.id_articolo_base !== -1 || propieta.formData.id_colore !== -1  &&
            <>
            <Box  m={1}><QRCodeSVG value={propieta.formData.code} size={128} /></Box>
            <Box ml={1}>{propieta.formData.code}</Box>
            </>
            }
          </Box>
          <Box mt={2}  mr={2} width="20%">

                <CustomComponents.CustomAutocomplete
                disabled={propieta.readOnly}
                  value={propieta.formData.id_articolo_base === -1 ? null :  propieta.elenco_articoli.find( x=> x.id_articolo_base === propieta.formData.id_articolo_base) }
                    options={propieta.elenco_articoli}
                    isOptionEqualToValue={ (option: Articolo ) => 
                    {
                      return option?.id_articolo_base === propieta.formData.id_articolo_base
                    }
                  }
                    getOptionLabel={ (option: any) => option  !== null && option.id_articolo_base !== -1 ?  option.codice : ''}
                    
                    onChange={ (event:any, option:any)  => 
                    propieta.handleChangeForm ({target: {name: 'id_articolo_base', value:  option != null ? option.id_articolo_base : -1 }}  ) 
                    }    
                  id="id_articolo_base" 
                  label="Articolo"
                />
                { propieta.formDataError.id_articolo_base !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{propieta.formDataError.id_articolo_base}</FormHelperText> 
                </Box>
                } 
                     
          </Box>

          <Box mt={2}  mr={2} width="15%">
            <CustomComponents.CustomAutocomplete
                  disabled={propieta.readOnly}
                  
                  value={ propieta.formData.id_colore === -1 ? null :  propieta.elenco_colori.find( x=> x.id_colore === propieta.formData.id_colore) }
                   options={propieta.elenco_colori}
                   isOptionEqualToValue={ (option: Colore ) => 
                    {
                      return option?.id_colore === propieta.formData.id_colore
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    propieta.handleChangeForm ({target: {name: 'id_colore', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore" 
                  label="Colore"
                />
                {propieta.formDataError.id_colore !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{propieta.formDataError.id_colore}</FormHelperText> 
                </Box>
                }       
          </Box>
          
          <Box mt={2}  mr={2} width="15%">
               <CustomComponents.CustomAutocomplete
                  disabled={propieta.readOnly}
                  
                  value={ propieta.formData.id_colore_2 === -1 ? null : propieta.elenco_colori.find( x=> x.id_colore  === propieta.formData.id_colore_2) }
                   options={propieta.elenco_colori}
                   isOptionEqualToValue={ (option: Colore ) => 
                    {
                      return option?.id_colore  === propieta.formData.id_colore_2
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    propieta.handleChangeForm ({target: {name: 'id_colore_2', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_2" 
                  label="Colore 2"
                />      
          </Box>
          
          <Box mt={2}  mr={2} width="15%">
               <CustomComponents.CustomAutocomplete
                  disabled={propieta.readOnly}
                  
                  value={ propieta.formData.id_colore_3 === -1 ? null :   propieta.elenco_colori.find( x=> x.id_colore  === propieta.formData.id_colore_3) }
                   options={propieta.elenco_colori}
                   isOptionEqualToValue={ (option: Colore ) => 
                    {
                      return option?.id_colore  === propieta.formData.id_colore_3
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    propieta.handleChangeForm ({target: {name: 'id_colore_3', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_3" 
                  label="Colore 3"
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
    elenco_articoli: any,
    classes: any,
 
    handleClose:any,
    saveScheda:any,
    isInProgress: boolean,
    readOnly:boolean,
    bChangedForm: boolean

}
   
export interface IState {
    
 
}
 

class QrCode_schedaView  extends React.Component <IProps,IState> {
    
  
    constructor(props: any) {
      super(props); 
    }
 
 

    componentDidMount()
    {
 
       
    }

 

    render() {    
   
       
        
        return (

        <> 
    
            <Dialog scroll="body" open={true} onClose={this.props.handleClose} aria-labelledby="form-dialog-title"
                    
                    classes={{      paperWidthSm: this.props.classes.paperDialogQrCode     }}>

                <DialogContent  style={{ overflow: "hidden" }}>
                    <SchedaQrCode  propieta={this.props} />
                </DialogContent>
            </Dialog>
           
  
 

        </>
     
    )}

 
}

 
 
 


export default withStyles(styles) (QrCode_schedaView) ;