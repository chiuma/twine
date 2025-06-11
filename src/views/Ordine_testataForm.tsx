import React   from 'react';
 
 
import {     Box,         FormControl,        FormHelperText,    Grid,      } from '@material-ui/core';
 
import TextField from '@material-ui/core/TextField/TextField';
 
import { withStyles } from "@material-ui/core/styles";
 
import   styles   from '../common/globalStyle'
 
 
import { Autocomplete } from '@material-ui/lab';
 
import { Cliente } from '../model/Cliente';
import { Articolo } from '../model/Articolo';
import { Ordine, OrdineTestataErrors } from '../model/Ordine';
import { Provenienza } from '../model/Provenienza';
import NumberFormat from 'react-number-format';
import { Colore } from '../model/Colore';

    

export interface IProps { 
    elenco_colori: Colore[],
    elenco_articoli: Articolo[],
    elenco_clienti:Cliente[],
    elenco_provenienze: Provenienza[],
    formData: Ordine ,
    formDataError:  OrdineTestataErrors  ,
    readOnly: boolean ,
    
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
 
        let importo = this.props.formData.ordineDettaglio.reduce( (accumulator, currentValue, currentIndex) => accumulator + 
                         (  currentIndex !==  this.props.formData.ordineDettaglio.length-1 ?    (currentValue.prezzo*currentValue.qta  )  : 0)
                                 , 0 ) 
        return (
 
       
   
    <Grid container spacing={2} >
    <Grid item xs={4} >
          <FormControl  >
           
          <Autocomplete
                disabled={this.props.readOnly}
                value={  this.props.formData.id_cliente === -1 ? null :   this.props.elenco_clienti.find( x=> x.id_cliente === this.props.formData.id_cliente) }
                 options={this.props.elenco_clienti}
                 getOptionSelected={ (option: Cliente ) => 
                  {
                    return option?.id_cliente === this.props.formData.id_cliente
                  }
                }
                
                getOptionLabel={ (option: any) => option != null ?  option.descrizione : ''}
                id="id_cliente" 
                onChange={ (event:any, option:any)  => 
                    this.props.handleChangeForm ({target: {name: 'id_cliente', value:  option != null ? option.id_cliente : -1 }}  ) 
                }    

                clearOnEscape
                renderInput={(params) => <TextField {...params}    InputLabelProps={{shrink: true }} label="Cliente" margin="normal" />}
              />
              { this.props.formDataError.id_cliente !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{this.props.formDataError.id_cliente}</FormHelperText> 
                </Box>
              } 
              </FormControl>
      </Grid>
      <Grid item xs={2}  >
            <FormControl  >
            <TextField   size="small"   
             disabled={this.props.readOnly}
                        id="data_ricezione"
                        name="data_ricezione"
                        label="Data ricezione"
                        type="date"
                        error={this.props.formDataError.data_ricezione !== ""}
                        helperText={this.props.formDataError.data_ricezione}

                        InputLabelProps={{shrink: true }}
                        value={this.props.formData.data_ricezione.replaceAll("/","-")}  
                        onChange={this.props.handleChangeForm}         />
            </FormControl>
      </Grid>

      <Grid item xs={2}  >
            <FormControl  >
            <TextField   size="small"   
             disabled={this.props.readOnly}
                        id="data_consegna"
                        name="data_consegna"
                        label="Data consegna"
                        type="date"
                        error={this.props.formDataError.data_consegna !== ""}
                        helperText={this.props.formDataError.data_consegna}

                        InputLabelProps={{shrink: true }}
                        value={this.props.formData.data_consegna.replaceAll("/","-")}  
                        onChange={this.props.handleChangeForm}         />
            </FormControl>
      </Grid>

      <Grid item xs={2} >
          <FormControl  >
          
          <Autocomplete
                disabled={this.props.readOnly}
                value={  this.props.formData.id_provenienza === -1 ? null :   this.props.elenco_provenienze.find( x=> x.id_provenienza === this.props.formData.id_provenienza) }
                 options={this.props.elenco_provenienze}
                 getOptionSelected={ (option: Provenienza ) => 
                  {
                    return option?.id_provenienza === this.props.formData.id_provenienza
                  }
                }
                getOptionLabel={ (option: any) => option != null ?  option.descrizione : ''}
                id="id_provenienza" 
                onChange={ (event:any, option:any)  => 
                    this.props.handleChangeForm ({target: {name: 'id_provenienza', value:  option != null ? option.id_provenienza : -1 }}  ) 
                }    

                clearOnEscape
                renderInput={(params) => <TextField {...params}   InputLabelProps={{shrink: true }}  label="Provenienza" margin="normal" />}
              />
 
              </FormControl>
      </Grid>  
  
      <Grid item xs={2}  >


          <Box  display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
                      <Box  fontWeight={700} style={{color:'red'}}   >Totale</Box>
                      <Box   fontWeight={500} color="text.primary"  >
                           <NumberFormat decimalSeparator=","   prefix={'€ '}
                              thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                              value={importo}  
                              displayType={'text'}  />   
                          
                          </Box>
          </Box>

      </Grid>


      <Grid item xs={2}  >



      </Grid>

  </Grid>

 
     
    ) 
 
}
}
 
 
 
    


export default withStyles(styles) (Ordine_testataForm);