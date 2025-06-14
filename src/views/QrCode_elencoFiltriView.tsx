 

import {    Accordion, AccordionDetails, AccordionSummary, Box, Button, Container,   Grid,         TextField, Typography } from '@material-ui/core';
 
  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';
import { QrCode } from '../model/QrCode';
import { IconsMenu } from '../common/Icons';


interface Props   {
    initFiltri: any; 
    handleExecRicerca: any, 
    handleNewQrCode:any
    
  }

export function QrCode_elencoFiltriView (props: Props ) {

 


 
     const [code, setCode] = useState(props.initFiltri ? props.initFiltri.code : "");
    

  
    return (



      <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="center"  
      width={{ xs: '98%', sm: '90%' , md: '80%', lg: '75%', xl: '60%',}}  >
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
              <TextField  size="small"  
                                id="code"
                                name="code"
                                type="string"
                                label="Qr Code"
                                InputLabelProps={{shrink: true}}
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

        <Button startIcon={<IconsMenu.NuovoIcon />}  onClick={() => { props.handleNewQrCode(new QrCode())}} size="small" color="primary" variant="contained" >
              Nuovo QrCode
        </Button>

      </Box>
    </Box>
    )
  }
   
  