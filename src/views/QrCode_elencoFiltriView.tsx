import React from 'react';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import { QrCode } from '../model/QrCode';
import { IconsMenu } from '../common/Icons';
import { CustomComponents } from '../utils/CustomComponents';

interface Props   {
    initFiltri: any; 
    handleExecRicerca: any,  
    handleStampa:any
  }

export function QrCode_elencoFiltriView (props: Props ) {

 


 
     const [code, setCode] = useState(props.initFiltri ? props.initFiltri.code : "");
    

  
    return (



      <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="center"  width="100%"
      >
      <Box width="75%"> 
  
        <Container style={{marginTop: '2%', marginBottom: '2%'}}>

          
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
           <Typography  variant="h6" color="primary">Filtri</Typography> 
          </AccordionSummary>
          <AccordionDetails>
  
          <Grid container spacing={3}      alignItems="flex-end"   >

           

            <Grid item xs={12} sm={12} md={6}>
              <CustomComponents.CustomTextField  
                                id="code"
                                name="code"
                                type="string"
                                label="Qr Code" 
                                value={code}   
                                onChange={ (event:any) => { setCode( ( event.target.value));   
                                  props.handleExecRicerca ( {  code:  event.target.value } )
                                } }    
                            />
            </Grid>

            
             
  
            <Grid item xs={12} sm={12} md={2}>
              <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="flex-end" width="100%">
               <Button onClick={ e => 
                        {                           
                          setCode("");    
                          props.handleExecRicerca ( {  code: ''  }  ) ;
                        } 
                      }              
                  style={{marginRight:10}} size="small" color="primary" variant="contained">
                Reset
                </Button>
  
 
                </Box>
            </Grid>
          </Grid>
  
  
  
  
          </AccordionDetails>
      </Accordion>
        </Container>              

      </Box>
      <Box width="25%">
  

        <Box mt={2}>
                        <Button startIcon={<IconsMenu.StampaIcon />} 
                        onClick={ e=>  props.handleStampa(true, "qrcode")  } 
                             size="small" color="primary" variant="contained" >
                           Qr Code
                        </Button>
                        </Box>
      </Box>
    </Box>
    )
  }
   
  