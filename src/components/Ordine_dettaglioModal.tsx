import React  from 'react';
 
 
import {      Box,      } from '@material-ui/core';
 
import { withStyles } from "@material-ui/core/styles";
 
import   styles   from '../common/globalStyle'
 
  
import { Colore } from '../model/Colore';
import { OrdineDettaglio, OrdineDettaglioErrors } from '../model/OrdineDettaglio';
import { Cliente } from '../model/Cliente';
import { Articolo } from '../model/Articolo';
import {  Button, Dialog , DialogContent} from '@material-ui/core';
import Ordine_dettaglioForm from '../views/Ordine_dettaglioForm';
import { IconsMenu } from '../common/Icons';
import { ordiniServices } from '../services/ordiniServices';
    
import {NotificationManager} from 'react-notifications'; 


export interface IProps { 
    elenco_colori: Colore[],
    elenco_articoli: Articolo[],
    elenco_clienti:Cliente[],
    
    id_ordine: number,
    classes: any,

    handleAddOrdine:any,
    handleSaveOrdine:any
  

}
   
export interface IState {
    
    formDettaglio:  OrdineDettaglio ,
    formDettaglioError: OrdineDettaglioErrors
}
 
 

class Ordine_dettaglioModal  extends React.Component <IProps,IState> {
    
 
 

    constructor(props: any) 
    {
        super(props); 
 
        
        this.handleChangeFormDettaglio = this.handleChangeFormDettaglio.bind(this);  
        this.handleSalva = this.handleSalva.bind(this);  
        
        this.state = { 
            formDettaglio:  Object.assign(new OrdineDettaglio(),  
             {  id_ordine: this.props.id_ordine }),  
            formDettaglioError:  new OrdineDettaglioErrors()     } ; 


    }

 
    handleChangeFormDettaglio = (event, idx) => {
    
        const formDettaglio = this.state.formDettaglio;
       
   //  console.log("formDettaglio",formDettaglio)
       //  let dPrezzo  = Number( parseFloat(event.target.value.replace(",","."))) ;
         // (Math.round(dPrezzo * 100) / 100).toFixed(2); 
        if ( event.target.name === "data_ricezione")
        {
            formDettaglio[event.target.name] = event.target.value.replaceAll("-","/") ;
        }
 
        else if ( event.target.name === "id_colore_2")
        {
            if ( event.target.value === -1) 
            {
                formDettaglio["id_colore_3"]  = -1
                
            }   
            formDettaglio["id_colore_2"]  = event.target.value;
        }
         else if ( event.target.name === "id_articolo_base")
         {
                let articolo = this.props.elenco_articoli.find(x => x.id_articolo_base === event.target.value)
                if ( articolo != null)
                {
                    formDettaglio["prezzo"]  = articolo.prezzo 
                    formDettaglio["articolo_base_descrizione"] = articolo?.descrizione;
                    formDettaglio["articolo_base_codice"] = articolo?.codice        
                    
                }
                else
                {
                     
                    formDettaglio["articolo_base_descrizione"] = "";
                    formDettaglio["articolo_base_codice"] = ""       
                    formDettaglio["prezzo"]  = 0;
                }

                    

                formDettaglio[event.target.name] = event.target.value;
                    
         }
         else
            formDettaglio[event.target.name] = event.target.value;
       
     
 
        
        this.setState({  formDettaglio: formDettaglio  });
        
    }  

    async handleSalva()
    {
       
        let formDettaglioError = new OrdineDettaglioErrors();
 
        if (this.state.formDettaglio.validateForm(formDettaglioError))
        {
            this.setState({formDettaglioError: formDettaglioError });

            let ris = await ordiniServices.addDettaglio( this.state.formDettaglio  );
  
            if ( ris.esito === "OK")
            { 
              NotificationManager.success('Operazione eseguita con successo.' , 'Ordini', 2000);  
   
              this.props.handleSaveOrdine(ris.scheda)
      
               // console.log("elenco_ordini", this.elenco_ordini)
            }
            else
            { 
                let mex = ""
                if (ris.err_code === "001" )
                  mex = "Errore server."; 
                else
                  mex = "Errore durante l'elaborazione.";
                NotificationManager.error(mex, 'Ordini', 3000);  
    
            }            
        }
 
        else
        {
        
            this.setState({formDettaglioError: formDettaglioError }); 
        }

        
    }

    render() {    
 
        
        return (
 
            <Dialog scroll="body" open={true} onClose={e => this.props.handleAddOrdine(null)} aria-labelledby="form-dialog-title"
            disableBackdropClick={true}   classes={{      paperWidthSm: this.props.classes.paperDialogordineDettaglio     }}>

        <DialogContent  style={{ overflow: "hidden" }}>
          <>
          <Box width="100%">
            <Ordine_dettaglioForm    
                    elenco_colori={this.props.elenco_colori} 
                    elenco_clienti={this.props.elenco_clienti} 
                    elenco_articoli={this.props.elenco_articoli} 
                    formData={this.state.formDettaglio}
                    readOnly={false} 
                    formDataError={this.state.formDettaglioError } 
                    handleChangeForm={this.handleChangeFormDettaglio}
                  /> 
          </Box>
          <Box textAlign="right" mt={2}>
            <Button   onClick={e => this.props.handleAddOrdine(false)} style={{marginRight:10}} size="small" color="primary" variant="contained" >
            Annulla
            </Button>                
            <Button  startIcon={<IconsMenu.SaveIcon />}  onClick={this.handleSalva} style={{marginRight:10}} size="small" color="primary" variant="contained" >
            Salva
            </Button>
          </Box>
          </>
        </DialogContent>
    </Dialog>
 
    ) 
 
}
}
 
 
 
    


export default withStyles(styles) (Ordine_dettaglioModal);