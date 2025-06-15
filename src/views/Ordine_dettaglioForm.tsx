import React from 'react';
import { 
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Autocomplete,
    
} from '@mui/material';
 
import styles from '../common/globalStyle'
 import { Colore } from '../model/Colore';
import { OrdineDettaglio, OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import { Cliente } from '../model/Cliente';
import { Articolo } from '../model/Articolo';
import NumberFormat from 'react-number-format'; 
import { withStyles } from '@mui/styles';
import { CustomComponents } from '../utils/CustomComponents';

function FormSm   (props: any  ) {
  let that = props;
   return (   
  
<FormControl> 
  <Grid container spacing={1}  >
      {props.isNewRow  && 
      <Grid item xs={12}  >
      

          <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                  justifyContent="flex-start"  > 
        
                <Box  width={'100%'}>
  
                 
                <CustomComponents.CustomAutocomplete
                disabled={props.readOnly}
                label="Articolo"
                  value={  props.formData.id_articolo_base === -1 ? null :   props.elenco_articoli.find( x=> x.id_articolo_base === props.formData.id_articolo_base) }
                    options={props.elenco_articoli}
                    isOptionEqualToValue={(option: Articolo) => option?.id_articolo_base === props.formData.id_articolo_base}
                    getOptionLabel={ (option: any) => option  !== null && option.id_articolo_base !== -1 ?  option.codice : ''}
                    
                    onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_articolo_base', value:  option != null ? option.id_articolo_base : -1 }}  ) 
                    }    
                  id="id_articolo_base" 
                />
                { props.formDataError.id_articolo_base !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{props.formDataError.id_articolo_base}</FormHelperText> 
                </Box>
                } 
                </Box>
        </Box>
       
    
      </Grid>
 
      }

      
 
      <Grid item xs={3} >
          <Box> 
                <CustomComponents.CustomAutocomplete
                  disabled={props.readOnly}
                  label="Colore 1"
                  value={  props.formData.id_colore === -1 ? null :   props.elenco_colori.find( x=> x.id_colore === props.formData.id_colore) }
                   options={props.elenco_colori}
                   isOptionEqualToValue={(option: Colore) => option?.id_colore === props.formData.id_colore}
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_colore', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore" 
                />
                { props.formDataError.id_colore !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{props.formDataError.id_colore}</FormHelperText> 
                </Box>
                } 
                </Box>
          </Grid>
          
          
          <Grid item xs={3} >
          <Box>
                <CustomComponents.CustomAutocomplete
                  disabled={props.readOnly}
                  label="Colore 2"
                  value={  props.formData.id_colore_2 === -1 ? null :   props.elenco_colori.find( x=> x.id_colore  === props.formData.id_colore_2) }
                   options={props.elenco_colori}
                   isOptionEqualToValue={(option: Colore) => option?.id_colore === props.formData.id_colore_2}
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_colore_2', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_2" 
                />
                </Box>
          </Grid>

           
 
          <Grid item xs={3} >

          <Box> 
                <CustomComponents.CustomAutocomplete
                  disabled={props.readOnly}
                  label="Colore 3"
                  value={  props.formData.id_colore_3 === -1 ? null :   props.elenco_colori.find( x=> x.id_colore  === props.formData.id_colore_3) }
                   options={props.elenco_colori}
                   isOptionEqualToValue={(option: Colore) => option?.id_colore === props.formData.id_colore_3}
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_colore_3', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_3" 
                />
          </Box>            
          </Grid>
 
  
   

      <Grid item xs={3} >

              <Box> 
                <CustomComponents.NumberFormatCustom
                    prefix=""  
                    value={props.formData.qta}  
                    error={props.formDataError.qta !== ""}
                    helperText={props.formDataError.qta}
                    onChange={props.handleChangeForm}  
                    disabled={props.readOnly}
                    id="qta"
                    name="qta"
                    label="Qta"
                  />
              </Box>
      </Grid>



  </Grid>
  </FormControl>
  );
}
 
