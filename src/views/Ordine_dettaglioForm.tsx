import React  from 'react';
 
 
import {      Box,        FormControl,        FormHelperText,    Grid, IconButton,     } from '@material-ui/core';
 
import TextField from '@material-ui/core/TextField/TextField';
 
import { withStyles } from "@material-ui/core/styles";
 
import   styles   from '../common/globalStyle'
import { NumberFormatCustom } from '../utils/NumberFormatCustom';
 
 
import { Autocomplete } from '@material-ui/lab';
import { Colore } from '../model/Colore';
import { OrdineDettaglio, OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import { Cliente } from '../model/Cliente';
import { Articolo } from '../model/Articolo';
import NumberFormat from 'react-number-format';
import ScontoIcon from '@material-ui/icons/ArrowDownward';
    

export interface IProps { 
    elenco_colori: Colore[],
    elenco_articoli: Articolo[],
    elenco_clienti:Cliente[],
    formData: OrdineDettaglio,
    formDataError:  OrdineDettaglioErrors,
    readOnly: boolean ,
    applicaDataConsegna: any |  null,
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
 
       
<FormControl>
  <Grid container spacing={1}  >
      <Grid item xs={4}  >
      

          <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                  justifyContent="flex-start"  > 
        
                <Box> 
                  <TextField   size="small"   
                       
                        id="data_consegna"
                        name="data_consegna"
                        label="Data consegna"
                        type="date"
                        disabled={this.props.readOnly}
                        value={this.props.formData.data_consegna.replaceAll("/","-") } 
                        error={this.props.formDataError.data_consegna !== ""}
                        helperText={this.props.formDataError.data_consegna}
                        InputLabelProps={{shrink: true }}
                        onChange={this.props.handleChangeForm}         />


                </Box>
                { this.props.applicaDataConsegna  &&
                <Box> 
                  <IconButton color="primary"  component="span"  title="Applica a tutti"  
                                       onClick={(e) => { this.props.applicaDataConsegna(this.props.formData.data_consegna.replaceAll("/","-"));}} >
                    <ScontoIcon />
                  </IconButton>  
                </Box>
                }
                      
                <Box ml={1} width={'100%'}>
  
                
                <Autocomplete
                disabled={this.props.readOnly}
                  value={  this.props.formData.id_articolo_base === -1 ? null :   this.props.elenco_articoli.find( x=> x.id_articolo_base === this.props.formData.id_articolo_base) }
                    options={this.props.elenco_articoli}
                    getOptionSelected={ (option: Articolo ) => 
                    {
                      return option?.id_articolo_base === this.props.formData.id_articolo_base
                    }
                  }
                    getOptionLabel={ (option: any) => option  !== null && option.id_articolo_base !== -1 ?  option.codice : ''}
                    
                    onChange={ (event:any, option:any)  => 
                    this.props.handleChangeForm ({target: {name: 'id_articolo_base', value:  option != null ? option.id_articolo_base : -1 }}  ) 
                    }    
                  id="id_articolo_base" 
                  clearOnEscape
                  renderInput={(params) => <TextField {...params}  InputLabelProps={{shrink: true }}  label="Articolo" margin="normal" />}
                />
                { this.props.formDataError.id_articolo_base !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{this.props.formDataError.id_articolo_base}</FormHelperText> 
                </Box>
                } 
                </Box>
        </Box>
       
    
      </Grid>
 
 
      <Grid item xs={4} >
                
        <Grid container spacing={1}  >
          <Grid item xs={4} >
          <Box> 
                <Autocomplete
                  disabled={this.props.readOnly}
                  
                  value={  this.props.formData.id_colore === -1 ? null :   this.props.elenco_colori.find( x=> x.id_colore === this.props.formData.id_colore) }
                   options={this.props.elenco_colori}
                   getOptionSelected={ (option: Colore ) => 
                    {
                      return option?.id_colore === this.props.formData.id_colore
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    this.props.handleChangeForm ({target: {name: 'id_colore', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore" 
                  clearOnEscape
                  renderInput={(params) => <TextField {...params}  InputLabelProps={{shrink: true }}  label="Colore" margin="normal" />}
                />
                { this.props.formDataError.id_colore !== '' && 
                <Box>
                <FormHelperText style={{color: 'red'}}>{this.props.formDataError.id_colore}</FormHelperText> 
                </Box>
                } 
                </Box>
          </Grid>
          <Grid item xs={4} >
          <Box>
                <Autocomplete
                  disabled={this.props.readOnly}
                  
                  value={  this.props.formData.id_colore_2 === -1 ? null :   this.props.elenco_colori.find( x=> x.id_colore  === this.props.formData.id_colore_2) }
                   options={this.props.elenco_colori}
                   getOptionSelected={ (option: Colore ) => 
                    {
                      return option?.id_colore  === this.props.formData.id_colore_2
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    this.props.handleChangeForm ({target: {name: 'id_colore_2', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_2" 
                  clearOnEscape
                  renderInput={(params) => <TextField {...params}  InputLabelProps={{shrink: true }}  label="Colore 2" margin="normal" />}
                />
                </Box>
          </Grid>

           
 
          <Grid item xs={4} >

          <Box> 
                <Autocomplete
                  disabled={this.props.readOnly}
                  
                  value={  this.props.formData.id_colore_3 === -1 ? null :   this.props.elenco_colori.find( x=> x.id_colore  === this.props.formData.id_colore_3) }
                   options={this.props.elenco_colori}
                   getOptionSelected={ (option: Colore ) => 
                    {
                      return option?.id_colore  === this.props.formData.id_colore_3
                    }
                  }
                   getOptionLabel={ (option: any) => option  !== null && option.id_colore  !== -1 ?  option.codice : ''}
                   
                   onChange={ (event:any, option:any)  => 
                    this.props.handleChangeForm ({target: {name: 'id_colore_3', value:  option != null ? option.id_colore : -1 }}  ) 
                   }    
                  id="id_colore_3" 
                  clearOnEscape
                  renderInput={(params) => <TextField {...params}  InputLabelProps={{shrink: true }}  label="Colore 3" margin="normal" />}
                />
          </Box>            
          </Grid>
 
                
        </Grid>
    
      </Grid>
   

      <Grid item xs={2} >
                 
             

          <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                        justifyContent="space-between"  > 

              <Box> 
                <NumberFormatCustom 
                    prefix=""  
                    value={this.props.formData.qta}  
                    error={this.props.formDataError.qta !== ""}
                    helperText={this.props.formDataError.qta}
                    onChange={this.props.handleChangeForm}  
                    disabled={this.props.readOnly}
                    id="qta"
                    name="qta"
                    label="Qta"
                  />
              </Box>
              <Box   ml={1}> 
                <NumberFormatCustom   
                    value={this.props.formData.prezzo}  
                    error={this.props.formDataError.prezzo !== ""}
                    helperText={this.props.formDataError.prezzo}
                    onChange={this.props.handleChangeForm}  
                    disabled={this.props.readOnly}
                    id="prezzo"
                    name="prezzo"
                    label="Prezzo"
                  />
            </Box>
 

            <Box ml={1}>
                <NumberFormat decimalSeparator="," 
                customInput={TextField }
                    disabled={true}
                id="Totale"
                name="Totale"
                label="Totale"
                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                value={
                  (this.props.formData.qta * this.props.formData.prezzo )  
                } 
                prefix={'€ '} />   
          
            </Box>


        </Box>

            
    
      </Grid>

      <Grid item xs={2} >
 
 
                

                  <Box     ml={1}    >
                      <TextField   size="small"  
                          id="nota"
                          name="nota"
                          label="Nota"
                          inputProps={{ maxLength: 250 }}
                          disabled={this.props.readOnly}
                          value={this.props.formData.nota  }  
                          InputLabelProps={{shrink: true }}
                          onChange={this.props.handleChangeForm}         />
                  </Box>
           
        
        
      
      </Grid>

  </Grid>
  </FormControl>

     
    ) 
 
}
}
 
 
 
    


export default withStyles(styles) (Ordine_dettaglioForm);