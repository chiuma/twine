import React, { useState }   from 'react';
 
 
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
import ShowIcon from '@mui/icons-material/Visibility';
import HideIcon from '@mui/icons-material/VisibilityOff';

import GoTop from '@mui/icons-material/ArrowUpward';
import GoBottom from '@mui/icons-material/ArrowDownward';
import { IconsMenu } from '../common/Icons';
import { withStyles } from '@mui/styles';

import { CameraView } from '../utils/CameraComponents';


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

    
        
        <AppBar position="static"  className={props.classes.barBackground} color="primary">
        <Toolbar>
        <Box   width="100%"  display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" > 
          <Box> 
            <Typography variant="h6" className={props.classes.title}>
              {props.formOrdine.ordineDettaglio[0].id_ordine_dettaglio === -1 ? "Nuovo " : ""}Ordine   
            </Typography>
          </Box>

 
          <Box > 
          {!props.readOnly && 
            <Button   
            startIcon={props.isCameraShow ? <HideIcon  /> : <ShowIcon  />}  
            onClick={props.handleShowCamera}   style={{marginRight:8}} size="small" color="primary" variant="contained" >
              QrCode
            </Button>
          }

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
            <Button  startIcon={<IconsMenu.SaveIcon />}  onClick={props.handleSaveOrdine} style={{marginRight:8}} size="small" color="primary" variant="contained" >
            Salva
            </Button>
            }

            <Button onClick={ e => props.handleSaveOrdine (null)} style={{marginRight:4}}  size="small" color="primary" variant="contained"> 
            Chiudi
            </Button>
 
          </Box>
        </Box>
        </Toolbar>
      </AppBar>

 
    </Box>
   );
}


