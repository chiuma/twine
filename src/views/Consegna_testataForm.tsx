import React from 'react';
import { Box, FormControl, FormHelperText, Grid, IconButton, TextField } from '@mui/material';
 import styles from '../common/globalStyle';
 import { Cliente } from '../model/Cliente';
import { ConsegnaTestataErrors } from '../model/Consegna';
import NumberFormat from 'react-number-format';
import SearchIcon from '@mui/icons-material/Search';
import { withStyles } from '@mui/styles';
import { CustomComponents } from '../utils/CustomComponents';

export interface IProps { 
    elenco_clienti:Cliente[],
    showCliente:any,
    formData: any ,
    formDataError:  ConsegnaTestataErrors  ,
    readOnly: boolean ,
    classes: any,
    handleChangeForm: any,
}
   
export interface IState {
    
}
 
class Consegna_testataForm  extends React.Component <IProps,IState> {
    
  lockCliente:boolean = false;
    constructor(props: any) {
      super(props); 
    }
 
    componentDidMount()
    {
        this.lockCliente = this.props.formData.id_cliente === -1  ?  false : true;
       
    }

    render() {    
      let azione = this.props.formData.id_consegna === -1  ?  "NEW" : "MOD";
      
      let totale  =  this.props.formData.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
      (currentValue.consegnato ?    (currentValue.prezzo*currentValue.qta  ) : 0 ) , 0 ) 

