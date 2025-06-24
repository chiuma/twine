import React from 'react'; 


import {    Accordion, AccordionDetails, AccordionSummary, Box, Button, Container,   Grid,         TextField, Typography } from '@mui/material';
 
 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Cliente, ClienteFiltri } from '../model/Cliente';
import { IconsMenu } from '../common/Icons';
import { CustomComponents } from '../utils/CustomComponents';
 
 

interface Props   {
    initFiltri: any; 
    handleExecRicerca: any, 
    handleNewCliente:any
    
  }

export function Clienti_elencoFiltriView (props: Props ) {
  let x = new  ClienteFiltri(props.initFiltri ? props.initFiltri  : {});
  const [filtri, setFiltri] = useState(   x);
 
 
    
  
    return (



      <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="center" 
      width={{ xs: '90%', sm: '80%' , md: '75%', lg: '70%', xl: '65%',}}   >
             
      <Box width="80%"> 
  
        <Container style={{marginTop: '2%', marginBottom: '2%'}}>

          
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
           <Typography  variant="h6" color="primary">Cerca</Typography> 
          </AccordionSummary>
          <AccordionDetails>
  
          <Grid container spacing={3}      alignItems="flex-end"   >
            <Grid item xs={12} sm={12} md={4}>
               <CustomComponents.CustomTextField  
                                id="descrizione"
                                name="descrizione"
                                type="string"
                                label="Descrizione" 
                                value={filtri.descrizione}   

                                onChange={ (event:any) => { 
                                  let newFiltri =  {...filtri , ...{descrizione: event.target.value }}
                                  setFiltri( newFiltri); 
                                  props.handleExecRicerca (newFiltri ) ;
                                  } }  

                                
                            />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
               <CustomComponents.CustomTextField   
                                id="comune"
                                name="comune"
                                type="string"
                                label="Comune" 
                                value={filtri.comune}   

                                onChange={ (event:any) => { 
                                  let newFiltri =  {...filtri , ...{comune: event.target.value }}
                                  setFiltri( newFiltri); 
                                  props.handleExecRicerca (newFiltri ) ;
                                  } }  
                            />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
                 <CustomComponents.CustomTextField    
                              id="piva"
                              name="piva"
                              label="P. Iva o Cod. fiscale"
                              type="string" 
                              value={filtri.piva}   

                              onChange={ (event:any) => { 
                                let newFiltri =  {...filtri , ...{piva: event.target.value }}
                                setFiltri( newFiltri); 
                                props.handleExecRicerca (newFiltri ) ;
                                } } 
                          />
            </Grid>
            
             
  
            <Grid item xs={12} sm={12} md={12}>
              <Box  display="flex" flexDirection="row" alignItems=""  justifyContent="flex-end">
               <Button onClick={ e => 
                        {                           
                          let newFiltri = new ClienteFiltri();
                          setFiltri( newFiltri); 
                          props.handleExecRicerca (newFiltri ) ;
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
      <Box>
 

        <Button startIcon={<IconsMenu.NuovoIcon />} 
        onClick={() => { props.handleNewCliente(new Cliente())}}  size="small" color="primary" variant="contained" >
              Nuovo
        </Button>

      </Box>
    </Box>
    )
  }
   
  