function Testata   (propieta: any  ) {
  
  let props =  propieta.props;
 
 

  return (   
    
    <Box width="100%">
        
        <AppBar position="static"  className={props.classes.barBackground} color="primary">
        <Toolbar>
        <Box   width="100%" display="flex" flexDirection="row" alignItems="center"  justifyContent="space-between"  > 
            <Box>
            <Typography variant="h6" className={props.classes.title}>
            {props.formOrdine.ordineDettaglio[0].id_ordine_dettaglio === -1 ? "Nuovo " : ""}Ordine   
            </Typography>
            </Box>
            <Box>
            {!props.readOnly && 
            <Button   
            startIcon={props.isCameraShow ? <HideIcon  /> : <ShowIcon  />}  
            onClick={props.handleShowCamera}   style={{marginRight:8}} size="small" color="primary" variant="contained" >
              QrCode
            </Button>
            }
   
            {sessionStorage.getItem("profile") === "admin" && !props.readOnly && 
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
            </Box>
        </Box>
        </Toolbar>
      </AppBar>



  

     
    </Box>
   );
}       



function Scheda   (props: any  ) {
  let that = props;
  let ordineDettaglio = !props.isCameraShow ? props.formOrdine.ordineDettaglio : [...props.formOrdine.ordineDettaglio].reverse()
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
  
                   {props.isCameraShow && !props.readOnly &&  
                    <Box  width="100%"> 
                      <CameraView onScan={e =>  props.handleScan(e)} /> 
                    </Box>
                  }

                   {ordineDettaglio.map((ordineDettaglio:any, idx_riga) => {
                   let idx=  !props.isCameraShow ? idx_riga : props.formOrdine.ordineDettaglio.length -  idx_riga -1      
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
 
                            
                                {idx < props.formOrdine.ordineDettaglio.length-1  &&  !props.readOnly &&
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


            <Box  display="flex" flexDirection="column" alignItems="center"  width="100%"
                  justifyContent="center"  p={.5}> 

            {props.isInProgress &&
            <Box mt={1}>
                <CircularProgress color="primary" />                
            </Box>
            }

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

                  {props.isCameraShow && 
                  <Box  width="100%"  > 
                      <CameraView onScan={e =>  props.handleScan(e)} /> 
                  </Box>
                  }


                  {[...props.formOrdine.ordineDettaglio].reverse().map((ordineDettaglio:any, idx_riga) => {
// console.log("key=" + (ordineDettaglio.id_ordine_dettaglio !== -1 ? ordineDettaglio.id_ordine_dettaglio : idx)  )                    
                        let idx=  props.formOrdine.ordineDettaglio.length -  idx_riga -1 
                         return (

                          <React.Fragment  key={idx}>

{!(idx === props.formOrdine.ordineDettaglio.length-1 &&  props.readOnly) &&  

                          <Box mb={2} mt={2} width="100%">  
                            <Box  display="flex" flexDirection="row" alignItems="flex-end"    justifyContent="space-between"  > 
                              <Box  fontWeight={'bold'}   fontSize={13} style={{color:'black'}}>
                              {  
                              (idx === props.formOrdine.ordineDettaglio.length-1 && !props.readOnly ? "" : idx+1 +  " - " )
                               
                              + (ordineDettaglio.id_articolo_base !== -1 ?  ordineDettaglio.articolo_base_codice + " - " + ordineDettaglio.articolo_base_descrizione : "")
                             
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

                                { idx === props.formOrdine.ordineDettaglio.length-1 &&  !props.readOnly &&
                                  <Box width="100%" textAlign="right">
                                      <Button  
                                       onClick={props.handleAddDettaglio}  sx={{ width: '80%'  }} 
                                      size="small" color="secondary" variant="contained">Aggiungi</Button> 
                                  </Box>
                                  } 
 
                              </Box>
                            </Box>
                               
                            <Paper  variant="outlined" elevation={2}   > 
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
                              
                                   

                             
                                  
                                
                          </Box>
                          
                            </Paper>
                          </Box>
                    }




                    </React.Fragment>


                           ) })}

      

              {   props.formOrdine.ordineDettaglio.length > 3 && 
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
  isMobile: boolean,
  formOrdine : Ordine ,
  formDataError:  OrdineTestataErrors  ,
  arrFormDettaglioErrors:  OrdineDettaglioErrors[]

  elenco_articoli: Articolo[],
  elenco_clienti: Cliente[],
  elenco_colori: Colore[],
  elenco_provenienze: Provenienza[],
  classes: any,
  handleScan: any,
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
  isCameraShow: boolean;
}
class Ordine_schedaView  extends React.Component <IProps,IState> {
    tempo:any;
    bShow:boolean = false;

    constructor(props: any) {
      super(props); 
      
      this.tempo = Date.now();
     
      this.state={ isCameraShow: false }
      this.handleShowCamera = this.handleShowCamera.bind(this);     
      this.handleScan = this.handleScan.bind(this);     
    }
 
    componentDidMount()
    {
      let tempo = Date.now();
      this.bShow = true; 
    }

    handleShowCamera (show:boolean)
    {
      this.setState({ isCameraShow : show });
    }
 
    handleScan = (e: any) => {
      // Prima gestisco il risultato della scansione
      this.props.handleScan(e);
      // Poi chiudo la camera dopo un breve delay
      setTimeout(() => {
        this.setState({ isCameraShow: false });
      }, 100);
    }

 render() {    
        return (
        <> 
 {!this.props.isMobile ? (
  <Scheda {...this.props} 
  handleScan={this.handleScan} 
  isCameraShow={this.state.isCameraShow} 
  handleShowCamera={e => this.handleShowCamera(!this.state.isCameraShow)}/>
) : (
  <SchedaSm 
    {...this.props} 
    handleScan={this.handleScan} 
    isCameraShow={this.state.isCameraShow} 
    handleShowCamera={e => this.handleShowCamera(!this.state.isCameraShow)}
  />
)}
          </> 
    )}
}

export default withStyles(styles) (Ordine_schedaView) ;

 