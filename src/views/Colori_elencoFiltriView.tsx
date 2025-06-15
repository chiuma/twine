import React from 'react'; 
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Colore } from '../model/Colore';
import { IconsMenu } from '../common/Icons';
import { CustomComponents } from '../utils/CustomComponents';


interface Props   {
    initFiltri: any; 
    handleExecRicerca: any, 
    handleNewColore:any
    
  }

export function Colori_elencoFiltriView (props: Props ) {
    
 
    const [descrizione, setDescrizione] = useState(props.initFiltri ? props.initFiltri.descrizione : "");
    const [codice, setCodice] = useState(props.initFiltri ? props.initFiltri.codice : "");
    
  
    return (



      <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="center"   >
      <Box> 
  
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

            <Grid item xs={12} sm={12} md={4}>
                <CustomComponents.CustomTextField  
                              id="codice"
                              name="codice"
                              label="Codice"
                              type="string" 
                              value={codice}   
                              onChange={ (event:any) => { 
                                setCodice ( event.target.value) ;
                                props.handleExecRicerca ( {  descrizione:  descrizione,   codice: event.target.value } )
                              }
                              
                              } 
                          />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
               <CustomComponents.CustomTextField  
                                id="descrizione"
                                name="descrizione"
                                type="string"
                                label="Descrizione" 
                                value={descrizione}   
                                onChange={ (event:any) => { 
                                  setDescrizione( ( event.target.value)) ;
                                  props.handleExecRicerca ( {  descrizione:  event.target.value,   codice: codice } )
                                } }    
                            />
            </Grid>            
            
             
  
            <Grid item xs={12} sm={12} md={3}>
              <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="flex-end" width="100%">
               <Button onClick={ e => 
                        {                           
                          setCodice("");   
                          setDescrizione("");
                          props.handleExecRicerca ( {  descrizione: '',   codice: ''  }  ) ;
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
 

        <Button  startIcon={<IconsMenu.NuovoIcon />}  onClick={() => { props.handleNewColore(new Colore())}} size="small" color="primary" variant="contained" >
              Nuovo Colore
        </Button>


      </Box>
    </Box>
    )
  }
   
  