function Form  (props: any  ) {
  let that = props;
   return (   
  
<FormControl>
  <Grid container spacing={1}  >
      <Grid item xs={3}  >
      

          <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                  justifyContent="flex-start"  > 
        
 
       
                      
                <Box ml={1} width={'100%'}>
  
                
                <CustomComponents.CustomAutocomplete
                label="Articolo"
                disabled={props.readOnly}
                  value={  props.formData.id_articolo_base === -1 ? null :   props.elenco_articoli.find( x=> x.id_articolo_base === props.formData.id_articolo_base) }
                    options={props.elenco_articoli}
                    isOptionEqualToValue={(option: Articolo) => option?.id_articolo_base === props.formData.id_articolo_base}
                    getOptionLabel={ (option: any) => option  !== null && option.id_articolo_base !== -1 ?  option.codice : ''}
                    
                    onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_articolo_base', value:  option != null ? option.id_articolo_base : -1 }}  ) 
                    }    
                  id="id_articolo_base" 
                />
                { props.formDataError.id_articolo_base !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{props.formDataError.id_articolo_base}</FormHelperText> 
                </Box>
                } 
                </Box>
        </Box>
       
    
      </Grid>
 
 
      <Grid item xs={4} >
                
        <Grid container spacing={1}  >
          <Grid item xs={4} >
          <Box> 
                <CustomComponents.CustomAutocomplete
                  disabled={props.readOnly}
                  label="Colore 1"
                  value={  props.formData.id_colore === -1 ? null :   props.elenco_colori.find( x=> x.id_colore === props.formData.id_colore) }
                   options={props.elenco_colori}
                   isOptionEqualToValue={(option: Colore) => option?.id_colore === props.formData.id_colore}
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_colore', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore" 
                />
                { props.formDataError.id_colore !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{props.formDataError.id_colore}</FormHelperText> 
                </Box>
                } 
                </Box>
          </Grid>
          <Grid item xs={4} >
          <Box>
                <CustomComponents.CustomAutocomplete
                  disabled={props.readOnly}
                  label="Colore 2"
                  value={  props.formData.id_colore_2 === -1 ? null :   props.elenco_colori.find( x=> x.id_colore  === props.formData.id_colore_2) }
                   options={props.elenco_colori}
                   isOptionEqualToValue={(option: Colore) => option?.id_colore === props.formData.id_colore_2}
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_colore_2', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_2" 
                />
                </Box>
          </Grid>

           
 
          <Grid item xs={4} >

          <Box> 
                <CustomComponents.CustomAutocomplete
                  disabled={props.readOnly}
                  label="Colore 3"
                  value={  props.formData.id_colore_3 === -1 ? null :   props.elenco_colori.find( x=> x.id_colore  === props.formData.id_colore_3) }
                   options={props.elenco_colori}
                   isOptionEqualToValue={(option: Colore) => option?.id_colore === props.formData.id_colore_3}
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    props.handleChangeForm ({target: {name: 'id_colore_3', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_3" 
                />
          </Box>            
          </Grid>
 
                
        </Grid>
    
      </Grid>
   

      <Grid item xs={5} >
                 
             

          <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                        justifyContent="space-between"  > 

              <Box> 
                <CustomComponents.NumberFormatCustom
                    prefix=""  
                    value={props.formData.qta}  
                    error={props.formDataError.qta !== ""}
                    helperText={props.formDataError.qta}
                    onChange={props.handleChangeForm}  
                    disabled={props.readOnly}
                    id="qta"
                    name="qta"
                    label="Qta"
                  />
              </Box>
              <Box   ml={1}> 
                <CustomComponents.NumberFormatCustom
                    value={props.formData.prezzo}  
                    error={props.formDataError.prezzo !== ""}
                    helperText={props.formDataError.prezzo}
                    onChange={props.handleChangeForm}  
                    disabled={props.readOnly}
                    id="prezzo"
                    name="prezzo"
                    label="Prezzo"
                  />
            </Box>
 

            <Box ml={1}>
                <CustomComponents.NumberFormatCustom decimalSeparator="," 
                customInput={TextField }
                    disabled={true}
                id="Totale"
                name="Totale"
                label="Totale"
                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                value={
                  (props.formData.qta * props.formData.prezzo )  
                } 
                prefix={'€ '} />   
          
            </Box>


        </Box>

            
    
      </Grid>



  </Grid>
  </FormControl>
  );
}
export interface IProps { 
  elenco_colori: Colore[],
  elenco_articoli: Articolo[],
  elenco_clienti:Cliente[],
  formData: OrdineDettaglio,
  formDataError:  OrdineDettaglioErrors,
  readOnly: boolean , 
  isMobile: boolean , 
  isNewRow: boolean , 
  classes: any,
  handleChangeForm: any,


}
 
export interface IState {
  

}
class Ordine_dettaglioForm  extends React.Component <IProps,IState> {
    
 
 

    componentDidMount()
    {
     
   //   console.log("Ordine_dettaglioForm componentDidMount - END "  );
    }

 

    render() {    
 
        
      return (
        this.props.isMobile ? 
          <FormSm  {...this.props}     /> 
          : 
          <Form  {...this.props}  /> 
      );
 
}
}
 
 
 
    
  export default withStyles(styles) (Ordine_dettaglioForm) ;  

