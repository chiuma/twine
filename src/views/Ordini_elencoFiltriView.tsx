import React from 'react';
import {    Accordion, AccordionDetails, AccordionSummary, Box, Button,   FormControl,   Grid,          InputLabel,     MenuItem,     Select,     TextField, Typography } from '@mui/material';
import { Autocomplete } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Cliente } from '../model/Cliente';
import { Options, OrdineFiltri } from '../model/Ordine';
import { Articolo } from '../model/Articolo';
import { Provenienza } from '../model/Provenienza';
import { CustomComponents } from '../utils/CustomComponents';

interface Props   {
    initFiltri: any; 
    handleExecRicerca: any,  
    elenco_clienti: Cliente[],
    elenco_articoli:Articolo[],
    elenco_provenienze:Provenienza[]
    tipo_elenco:string
    
  }

export function Ordini_elencoFiltriView (props: Props ) {
    
 
     
    let x = new  OrdineFiltri(props.initFiltri ? props.initFiltri  : {});
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

          <Grid item xs={2}  >
                 <CustomComponents.CustomTextField  
                              id="data_ricezione_dal"
                              name="data_ricezione_dal"
                              label="Data ricezione dal"
                              type="date" 
                              value={filtri.data_ricezione_dal}   
                              onChange={ (event:any) => { 
                                let newFiltri =  {...filtri , ...{data_ricezione_dal: event.target.value }}
                                setFiltri( newFiltri); 
                                props.handleExecRicerca (newFiltri ) ;
                                } }     />
            </Grid>

            <Grid item xs={2} >
                 <CustomComponents.CustomTextField  
                              id="data_ricezione_al"
                              name="data_ricezione_al"
                              label="Data ricezione al"
                              type="date" 
                              value={filtri.data_ricezione_al}   
                              onChange={ (event:any) => {   
                                  let newFiltri =  {...filtri , ...{data_ricezione_al: event.target.value }}
                                  setFiltri( newFiltri); 
                                  props.handleExecRicerca (newFiltri ) ;
                                }} />
            </Grid>

            <Grid item  xs={2}>
                 <CustomComponents.CustomTextField   
                              id="data_consegna_dal"
                              name="data_consegna_dal"
                              label="Data consegna dal"
                              type="date" 
                              value={filtri.data_consegna_dal}   
                              onChange={ (event:any) => {                                 
                                let newFiltri =  {...filtri , ...{data_consegna_dal: event.target.value }}
                                setFiltri( newFiltri);  ;
                                } }   
                              onBlur={ ( ) => {                                
                                props.handleExecRicerca (filtri ) ;
                                } }     />
            </Grid>

            <Grid item  xs={2}>
                 <CustomComponents.CustomTextField    
                              id="data_consegna_al"
                              name="data_consegna_al"
                              label="Data consegna al"
                              type="date" 
                              value={filtri.data_consegna_al}   
                              onChange={ (event:any) => {  
                                
                                  let newFiltri =  {...filtri , ...{data_consegna_al: event.target.value }}
                                  setFiltri( newFiltri);  
                                }} 
                              onBlur={ ( ) => {                                
                                  props.handleExecRicerca (filtri ) ;
                                  } }  />
            </Grid>

            {props.tipo_elenco==="dettaglio" &&
 
            <Grid item xs={1}>
              <FormControl variant="standard">
              <InputLabel shrink id="demo-simple-select-label">Evasi</InputLabel>
              <Select 
                  id="evaso"
                  name="evaso"
                  label="Evaso"  
                  value={filtri.evaso}   
                  onChange={ (event:any) => {   
                      let newFiltri =  {...filtri , ...{evaso: event.target.value }}
                      setFiltri( newFiltri); 
                      props.handleExecRicerca (newFiltri ) ;
                    }}   >
                <MenuItem value={"Si"}>Si</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"Tutti"}>Tutti</MenuItem>
              </Select>
              </FormControl>

            </Grid>
             
          }     
            <Grid item xs={1}>
            
            <FormControl  variant="standard"> 
              <InputLabel shrink id="demo-simple-select-label">Consegnati</InputLabel>
              <Select 
                  id="consegnato "
                  name="consegnato"
                  label="Consegnati"  
                  value={filtri.consegnato}   
                  onChange={ (event:any) => {    
                    let opt :Options =  event.target.value === "Si" ? "Si" : filtri.evaso  ;
                      let newFiltri =  {...filtri , ...{consegnato: event.target.value ,  evaso:   opt   }}
                      setFiltri( newFiltri); 
                      props.handleExecRicerca (newFiltri ) ;
                    }}   >
                <MenuItem value={"Si"}>Si</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"Tutti"}>Tutti</MenuItem>
              </Select>
              </FormControl>
              
            </Grid>

          
  

            
            <Grid item  xs={3}>
            <FormControl  variant="standard">
       
            <CustomComponents.CustomAutocomplete
                  value={  filtri.id_cliente === -1 ? null :   props.elenco_clienti.find( x=> x.id_cliente === filtri.id_cliente) }
                   options={props.elenco_clienti}
                   isOptionEqualToValue={ (option: Cliente ) => 
                    {
                      return option.id_cliente === filtri.id_cliente
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null ?    option.descrizione : ''}
                   onChange={ (event:any, option:any) => {  
 
                    let newFiltri =  {...filtri , ...{id_cliente: ( option != null ? option.id_cliente : -1) }}
                    setFiltri( newFiltri); 
                    props.handleExecRicerca (newFiltri ) ;
 
                    } }  
                  id="id_cliente" 
                  label="Cliente"
                />
             </FormControl>
            </Grid>
  

            <Grid item  xs={2}>
                <CustomComponents.CustomTextField  
                                id="iniziali_cliente"
                                name="iniziali_cliente"
                                type="string"
                                label="Cliente iniziali" 
                                value={filtri.iniziali_cliente}   

                                onChange={ (event:any) => { 
                                  let newFiltri =  {...filtri , ...{iniziali_cliente: event.target.value }}
                                  setFiltri( newFiltri); 
                                  props.handleExecRicerca (newFiltri ) ;
                                  } }  

                                
                            />
            </Grid>



            {props.tipo_elenco==="dettaglio" &&
            <>
            <Grid item  xs={3}>
            <FormControl  >
           
            <CustomComponents.CustomAutocomplete
                  value={  filtri.id_articolo_base === -1 ? null :   props.elenco_articoli.find( x=> x.id_articolo_base === filtri.id_articolo_base) }
                   options={props.elenco_articoli}
                   isOptionEqualToValue={ (option: Articolo ) => 
                    {
                      return option.id_articolo_base === filtri.id_articolo_base
                    }
                  }
                   getOptionLabel={ (option: any) => 
                    {
                    
return  option  !== null && option.id_articolo_base !== -1 ? option.codice  + "-"  + option.descrizione : ''

                    }
                   
                  
                  }
                   onChange={ (event:any, option:any) => {  
 
                    let newFiltri =  {...filtri , ...{id_articolo_base: ( option != null ? option.id_articolo_base : -1) }}
                    setFiltri( newFiltri); 
                    props.handleExecRicerca (newFiltri ) ;
 
                    } }  
                  id="id_articolo" 
                  label="Articolo"
                />
                </FormControl>

            </Grid>
              </>
            }

            <Grid item  xs={2}>
            <FormControl  >
      
            <CustomComponents.CustomAutocomplete
                  value={  filtri.id_provenienza === -1 ? null :   props.elenco_provenienze.find( x=> x.id_provenienza === filtri.id_provenienza) }
                   options={props.elenco_provenienze}
                   isOptionEqualToValue={ (option: Provenienza ) => 
                    {
                      return option.id_provenienza === filtri.id_provenienza
                    }
                  }
                   getOptionLabel={ (option: any) => 
                    {
                    
return  option  !== null && option.id_provenienza !== -1 ?  option.descrizione : ''

                    }
                   
                  
                  }
                   onChange={ (event:any, option:any) => {  
 
                    let newFiltri =  {...filtri , ...{id_provenienza: ( option != null ? option.id_provenienza : -1) }}
                    setFiltri( newFiltri); 
                    props.handleExecRicerca (newFiltri ) ;
 
                    } }  
                  id="id_provenienza" 
                  label="Provenienza"
                />
                </FormControl>

            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Box  display="flex" flexDirection="row" alignItems=""  justifyContent="flex-end">
               <Button onClick={ e => 
                        {                           
                          let newFiltri = new OrdineFiltri();
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
   
  