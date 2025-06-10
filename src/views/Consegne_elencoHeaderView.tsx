 
import {     Box, Button,      Paper,      } from '@material-ui/core';
 
 
 
import NumberFormat from 'react-number-format';
import { IconsMenu } from '../common/Icons';
 

interface Props   {
    handleStampaEtichette:any,
    handleNewConsegna:any,
    elenco: any, 
 
    
    
  } 

export function Consegne_elencoHeaderView (props: Props ) {
 
    let bStampaEtichette = props.elenco.reduce( (accumulator, currentValue) =>  accumulator ||  (currentValue.stampa)   , false ) 
  

    return (
    
        <Box   width="100%" >
            <Paper  variant="outlined" elevation={1}   > 

            <Box display="flex" p={1} flexDirection="row" alignItems="center"  justifyContent="center"  width="100%" >
             

                <Box  width="80%" display="flex" flexDirection="row" alignItems="center"  justifyContent="center"   >
               
                    <>
                        <Box  fontWeight={700} style={{color:'red'}}   >
                        {sessionStorage.getItem("username")==="admin" ? "Totale" : "Tot. Manuale"}
                        </Box>
                        <Box   fontWeight={500} color="text.primary"  ml={1} >
                            <NumberFormat decimalSeparator=","  style={{ whiteSpace: "nowrap" }}
                                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                                value={  
                                    props.elenco.reduce( (accumulator, currentValue) => 
                                    accumulator + 
                                    (currentValue.hide  === 1 ?  0:  parseFloat(currentValue.importo_manuale))   , 0 ) 
                                } 
                                displayType={'text'} prefix={'€ '} />   
                            
                            
                        </Box>    
                    </>
                
                {sessionStorage.getItem("username")==="fulladmin" &&
                    <>
                        <Box ml={2} fontWeight={700} style={{color:'red'}}   >Totale</Box>
                        <Box   fontWeight={500} color="text.primary"  ml={1} >
                            <NumberFormat decimalSeparator=","  style={{ whiteSpace: "nowrap" }}
                                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                                value={  
                                    props.elenco.reduce( (accumulator, currentValue) => 
                                    accumulator +  (currentValue.importo)   , 0 ) 
                                } 
                                displayType={'text'} prefix={'€ '} />   
                            
                            
                        </Box>    

                        <Box  fontWeight={700} style={{color:'red', whiteSpace: "nowrap" }}   ml={4}>Totale scontato</Box>
                        <Box   fontWeight={500} color="text.primary"  ml={1} >
                            <NumberFormat decimalSeparator=","  style={{ whiteSpace: "nowrap" }}
                                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                                value={  
                                    props.elenco.reduce( (accumulator, currentValue) => 
                                    accumulator +  (currentValue.importo_scontato)   , 0 ) 
                                } 
                                displayType={'text'} prefix={'€ '} />   
                            
                        </Box>
 
                        <Box  fontWeight={700} style={{color:'red', whiteSpace: "nowrap"}}  ml={4}>Qta Totale</Box>
                        <Box   fontWeight={500} color="text.primary"   ml={1}>
                            <NumberFormat decimalSeparator=","  style={{ whiteSpace: "nowrap" }}
                                thousandSeparator="."  decimalScale={0} fixedDecimalScale={true}
                                value={ 
                                    props.elenco.reduce( (accumulator, currentValue) => 
                                        accumulator +  currentValue.qta    , 0 )
                                } 
                                displayType={'text'}  />   
                            
                            </Box>
      
                        <Box  fontWeight={700} style={{color:'red', whiteSpace: "nowrap"}}  ml={4}>Qta Totale Evasa</Box>
                        <Box   fontWeight={500} color="text.primary"  ml={1} >
                            <NumberFormat decimalSeparator="," 
                                thousandSeparator="."  decimalScale={0} fixedDecimalScale={true}
                                value={ 
                                    props.elenco.reduce( (accumulator, currentValue) => 
                                        accumulator +  currentValue.qta_evasa   , 0 )
                                } 
                                displayType={'text'}  />   
                            
                            </Box>
                  
                    </>
                    } 
                </Box>

                <Box width="20%" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                     {bStampaEtichette &&               
                    <Box mr={1}>
                        <Button   startIcon={<IconsMenu.StampaIcon />}  onClick={ props.handleStampaEtichette}   size="small" color="primary" variant="contained" >
                            Etichette
                        </Button>
                    </Box>
                    }

                    <Box>
                        <Button   startIcon={<IconsMenu.NuovoIcon />}  onClick={ props.handleNewConsegna}   size="small" color="primary" variant="contained" >
                            Nuova
                        </Button>
                    </Box>
               
                </Box>
            
            
            </Box>
            </Paper>
        </Box>
    )
  }
   
  