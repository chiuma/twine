import React   from 'react';
 
 
import {   AppBar,   Box,   Button, Checkbox, CircularProgress,          Dialog,          DialogContent,       
     FormControl,          FormControlLabel,          IconButton,              Paper,      Toolbar, Typography } 
     from   '@mui/material';
 
  
 
import styles from '../common/globalStyle';
import { Colore } from '../model/Colore';
import {   OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import { Cliente } from '../model/Cliente';
import Ordine_dettaglioForm from './Ordine_dettaglioForm';
import { Articolo } from '../model/Articolo';
import { Ordine, OrdineTestataErrors } from '../model/Ordine';
import Ordine_testataForm from './Ordine_testataForm';
import { Provenienza } from '../model/Provenienza';
import DeleteIcon from '@mui/icons-material/Delete';
import GoTop from '@mui/icons-material/ArrowUpward';
import GoBottom from '@mui/icons-material/ArrowDownward';
import { IconsMenu } from '../common/Icons';
import { withStyles } from '@mui/styles';
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



function TestataSm   (propieta: any  ) {
  
  let props =  propieta.props;
 
 

  return (   
    
    <Box width="100%">

      <Box   width="100%"    > 
        
        <AppBar position="static"  className={props.classes.barBackground} color="primary">
        <Toolbar>
        
            <Typography variant="h6" className={props.classes.title}>
              {props.formOrdine.ordineDettaglio[0].id_ordine_dettaglio === -1 ? "Nuovo " : ""}Ordine   
            </Typography>


 

   
 

            {!props.bChangedForm && props.formOrdine.id_ordine !== -1 && 

                <>
 
            {props.handleDelOrdine != null && !(props.formOrdine.ordineDettaglio.reduce( (accumulator, currentValue) =>   
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

{props.handleStampaOrdine != null &&
            <Button style={{marginRight:10}} startIcon={<IconsMenu.StampaIcon />} 
                onClick={ e=>  props.handleStampaOrdine(true, 'singolo_ordine')  }  
                size="small" color="primary" variant="contained" >
              Stampa 
            </Button>
}
            {props.handleDelOrdine != null && !(props.formOrdine.ordineDettaglio.reduce( (accumulator, currentValue) =>   
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



function Scheda   (props: any  ) {
  let that = props;
   return (   
 <>
             {props.isInProgress &&
             <Box mt={2}>
                 <CircularProgress color="primary" />                
             </Box>
             }
 
             <Box  display="flex" flexDirection="row" alignItems="center"  width="100%"
                   justifyContent="center"  > 
 
                 <Paper  className={props.classes.paperFullWidth} variant="outlined"  >
                 <Box  width="100%" p={2}>
 
                   <Box mb={2}>
 
                     <Testata  props={props} />
                   
                   </Box>
 
                   <Box mb={2}>
                   <Paper  variant="outlined" elevation={3}   > 
                     <Box p={2}>
                     <Ordine_testataForm  
                         elenco_colori={props.elenco_colori} 
                         elenco_clienti={props.elenco_clienti} 
                         elenco_articoli={props.elenco_articoli} 
                         elenco_provenienze={props.elenco_provenienze} 
                         formData={props.formOrdine}
                         formDataError={props.formDataError} 
                         readOnly={props.readOnly} 
                         isMobile={props.isMobile}  
                         handleChangeForm={props.handleChangeFormTestata}
                         />
                         </Box>
                   </Paper>
                   </Box>
 
 
                     {props.formOrdine.ordineDettaglio.map((ordineDettaglio:any, idx) => {
 
 // console.log("key=" + (ordineDettaglio.id_ordine_dettaglio !== -1 ? ordineDettaglio.id_ordine_dettaglio : idx)  )                    
 
                         return (
 
                           <React.Fragment
                            key={idx}>
 
 {  !(idx === props.formOrdine.ordineDettaglio.length-1 &&  props.readOnly) &&  
 
                           <Box mb={2} mt={2} >
                             <Box  display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between"  > 
                               <Box ml={1} fontWeight={'bold'}   fontSize={14} style={{color:'black'}}>
                               Riga { 
                               (idx === props.formOrdine.ordineDettaglio.length-1 && !props.readOnly ? "nuova " : idx+1)
                               
                               + (ordineDettaglio.id_articolo_base !== -1 ?  
                                " - " +  ordineDettaglio.articolo_base_descrizione : "")
                               + (ordineDettaglio?.consegnato === true ? " (CONSEGNATO)" : "") 
                               }
                               </Box>
 
                               <Box mr= {1}  display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between">
 
                            
                                {ordineDettaglio.id_ordine_dettaglio === -1 && idx < props.formOrdine.ordineDettaglio.length-1  &&  !props.readOnly &&
                                 <Box >  
                                   <IconButton color="secondary" title="Elimina"   component="span"  
                                     style={{  padding:  '1px 2px 1px 5px'  }}
                                     onClick={ e=> props.handleDelDettaglio (idx)}>
                                     <DeleteIcon />
                                   </IconButton>
                                 </Box>
                                }
 
                                {idx !== props.formOrdine.ordineDettaglio.length-1 && !props.readOnly  &&
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
                                         that.handleChangeFormDettaglio (      
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
                                       elenco_colori={that.elenco_colori} 
                                       elenco_clienti={that.elenco_clienti} 
                                       elenco_articoli={that.elenco_articoli} 
                                       formData={ordineDettaglio}
                                       isMobile={props.isMobile} 
                                       isNewRow={idx === props.formOrdine.ordineDettaglio.length-1}
                                       readOnly={ordineDettaglio?.consegnato === true} 
                                       formDataError={props.arrFormDettaglioErrors[idx]} 
                                       handleChangeForm={ (e ) =>
                                         {  
                                           that.handleChangeFormDettaglio (e,idx);
                                         }
                                       }
                                     /> 
                               
                                    
                                   { idx === props.formOrdine.ordineDettaglio.length-1 &&  !props.readOnly &&
                                   <Box width="100%" textAlign="right">
                                       <Button 
                                        onClick={props.handleAddDettaglio}   
                                       size="small" color="secondary" variant="contained">Aggiungi</Button> 
                                     </Box>
                                   } 
                              
                                   
                                 
                           </Box>
                           
                             </Paper>
                           </Box>
                     }
 
 
 
 
                     </React.Fragment>
 
 
                            ) })}
 
       
 
               {   props.formOrdine.ordineDettaglio.length > 5 && 
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
    );
 }
 
function SchedaSm   (props: any  ) {
 let that = props;
  return (   
<>
            {props.isInProgress &&
            <Box mt={1}>
                <CircularProgress color="primary" />                
            </Box>
            }

            <Box  display="flex" flexDirection="column" alignItems="center"  width="100%"
                  justifyContent="center"  p={.5}> 

                  <Box mb={1}  width="100%"> 
                      <TestataSm props={props} /> 
                  </Box>

                  <Box mb={1} width="100%">
                  <Paper  variant="outlined" elevation={3}   > 
                    <Box p={1}>
                    <Ordine_testataForm  
                        elenco_colori={props.elenco_colori} 
                        elenco_clienti={props.elenco_clienti} 
                        elenco_articoli={props.elenco_articoli} 
                        elenco_provenienze={props.elenco_provenienze} 
                        formData={props.formOrdine}
                        formDataError={props.formDataError} 
                        readOnly={props.readOnly} 
                        isMobile={props.isMobile} 
                        
                        handleChangeForm={props.handleChangeFormTestata}
                        />
                        </Box>
                  </Paper>
                  </Box>


                    {props.formOrdine.ordineDettaglio.map((ordineDettaglio:any, idx) => {

// console.log("key=" + (ordineDettaglio.id_ordine_dettaglio !== -1 ? ordineDettaglio.id_ordine_dettaglio : idx)  )                    

                        return (

                          <React.Fragment  key={idx}>

{!(idx === props.formOrdine.ordineDettaglio.length-1 &&  props.readOnly) &&  

                          <Box mb={2} mt={2} width="100%">  
                            <Box  display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between"  > 
                              <Box  fontWeight={'bold'}   fontSize={13} style={{color:'black'}}>
                              { 
                              (idx === props.formOrdine.ordineDettaglio.length-1 && !props.readOnly ? "Nuova riga " : idx+1)
                               
                              + (ordineDettaglio.id_articolo_base !== -1 ?  " - " +  ordineDettaglio.articolo_base_codice + " - " + ordineDettaglio.articolo_base_descrizione : "")
                             
                              }
                              </Box>

                              <Box display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between">

                           
          {ordineDettaglio.id_ordine_dettaglio === -1 && idx < props.formOrdine.ordineDettaglio.length-1  &&  !props.readOnly &&
 

                                <Box >  
                                  <IconButton color="secondary" title="Elimina"   component="span"  
                                    style={{  padding:  '1px 2px 1px 5px'  }}
                                    onClick={ e=> props.handleDelDettaglio (idx)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>

                              
        }
 
                              </Box>
                            </Box>
                               
                            <Paper  variant="outlined" elevation={3}   > 
                            <Box p={0.5} width="100%">
                             
         
                                    <Ordine_dettaglioForm    
                                      elenco_colori={that.elenco_colori} 
                                      elenco_clienti={that.elenco_clienti} 
                                      elenco_articoli={that.elenco_articoli} 
                                      formData={ordineDettaglio}
                                      isMobile={props.isMobile} 
                                      isNewRow={idx === props.formOrdine.ordineDettaglio.length-1}
                                      readOnly={ordineDettaglio?.consegnato === true} 
                                      formDataError={props.arrFormDettaglioErrors[idx]} 
                                      handleChangeForm={ (e ) =>
                                        {  
                                          that.handleChangeFormDettaglio (e,idx);
                                        }
                                      }
                                    /> 
                              
                                   
                                  { idx === props.formOrdine.ordineDettaglio.length-1 &&  !props.readOnly &&
                                  <Box width="100%" textAlign="right">
                                      <Button 
                                       onClick={props.handleAddDettaglio}   
                                      size="small" color="secondary" variant="contained">Aggiungi</Button> 
                                    </Box>
                                  } 
                             
                                  
                                
                          </Box>
                          
                            </Paper>
                          </Box>
                    }




                    </React.Fragment>


                           ) })}

      

              {   props.formOrdine.ordineDettaglio.length > 5 && 
                  <Box mt={1} width="100%" textAlign="right">
                          <IconButton color="primary" title="Vai all'inizio"   component="span"   onClick={() => {   goTop( );}}>
                            <GoTop />
                          </IconButton>
                  </Box>
                }
            
            </Box>
</>
   );
}

export interface IProps { 
  
  // formDettaglioErrors:  OrdineDettaglioErrors
  // formTestataErrors:  OrdineTestataErrors

// handleChangeForm: any,
  azione: string,
  isModal: boolean,
  isMobile: boolean,
  formOrdine : Ordine ,
  formDataError:  OrdineTestataErrors  ,
  arrFormDettaglioErrors:  OrdineDettaglioErrors[]

  elenco_articoli: Articolo[],
  elenco_clienti: Cliente[],
  elenco_colori: Colore[],
  elenco_provenienze: Provenienza[],
  classes: any,
  handleClose:any,
  handleAddDettaglio: any,
  handleDelDettaglio: any,
  handleChangeFormTestata: any,
  handleChangeFormDettaglio: any,
  handleStampaOrdine: any | null,
  handleEvadiAll: any,
  handleDelOrdine: any | null,
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
  
      this.bShow = true; 
    }




 render() {    

   
        let that = this;





        return (

        <> 
 


       
          {this.props.isModal && 


            <Dialog scroll="body" open={true} onClose={this.props.handleClose} aria-labelledby="form-dialog-title" 
                    classes={{      paperWidthSm: this.props.classes.paperDialogOrdini     }}>

                <DialogContent  style={{ overflow: "hidden" }}>
                <Scheda  {...this.props} />
                </DialogContent>
            </Dialog>
           
          
          }

          {!this.props.isModal &&   !this.props.isMobile &&   
<Scheda  {...this.props}  /> 
          }

          {!this.props.isModal &&   this.props.isMobile &&   
<SchedaSm  {...this.props}  /> 
          }

          </> 
    )}

 
}

 
 
 
export default withStyles(styles) (Ordine_schedaView) ;

 