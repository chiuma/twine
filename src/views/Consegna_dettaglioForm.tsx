import React   from 'react';
 
 
import {      Box,        Checkbox,       FormControl,     Grid,   IconButton,   InputLabel,      } from '@material-ui/core';
 
import TextField from '@material-ui/core/TextField/TextField';
 
import { withStyles } from "@material-ui/core/styles";
 
import   styles   from '../common/globalStyle'
import { NumberFormatCustom } from '../utils/NumberFormatCustom';
 
 
import {   ConsegnaDettaglioErrors } from '../model/ConsegnaDettaglio';
 
import NumberFormat from 'react-number-format';
 
import ScontoIcon from '@material-ui/icons/ArrowDownward';
    
import DeleteOrdineIcon from '@material-ui/icons/Delete';




export interface IProps { 

     
    formData: any,
    formDataError:  ConsegnaDettaglioErrors,
    readOnly: boolean ,
    applicaSconto: any |  null,
    classes: any,
    handleChangeForm: any,
    handleDelDettaglio: any,
    deleteOrdineDettaglio: any,

}
   
export interface IState {
    
 
}
 
 

class Consegna_dettaglioForm  extends React.Component <IProps,IState> {
    
  
    constructor(props: any) {
      super(props); 
    }
 
 
 
 

    render() {    
 
       
        return (
 
          <FormControl>

  <Grid container spacing={1}  >
      <Grid item xs={2}  >
                 
                            <Box> 
                            <TextField   size="small"     
                                    label="Data consegna"
                                    type="date"
                                    disabled={true}
                                    value={this.props.formData.data_consegna.replaceAll("/","-") } 
                                    InputLabelProps={{shrink: true }}       />
                            </Box>
                
        
                 

      </Grid>
      
      <Grid item xs={5} >
                <Box>
                
          <TextField  size="small"  
                            InputLabelProps={{shrink: true}}
                            disabled={true} 
                            InputProps={{ 
                                classes:{
                                  root: this.props.classes.inputRoot,
                                  disabled: this.props.classes.disabled,
                                }
                              }} 
                            label="Articolo"
                            value={
                                this.props.formData.articolo_base_codice + "-" 
                    +   this.props.formData.articolo_descrizione  + " / " 
                    +   this.props.formData.colore_codice 
                    +  (this.props.formData.colore_codice_2  !== "" ?  "+" +    this.props.formData.colore_codice_2  : "")
                    +  (this.props.formData.colore_codice_3  !== "" ?  "+" +    this.props.formData.colore_codice_3  : "")  
                            }       
                        />
 
         

                   
                </Box>
    
      </Grid>

      <Grid item xs={1} >
                 
              
              <NumberFormatCustom   
                    value={this.props.formData.prezzo}  
                    onChange={this.props.handleChangeForm}  
                    disabled={this.props.readOnly || this.props.formData.consegnato === false}
                    id="prezzo"
                    name="prezzo"
                    label="Prezzo"
                  />


  
          
 
      </Grid>


      <Grid item xs={1} >
                  
      <Box  display="flex" flexDirection="row" alignItems="flex-start"  
                  justifyContent="flex-start"  >  
                <Box> 
                  <NumberFormatCustom 
                     prefix=""  
                     value={this.props.formData.sconto}   
                     onChange={this.props.handleChangeForm}  
                     disabled={this.props.readOnly || this.props.formData.consegnato === false}
                     id="sconto"
                     name="sconto"
                     label="Sconto %"
                   /> 
                </Box>
                { this.props.applicaSconto  &&
                <Box> 
                  <IconButton color="primary"  component="span"  title="Applica a tutti"  
                                       onClick={(e) => { this.props.applicaSconto(this.props.formData.sconto);}} >
                    <ScontoIcon />
                  </IconButton>  
                </Box>
                }
        </Box>
    
      </Grid>

   
      <Grid item xs={1} >
                 
         
      <NumberFormatCustom 
                    prefix=""  
                    value={this.props.formData.qta}   
                    onChange={this.props.handleChangeForm}  
                    disabled={this.props.readOnly || this.props.formData.consegnato === false}
                    id="qta"
                    name="qta"
                    label="Qta"
                  />
          

          
    
      </Grid>

      <Grid item xs={1} >
                 
 
                 <NumberFormatCustom 
                     prefix=""  
                     value={this.props.formData.qta_evasa}  
                     error={this.props.formDataError.qta_evasa !== ""}
                     helperText={this.props.formDataError.qta_evasa}
                     onChange={this.props.handleChangeForm}  
                     disabled={this.props.readOnly || this.props.formData.consegnato === false}
                     id="qta_evasa"
                     name="qta_evasa"
                     label="Qta evasa"
                   /> 
           
  
     
       </Grid>


   
      <Grid item xs={1} >
        <Box  display="flex" flexDirection="row" alignItems="center"  
                          justifyContent="space-between" width={'100%'} > 
                      <Box  >
  
        <FormControl >

                    <Box  display="flex" flexDirection="column" alignItems="flex-start"  
                          justifyContent="center"  > 
                      <Box mb={1}>
                        <InputLabel shrink >Consegna</InputLabel> 
                      </Box>
                      <Box>
                        <Checkbox 
                        disabled={this.props.readOnly}
                            checked={this.props.formData.consegnato === true} 
                            id="consegnato"
                            name="consegnato" 
                            onChange={ (event:any )  => { 
                                this.props.handleChangeForm (      {target: {name: 'consegnato', value:  event.target.checked}} ) 
                              } } />
                      </Box>
                    </Box> 
                    


        </FormControl >
    
                      </Box>
                      <Box>
                        <IconButton title="Elimina Dettaglio Ordine" color="primary"  component="span"  
                         onClick={() => { this.props.deleteOrdineDettaglio(this.props.formData);}}>
                            <DeleteOrdineIcon />
                        </IconButton>
                      </Box>
          </Box>
      </Grid>

 

 
  </Grid>


  </FormControl >
    ) 
 
}
}
 
 
 
    


export default withStyles(styles) (Consegna_dettaglioForm);