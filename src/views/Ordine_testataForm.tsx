import React from 'react';
import { 
  Box,
  FormControl,
  FormHelperText,
  Grid, 
} from '@mui/material';

 import styles from '../common/globalStyle'
import { Cliente } from '../model/Cliente';
import { Articolo } from '../model/Articolo';
import { Ordine, OrdineTestataErrors } from '../model/Ordine';
import { Provenienza } from '../model/Provenienza';
import NumberFormat from 'react-number-format';
import { Colore } from '../model/Colore';
import { withStyles } from '@mui/styles';
 
import { CustomComponents } from '../utils/CustomComponents';

function FormSm   (props: any  ) {
  let that = props;
   return ( 
    <Grid container spacing={2} >
    <Grid item xs={12} >
          <FormControl  >
          <CustomComponents.CustomAutocomplete
                disabled={props.readOnly}
                value={  props.formData.id_cliente === -1 ? null :   props.elenco_clienti.find( x=> x.id_cliente === props.formData.id_cliente) }
                 options={props.elenco_clienti}
                 isOptionEqualToValue={(option: Cliente, value: Cliente) => 
                  {
                    return option?.id_cliente === value?.id_cliente
                  }
                }
                
                getOptionLabel={ (option: any) => option != null ?  option.descrizione : ''}
                id="id_cliente" 
                onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_cliente', value:  option != null ? option.id_cliente : -1 }}  ) 
                }    
                label="Cliente"
              />
              { props.formDataError.id_cliente !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{props.formDataError.id_cliente}</FormHelperText> 
                </Box>
              } 
              </FormControl>
      </Grid>
      <Grid item xs={6}  >
            <FormControl  >
            <CustomComponents.CustomTextField   
             disabled={props.readOnly}
                        id="data_ricezione"
                        name="data_ricezione"
                        label="Data ricezione"
                        type="date"
                        error={props.formDataError.data_ricezione !== ""}
                        helperText={props.formDataError.data_ricezione} 
                        value={props.formData.data_ricezione.replaceAll("/","-")}  
                        onChange={props.handleChangeForm}         />
            </FormControl>
      </Grid>

      <Grid item xs={6}  >
            <FormControl  >
            <CustomComponents.CustomTextField  
             disabled={props.readOnly}
                        id="data_consegna"
                        name="data_consegna"
                        label="Data consegna"
                        type="date"
                        error={props.formDataError.data_consegna !== ""}
                        helperText={props.formDataError.data_consegna} 
                        value={props.formData.data_consegna.replaceAll("/","-")}  
                        onChange={props.handleChangeForm}         />
            </FormControl>
      </Grid>
      <Grid item xs={6} >
          <FormControl  >
          
          <CustomComponents.CustomAutocomplete
                disabled={props.readOnly}
                value={  props.formData.id_provenienza === -1 ? null :   props.elenco_provenienze.find( x=> x.id_provenienza === props.formData.id_provenienza) }
                 options={props.elenco_provenienze}
                 isOptionEqualToValue={(option: Provenienza, value: Provenienza) => 
                  {
                    return option?.id_provenienza === value?.id_provenienza
                  }
                }
                getOptionLabel={ (option: any) => option != null ?  option.descrizione : ''}
                id="id_provenienza" 
                onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_provenienza', value:  option != null ? option.id_provenienza : -1 }}  ) 
                }    
                label="Provenienza"
              />
 
              </FormControl>
      </Grid> 


 
  
      <Grid item xs={6}  >

          <Box display="flex" flexDirection="row" alignItems="left" justifyContent="space-around">
          <Box  display="flex" flexDirection="column" alignItems="left" justifyContent="space-around">
                      <Box  fontWeight={700} style={{color:'red'}}   >Totale</Box>
                      <Box   fontWeight={500} color="text.primary"  >
                           <NumberFormat decimalSeparator=","   prefix={'€ '}
                              thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                              value={props.importo}  
                              displayType={'text'}  />   
                          
                          </Box>
          </Box>
          <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                
                <Box  fontWeight={700} style={{color:'red'}}   >Qta</Box>
                <Box   fontWeight={500} color="text.primary"  >
                      <NumberFormat decimalSeparator=","   prefix={''}
                        thousandSeparator="."  decimalScale={0} fixedDecimalScale={true}
                        value={props.qtaTotale}  
                        displayType={'text'}  />   
                          
                </Box>
          </Box>
          </Box>
      </Grid>


 

  </Grid>

  );
}

