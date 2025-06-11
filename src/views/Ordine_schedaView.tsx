import React   from 'react';
 
 
import {   AppBar,   Box,   Button, Checkbox, CircularProgress,          FormControl,          FormControlLabel,          IconButton,              Paper,    Toolbar, Typography } from '@material-ui/core';
 
 
 
import { withStyles } from "@material-ui/core/styles";
 
import   styles   from '../common/globalStyle' 
import { Colore } from '../model/Colore';
import {   OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import { Cliente } from '../model/Cliente';
import Ordine_dettaglioForm from './Ordine_dettaglioForm';
import { Articolo } from '../model/Articolo';
import { Ordine, OrdineTestataErrors } from '../model/Ordine';
import Ordine_testataForm from './Ordine_testataForm';
import { Provenienza } from '../model/Provenienza';
import DeleteIcon from '@material-ui/icons/Delete';
import GoTop from '@material-ui/icons/ArrowUpward';
import GoBottom from '@material-ui/icons/ArrowDownward';
import { IconsMenu } from '../common/Icons';
function goTop(){ 
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}  

function goBottom(){ 
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}  



function Testata   (propieta: any  ) {
  
  let props =  propieta.props;
 
 

  return (   
    <Box width="100%">

      <Box   width="100%"    > 
        
        <AppBar position="static"  className={props.classes.barBackground} color="primary">
        <Toolbar>
        
            <Typography variant="h6" className={props.classes.title}>
            {props.formOrdine.ordineDettaglio[0].id_ordine_dettaglio === -1 ? "Nuovo " : ""}Ordine   
            </Typography>


 

   
          {!props.readOnly && 
            !(props.formOrdine.ordineDettaglio.reduce( (accumulator, currentValue, currentIndex ) =>   
            accumulator && (currentIndex !==  props.formOrdine.ordineDettaglio.length-1 ? currentValue.evaso : true )  , true ))   &&
            <Button style={{marginRight:10}}   onClick={   props.handleEvadiAll   }  
                size="small" color="primary" variant="contained" >
              Evadi tutto
            </Button>
          }

            {!props.bChangedForm && props.formOrdine.id_ordine !== -1 && 

                <>


            <Button style={{marginRight:10}} startIcon={<IconsMenu.StampaIcon />} 
                onClick={ e=>  props.handleStampaOrdine(true, 'singolo_ordine')  }  
                size="small" color="primary" variant="contained" >
              Stampa 
            </Button>

            {!(props.formOrdine.ordineDettaglio.reduce( (accumulator, currentValue) =>   
                accumulator || (currentValue.id_ordine_dettaglio !== -1 ? currentValue.consegnato : false )  , false ))   &&
            <Button  
            startIcon={<DeleteIcon  />}  onClick={() => { props.handleDelOrdine (props.formOrdine);}}   style={{marginRight:10}} size="small" color="primary" variant="contained" >
              Elimina
            </Button>
            }
              </>
            }
            
            {!props.readOnly && props.bChangedForm && 
              (
                (props.formOrdine.ordineDettaglio.length > 0 && props.azione === "MOD")
                ||
                (props.formOrdine.ordineDettaglio.length > 1 && props.azione === "NEW")
              )
                
                &&
            <Button  startIcon={<IconsMenu.SaveIcon />}  onClick={props.handleSaveOrdine} style={{marginRight:10}} size="small" color="primary" variant="contained" >
            Salva
            </Button>
            }

            <Button onClick={ e => props.handleSaveOrdine (null)} style={{marginRight:10}}  size="small" color="primary" variant="contained"> 
            Chiudi
            </Button>

            {props.formOrdine.ordineDettaglio.length > 5 && 
          
          <IconButton color="primary" title=""  component="span"  
            onClick={() => {   goBottom( );}}>
            <GoBottom />
          </IconButton>
        
        }

        </Toolbar>
      </AppBar>



  

      </Box>
    </Box>
   );
}


       

export interface IProps { 
  
    // formDettaglioErrors:  OrdineDettaglioErrors
    // formTestataErrors:  OrdineTestataErrors
  
 // handleChangeForm: any,
    azione: string,
    formOrdine : Ordine ,
    formDataError:  OrdineTestataErrors  ,
    arrFormDettaglioErrors:  OrdineDettaglioErrors[]
 
    elenco_articoli: Articolo[],
    elenco_clienti: Cliente[],
    elenco_colori: Colore[],
    elenco_provenienze: Provenienza[],
    classes: any,
    handleAddDettaglio: any,
    handleDelDettaglio: any,
    handleChangeFormTestata: any,
    handleChangeFormDettaglio: any,
    handleStampaOrdine: any,
    handleEvadiAll: any,
    handleDelOrdine: any,
    handleSaveOrdine:any, 
    isInProgress: boolean,
    readOnly:boolean,
    bChangedForm: boolean

}
   
export interface IState {
    
 
}
 

class Ordine_schedaView  extends React.Component <IProps,IState> {
    tempo:any;
    bShow:boolean = false;

    constructor(props: any) {
      super(props); 
      
      this.tempo = Date.now();
     

     // console.log("1 formOrdine" , this.props.formOrdine)
    }
 
 

    componentDidMount()
    {
      let tempo = Date.now();
      console.log("Ordine_schedaView componentDidMount - END ", tempo - this.tempo   );
      this.bShow = true; 
    }




 render() {    

   
        let that = this;

        if ( !this.bShow) 
        {
        
        return (<>            
          <Box mt={2}>
            <CircularProgress color="primary" />                
          </Box>
        </>);
        }



        return (

        <> 
 
            {this.props.isInProgress &&
            <Box mt={2}>
                <CircularProgress color="primary" />                
            </Box>
            }

            

            <Box  display="flex" flexDirection="row" alignItems="center"  width="100%"
                  justifyContent="center"  > 

                <Paper  className={this.props.classes.paperFullWidth} variant="outlined"  >
                <Box  width="100%" p={2}>

                  <Box mb={2}>

                    <Testata  props={this.props} />
                  
                  </Box>

                  <Box mb={2}>
                  <Paper  variant="outlined" elevation={3}   > 
                    <Box p={2}>
                    <Ordine_testataForm  
                        elenco_colori={this.props.elenco_colori} 
                        elenco_clienti={this.props.elenco_clienti} 
                        elenco_articoli={this.props.elenco_articoli} 
                        elenco_provenienze={this.props.elenco_provenienze} 
                        formData={this.props.formOrdine}
                        formDataError={this.props.formDataError} 
                        readOnly={this.props.readOnly} 

                        
                        handleChangeForm={this.props.handleChangeFormTestata}
                        />
                        </Box>
                  </Paper>
                  </Box>


                    {this.props.formOrdine.ordineDettaglio.map((ordineDettaglio:any, idx) => {

// console.log("key=" + (ordineDettaglio.id_ordine_dettaglio !== -1 ? ordineDettaglio.id_ordine_dettaglio : idx)  )                    

                        return (

                          <React.Fragment
                           key={idx}>

{  !(idx === this.props.formOrdine.ordineDettaglio.length-1 &&  this.props.readOnly) &&  

                          <Box mb={2} mt={2} >
                            <Box  display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between"  > 
                              <Box ml={1} fontWeight={'bold'}   fontSize={14} style={{color:'black'}}>
                              Riga { 
                              (idx === this.props.formOrdine.ordineDettaglio.length-1 && !this.props.readOnly ? "nuova " : idx+1)
                              
                              + (ordineDettaglio.id_articolo_base !== -1 ?  " - " +  ordineDettaglio.articolo_base_descrizione : "")
                              + (ordineDettaglio?.consegnato === true ? " (CONSEGNATO)" : "") 
                              }
                              </Box>

                              <Box mr= {1}  display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between">

                           
                                  {ordineDettaglio.id_ordine_dettaglio === -1 && idx < this.props.formOrdine.ordineDettaglio.length-1  &&  !this.props.readOnly &&
 



                                <Box >  
                                  <IconButton color="secondary" title="Elimina"   component="span"  
                                    style={{  padding:  '1px 2px 1px 5px'  }}
                                    onClick={ e=> this.props.handleDelDettaglio (idx)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>

                              
                                  }

                              { idx !== this.props.formOrdine.ordineDettaglio.length-1 && !this.props.readOnly  &&
                                <Box > 
                                 <FormControl>
 

                                 <FormControlLabel
                                    label="Evaso"
                                    labelPlacement="start"
                                   
                                    control={
 
                                    <Checkbox 
                                    style={{  padding:  '1px 2px 0px 5px'  }}
                                      size="small" 
                                      disabled={ordineDettaglio?.consegnato === true}
                                      checked={ordineDettaglio.evaso === true} 
                                      id="evaso"
                                      name="evaso" 
                                      onChange={ (event:any )  => { 
                                        that.props.handleChangeFormDettaglio (      
                                          {target: {name: 'evaso', value:  event.target.checked}} ,idx) 
                                        } } />
                                      }
                                      />
                                  </FormControl>
                                </Box>
                               } 
                              </Box>
                            </Box>
                             
                            <Paper  variant="outlined" elevation={3}   > 
                            <Box p={1}>
                            
         
                                    <Ordine_dettaglioForm    
                                      elenco_colori={that.props.elenco_colori} 
                                      elenco_clienti={that.props.elenco_clienti} 
                                      elenco_articoli={that.props.elenco_articoli} 
                                      formData={ordineDettaglio}
                                      readOnly={ordineDettaglio?.consegnato === true} 
                                      formDataError={this.props.arrFormDettaglioErrors[idx]} 
                                      handleChangeForm={ (e ) =>
                                        {  
                                          that.props.handleChangeFormDettaglio (e,idx);
                                        }
                                      }
                                    /> 
                              
                                   
                                  { idx === this.props.formOrdine.ordineDettaglio.length-1 &&  !this.props.readOnly &&
                                  <Box width="100%" textAlign="right">
                                      <Button 
                                       onClick={this.props.handleAddDettaglio}   
                                      size="small" color="secondary" variant="contained">Aggiungi</Button> 
                                    </Box>
                                  } 
                             
                                  
                                
                          </Box>
                          
                            </Paper>
                          </Box>
                    }




                    </React.Fragment>


                           ) })}

      

              {   this.props.formOrdine.ordineDettaglio.length > 5 && 
                  <Box mt={1} width="100%" textAlign="right">
                          <IconButton color="primary" title="Vai all'inizio"   component="span"   onClick={() => {   goTop( );}}>
                            <GoTop />
                          </IconButton>
                  </Box>
                }
                </Box>
               </Paper>
            </Box>
       
 

        </>
     
    )}

 
}

 
 
 


export default withStyles(styles) (Ordine_schedaView);