import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, TextField, Typography, Autocomplete } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Cliente } from '../model/Cliente';
import { ConsegnaFiltri } from '../model/Consegna';
import { CustomComponents } from '../utils/CustomComponents';

interface Props   {
    initFiltri: any; 
    handleExecRicerca: any,  
    elenco_clienti: Cliente[],
    showFiltroCliente:boolean,
    
    
  }

export function Consegne_elencoFiltriView (props: Props ) {
    
 
 
    let x = new  ConsegnaFiltri(props.initFiltri ? props.initFiltri  : {});
    if (!props.showFiltroCliente)
    x.data_consegna_effettuata_dal = "";

    const [filtri, setFiltri] = useState(   x);

    return (



      <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="center"  width="100%" >
      <Box width="100%"> 
 
          
        <Accordion>
          <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography  variant="h6" color="primary">Filtri</Typography> 
          </AccordionSummary>
          <AccordionDetails>
  
    



          <Grid container spacing={3}      >
   
          
            <Grid item  xs={2}>
              <CustomComponents.CustomTextField   
                              id="data_consegna_effettuata_dal"
                              name="data_consegna_effettuata_dal"
                              label="Data consegna dal"
                              type="date" 
                              value={filtri.data_consegna_effettuata_dal}   
                              onBlur={ ( ) => {  
                                props.handleExecRicerca (filtri ) ;
                                } }  

                              onChange={ (event:any) => { 
                                let newFiltri =  {...filtri , ...{data_consegna_effettuata_dal: event.target.value }}
                                setFiltri( newFiltri);  
                                } }     />
            </Grid>

            <Grid item  xs={2}>
                <CustomComponents.CustomTextField   
                              id="data_consegna_effettuata_al"
                              name="data_consegna_effettuata_al"
                              label="Data consegna al"
                              type="date"  
                              value={filtri.data_consegna_effettuata_al}   

                              onBlur={ ( ) => {  
                                props.handleExecRicerca (filtri ) ;
                                } }  

                              onChange={ (event:any) => {  
                               
                                  let newFiltri =  {...filtri , ...{data_consegna_effettuata_al: event.target.value }}
                                  setFiltri( newFiltri);  
                                }} />
            </Grid>
 
            
            <Grid item  xs={4}>
            { props.showFiltroCliente && 
            <FormControl  >
         
         <CustomComponents.CustomAutocomplete
                  value={filtri.id_cliente === -1 ? null : props.elenco_clienti.find(x => x.id_cliente === filtri.id_cliente)}
                   options={props.elenco_clienti}
                   isOptionEqualToValue={(option: Cliente, value: Cliente) => 
                     option?.id_cliente === value?.id_cliente
                   }
                   getOptionLabel={(option: any) => option !== null ? option.descrizione : ''}
                   onChange={(event: any, option: any) => {  
 
                    let newFiltri =  {...filtri , ...{id_cliente: (option != null ? option.id_cliente : -1) }}
                    setFiltri( newFiltri); 
                    props.handleExecRicerca (newFiltri ) ;
 
                    } }  
                  id="id_cliente" 
                  label="Cliente"  />
             </FormControl>
               }
            </Grid>

 
            <Grid item xs={4}  >
              <Box  display="flex" flexDirection="row" alignItems="flex-end" height="100%"  justifyContent="flex-end">
               <Button onClick={ e => 
                        {                           
                          let newFiltri = new ConsegnaFiltri();
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


            

      </Box>
 
    </Box>
    )
  }
   
  