      let totale_scontato =  this.props.formData.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
                        (currentValue.consegnato ?    (currentValue.prezzo*currentValue.qta - (currentValue.prezzo*currentValue.qta*currentValue.sconto/100)) : 0 ) , 0 ) ;
      
      let totale_pagare = totale_scontato  + this.props.formData.importo_trasporto;     
      
      let totale_scontato_evaso =  this.props.formData.consegnaDettaglio.reduce( (accumulator, currentValue) => accumulator + 
            (currentValue.consegnato ?    (currentValue.prezzo*currentValue.qta_evasa - (currentValue.prezzo*currentValue.qta_evasa*currentValue.sconto/100)) : 0 ) , 0 ) 

    
      let totale_pagare_evaso = totale_pagare + ( (totale_scontato_evaso+this.props.formData.importo_trasporto) *this.props.formData.iva/100);
      
      totale_pagare_evaso = Math.round((totale_pagare_evaso + Number.EPSILON) * 10 ) / 10;
 
      totale_pagare = totale_pagare + (totale_pagare*this.props.formData.iva/100);
      totale_pagare = Math.round((totale_pagare + Number.EPSILON) * 10 ) / 10;
      let importo_commissione = this.props.formData.importo_manuale * totale_scontato /100;
    
      return (
<> 
       
   
  <Grid container spacing={2} >
    
    <Grid item xs={5} >
      <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                  justifyContent="flex-start"  > 
 
        <Box width={'92%'}> 
          <FormControl  >
      
          <CustomComponents.CustomAutocomplete
                disabled={azione !== "NEW" || this.lockCliente === true}
                label="Cliente"
                value={this.props.formData.id_cliente === -1 ? null : this.props.elenco_clienti.find(x => x.id_cliente === this.props.formData.id_cliente)}
                options={this.props.elenco_clienti}
                isOptionEqualToValue={(option: Cliente, value: Cliente) => 
                  option?.id_cliente === value?.id_cliente
                }
                getOptionLabel={(option: any) => option != null ? option.descrizione : ''}
                id="id_cliente"
                onChange={(event: any, option: any) =>
                  this.props.handleChangeForm({ target: { name: 'id_cliente', value: option != null ? option.id_cliente : -1 } })
                }
              />
              { this.props.formDataError.id_cliente !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{this.props.formDataError.id_cliente}</FormHelperText> 
                </Box>
              } 
               </FormControl>
      </Box>          
      <Box  >
              { this.props.formData.id_cliente !== -1 && 
              <IconButton title='Scheda Cliente' color="primary"  component="span"   onClick={() => { this.props.showCliente(this.props.formData.id_cliente);}}>
              <SearchIcon />
              </IconButton>
              } 
         
      </Box>
      </Box>
    </Grid>
    
    <Grid item xs={2}  >
            <FormControl  >
            <CustomComponents.NumberFormatCustom
             disabled={this.props.readOnly}
                        id="data_consegna_effettuata"
                        name="data_consegna_effettuata"
                        label="Data consegna effettuata"
                        type="date"
                        error={this.props.formDataError.data_consegna_effettuata !== ""}
                        helperText={this.props.formDataError.data_consegna_effettuata} 
                        value={this.props.formData.data_consegna_effettuata.replaceAll("/","-")}  
                        onChange={this.props.handleChangeForm}         />
            </FormControl>
      </Grid>
      
    <Grid item xs={1}  >
            <FormControl  >
            <CustomComponents.CustomTextField
             disabled={true}
                        id="progressivo"
                        name="progressivo"
                        label="Codice" 
                        value={this.props.formData.progressivo}  
                        onChange={this.props.handleChangeForm}         />
            </FormControl>
      </Grid>


    <Grid item xs={4} >
          <FormControl  >
         <CustomComponents.CustomTextField 
                            disabled={this.props.readOnly} 
                            InputProps={{ 
                                classes:{
                                  root: this.props.classes.inputRoot,
                                  disabled: this.props.classes.disabled,
                                }
                              }}
                             
                            id="nota"
                            name="nota"
                            label="Nota"
                            value={this.props.formData.nota}   
                            onChange={this.props.handleChangeForm}    
                        />
 
           </FormControl>
      </Grid>  
  

     
  </Grid>


  <Grid container spacing={2} style={{marginTop:"1%"}}  >                              



  

  <Grid item xs={1}   >

    <Box   display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
              <Box  fontWeight={700}  style={{color:'red'}}  >Totale</Box>
            
              <Box   fontWeight={500} color="text.primary"  >
                  <NumberFormat decimalSeparator=","   prefix={'€ '} style={{ whiteSpace: "nowrap" }}
                      thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                      value={totale   } 
                   
                      displayType={'text'}  />     
                  
                  </Box>
    </Box>

    </Grid>

    <Grid item xs={1}  >

        <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                  <Box  fontWeight={700}  style={{color:'red'}}  >Scontato</Box>
                
                  <Box   fontWeight={500} color="text.primary"  >
                      <NumberFormat decimalSeparator=","   prefix={'€ '} style={{ whiteSpace: "nowrap" }}
                          thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                          value={ totale_scontato}  
                          displayType={'text'}  />     
                      
                  </Box>
        </Box>

      </Grid>

      <Grid item xs={1}>

        <CustomComponents.NumberFormatCustom 
                    value={this.props.formData.importo_trasporto}  
                   
                    InputLabelProps={{shrink: true }} 
                    onChange={this.props.handleChangeForm}  
                    disabled={this.props.readOnly}
                    id="importo_trasporto"
                    name="importo_trasporto"
                    label="Trasporto"
                  />
      </Grid>
    
      <Grid item xs={1}>

        <CustomComponents.NumberFormatCustom
                value={this.props.formData.iva}  
                InputLabelProps={{shrink: true }}
                prefix= ""  
                onChange={this.props.handleChangeForm}  
                disabled={this.props.readOnly}
                id="iva"
                name="iva"
                label="Iva (%)"
              />
        </Grid>

        <Grid item xs={1}>

          <CustomComponents.NumberFormatCustom
                  value={this.props.formData.colli}  
                  InputLabelProps={{shrink: true }}
                  prefix= ""  
                  onChange={this.props.handleChangeForm}  
                  disabled={this.props.readOnly}
                  id="colli"
                  name="colli"
                  label="Num. colli"
                />
          </Grid>



    <Grid item xs={2}  >

        <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                  <Box  fontWeight={700}  style={{color:'red', whiteSpace: "nowrap"}}  >Totale da pagare</Box>
                
                  <Box   fontWeight={500} color="text.primary"  >
                      <NumberFormat decimalSeparator=","   prefix={'€ '}
                          thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                          value={totale_pagare}  
                          displayType={'text'}  />     
                      
                      </Box>
        </Box>

      </Grid>


      <Grid item xs={2}  >

        <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                  <Box  fontWeight={700}  style={{color:'red'}}  >Totale evaso</Box>
                
                  <Box   fontWeight={500} color="text.primary"  >
                      <NumberFormat decimalSeparator=","   prefix={'€ '}
                          thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                          value={ 
                            totale_pagare_evaso 
                          }  
                          displayType={'text'}  />     
                      
                      </Box>
        </Box>

        </Grid>

        <Grid item xs={1}>
 
          <CustomComponents.NumberFormatCustom
                      value={this.props.formData.importo_manuale}  
                      prefix=""  
                      InputLabelProps={{shrink: true }} 
                      onChange={this.props.handleChangeForm}  
                      disabled={this.props.readOnly}
                      id="importo_manuale"
                      name="importo_manuale"
                      label="% Commisione"
                    />
          </Grid>

          
    <Grid item xs={1}  >

      <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                <Box  fontWeight={700}  style={{color:'red', whiteSpace: "nowrap"}}  >Comm.</Box>
              
                <Box   fontWeight={500} color="text.primary"  >
                     <NumberFormat decimalSeparator=","   prefix={'€ '}
                        thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                        value={importo_commissione}  
                        displayType={'text'}  />     
                    
                    </Box>
      </Box>

    </Grid>


  </Grid>

</>
 
     
    ) 
 
}
}
 
 
 
    


export default withStyles(styles)(Consegna_testataForm) ;