import React from 'react';
import {  
  Box,
  Button, 
  FormHelperText,
  Paper, 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import styles from '../common/globalStyle';
import { CustomComponents } from '../utils/CustomComponents';

import { Colore } from '../model/Colore';
import { Articolo } from '../model/Articolo';
import { QRCodeSVG } from 'qrcode.react';
import { withStyles } from '@mui/styles';
import { IconsMenu } from '../common/Icons';

function SchedaQrCode(props: any) {
  const { propieta } = props;
  
  return  (   
 
      <Box   width="100%"  p={2}   > 
        
      


      
        <Box  mt={2}   width="100%">
            <Paper elevation={1}  variant="outlined">
              <FormQrCode propieta={propieta} />
            </Paper>
        </Box>
          
 
              
              
   
         
 
          

      </Box>
    );
}

function FormQrCode(props: any) {
  const { propieta } = props;
   
  return (   
     
           
 
      <Box  width="100%" display="flex" flexDirection="row"   alignItems="flex-start" justifyContent="space-around"  height="auto" >
          
            {false && (propieta.formData.id_articolo_base !== -1 || propieta.formData.id_colore !== -1)  &&
            <>
            <Box mt={2} mr={2} width="25%"> 
            <Box  m={1}><QRCodeSVG value={propieta.formData.code} size={128} /></Box>
            <Box ml={1}>{propieta.formData.code}</Box>
            </Box>
            </>
            }
   
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

          <Box mt={2}  mr={2} width="10%">
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
          
          <Box mt={2}  mr={2} width="10%">
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
          
          <Box mt={2}  mr={2} width="10%">
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
          <Box mt={2}  mr={2} width="10%">
            <Button  startIcon={<IconsMenu.NuovoIcon  />}  onClick={propieta.saveScheda} style={{marginRight:10}} size="small" color="primary" variant="contained" >
            Aggiungi
            </Button>
          </Box>
                    
      </Box>
      
 
           
 
   );
}
       

export interface IProps { 
    formData: any,
    formDataError: any,
   
    handleChangeForm: any,
    
   
    elenco_colori: any,
    elenco_articoli: any,
    classes: any,
  
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
    
    
                    <SchedaQrCode  propieta={this.props} />
        
  
 

        </>
     
    )}

 
}

 
 
 


export default withStyles(styles) (QrCode_schedaView) ;