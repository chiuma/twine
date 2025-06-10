 


import {     Box, Button,           FormControl,           FormControlLabel,           FormLabel,           Paper, Radio, RadioGroup,      } from '@material-ui/core';
 
 
 
import NumberFormat from 'react-number-format';
import { IconsMenu } from '../common/Icons';
 

interface Props   {
    handleStampaOrdine:any,
    handleNewOrdine:any,
    handleChangeTipoElenco:any,
    elenco: any, 
    tipo_elenco:any
     
    
  }

export function Ordini_elencoHeaderView (props: Props ) {
    
 
 

    return (

    
        <Box   width="100%" >
            <Paper  variant="outlined" elevation={1}   > 
            <Box display="flex" p={1} flexDirection="row" alignItems="center"  justifyContent="center"  width="100%" >
                
                <Box width="35%">

                    <FormControl component="fieldset">
                <FormLabel component="legend" style={{color:'red', fontWeight:'bold'}} >Visualizza</FormLabel>
                <RadioGroup row aria-label="position" name="position" value={props.tipo_elenco} > 
                        <FormControlLabel
                        value="dettaglio"  
                        onClick={() => {props.handleChangeTipoElenco('dettaglio')}}
                        control={<Radio color="primary" size="small" />}
                        label="Dettaglio"
                        labelPlacement="end"
                        />
                        <FormControlLabel 
                        value="testata"
                        
                        onClick={() => {props.handleChangeTipoElenco('testata')}}
                        control={<Radio color="primary" size="small"/>}
                        label="Testata"
                        labelPlacement="end"
                        /> 
                        
                    </RadioGroup>
                    </FormControl>

                </Box>

                <Box  width="30%" display="flex" flexDirection="row" alignItems="center"  justifyContent="center"   >
           
                         
                        <Box  fontWeight={700} style={{color:'red'}}   >Totale</Box>
                        <Box   fontWeight={500} color="text.primary"  ml={1}>
                            <NumberFormat decimalSeparator=","    style={{ whiteSpace: "nowrap" }}
                                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                                value={ 
                                    props.elenco.reduce( (accumulator, currentValue) => accumulator + 
                                (props.tipo_elenco === "dettaglio" ?   (currentValue.prezzo*currentValue.qta)  
                                :
                                (props.tipo_elenco === "testata" ?     currentValue.importo_totale : 0))
                                    , 0 )
                                } 
                                displayType={'text'} prefix={'€ '} />   
                            
                        </Box>
 
                 
    
                        <Box  fontWeight={700} style={{color:'red', whiteSpace: "nowrap"}}  ml={4}>Qta Totale</Box>
                        <Box   fontWeight={500} color="text.primary"  ml={1}>
                            <NumberFormat decimalSeparator=","    style={{ whiteSpace: "nowrap" }}
                                thousandSeparator="."  decimalScale={0} fixedDecimalScale={true}
                                value={ 
                                    props.elenco.reduce( (accumulator, currentValue) => accumulator + 
                                    (currentValue.qta)  , 0 )
                                } 
                                displayType={'text'}  />   
                            
                            </Box>
                </Box>
                
                <Box width="35%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                    
                {props.tipo_elenco === "dettaglio" &&
                    <Box  mr={2}>
                        <Button startIcon={<IconsMenu.StampaIcon />} 
                        onClick={ e=>  props.handleStampaOrdine(true, "articoli")  } 
                             size="small" color="primary" variant="contained" >
                           Articoli
                        </Button>
                    </Box>
                }
                    <Box  mr={2}>
                        <Button startIcon={<IconsMenu.StampaIcon />} 
                        onClick={ e=>  props.handleStampaOrdine(true, props.tipo_elenco)  }  
                             size="small" color="primary" variant="contained" >
                           Stampa 
                        </Button>
                    </Box>
                
                    <Box>
                        <Button  startIcon={<IconsMenu.NuovoIcon />}  onClick={ props.handleNewOrdine}   size="small" color="primary" variant="contained" >
                            Nuovo Ordine
                        </Button>
                    </Box>

                </Box>
            </Box>
            </Paper>
        </Box>
    )
  }
   
  