function Form   (props: any  ) {
  let that = props;
   return ( 
    <Grid container spacing={2} >
    <Grid item xs={4} >
          <FormControl  >
           
          <CustomComponents.CustomAutocomplete
                disabled={props.readOnly}
                value={  props.formData.id_cliente === -1 ? null :   props.elenco_clienti.find( x=> x.id_cliente === props.formData.id_cliente) }
                 options={props.elenco_clienti}
                 isOptionEqualToValue={(option: Cliente, value: Cliente) => 
                  {
                    return option?.id_cliente === value?.id_cliente
                  }
                }
                
                getOptionLabel={ (option: any) => option != null ?  option.descrizione : ''}
                id="id_cliente" 
                onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_cliente', value:  option != null ? option.id_cliente : -1 }}  ) 
                }    
                label="Cliente"
              />
              { props.formDataError.id_cliente !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{props.formDataError.id_cliente}</FormHelperText> 
                </Box>
              } 
              </FormControl>
      </Grid>
      <Grid item xs={2}  >
            <FormControl  >
            <CustomComponents.CustomTextField   
             disabled={props.readOnly}
                        id="data_ricezione"
                        name="data_ricezione"
                        label="Data ricezione"
                        type="date"
                        error={props.formDataError.data_ricezione !== ""}
                        helperText={props.formDataError.data_ricezione} 
                        value={props.formData.data_ricezione.replaceAll("/","-")}  
                        onChange={props.handleChangeForm}         />
            </FormControl>
      </Grid>

      <Grid item xs={2}  >
            <FormControl  >
            <CustomComponents.CustomTextField  
             disabled={props.readOnly}
                        id="data_consegna"
                        name="data_consegna"
                        label="Data consegna"
                        type="date"
                        error={props.formDataError.data_consegna !== ""}
                        helperText={props.formDataError.data_consegna} 
                        value={props.formData.data_consegna.replaceAll("/","-")}  
                        onChange={props.handleChangeForm}         />
            </FormControl>
      </Grid>

      <Grid item xs={2} >
          <FormControl  >
          
          <CustomComponents.CustomAutocomplete
                disabled={props.readOnly}
                value={  props.formData.id_provenienza === -1 ? null :   props.elenco_provenienze.find( x=> x.id_provenienza === props.formData.id_provenienza) }
                 options={props.elenco_provenienze}
                 isOptionEqualToValue={(option: Provenienza, value: Provenienza) => 
                  {
                    return option?.id_provenienza === value?.id_provenienza
                  }
                }
                getOptionLabel={ (option: any) => option != null ?  option.descrizione : ''}
                id="id_provenienza" 
                onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_provenienza', value:  option != null ? option.id_provenienza : -1 }}  ) 
                }    
                label="Provenienza"
              />
 
              </FormControl>
      </Grid>  
  
      <Grid item xs={2}  >


          <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                
                <Box  fontWeight={700} style={{color:'red'}}   >Totale</Box>
                <Box   fontWeight={500} color="text.primary"  >
                      <NumberFormat decimalSeparator=","   prefix={'€ '}
                        thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                        value={props.importo}  
                        displayType={'text'}  />   
                          
                </Box>
          </Box>

      </Grid>


      <Grid item xs={2}  >



      </Grid>

  </Grid>

  );
}
export interface IProps { 
    elenco_colori: Colore[],
    elenco_articoli: Articolo[],
    elenco_clienti:Cliente[],
    elenco_provenienze: Provenienza[],
    formData: Ordine ,
    formDataError:  OrdineTestataErrors  ,
    readOnly: boolean ,
    isMobile: boolean ,
    classes: any,
    handleChangeForm: any,

}
   
export interface IState {
    
 
}
 
 

class Ordine_testataForm  extends React.Component <IProps,IState> {
    
  
 
 

    componentDidMount()
    {
 
       
    }

 


    render() {    
      let qtaTotale = this.props.formData.ordineDettaglio.reduce( (accumulator, currentValue, currentIndex) => accumulator + 
      (  currentIndex !==  this.props.formData.ordineDettaglio.length-1 ?    ( currentValue.qta  )  : 0)
              , 0 ) 
        let importo = this.props.formData.ordineDettaglio.reduce( (accumulator, currentValue, currentIndex) => accumulator + 
                         (  currentIndex !==  this.props.formData.ordineDettaglio.length-1 ?    (currentValue.prezzo*currentValue.qta  )  : 0)
                                 , 0 ) 
        return (
          this.props.isMobile ? 
            <FormSm  {...this.props}   importo={importo} qtaTotale={qtaTotale} /> 
            : 
            <Form  {...this.props}   importo={importo} /> 
        );
 
  }
}
 
 
 
    


export default withStyles(styles) (Ordine_testataForm) ;