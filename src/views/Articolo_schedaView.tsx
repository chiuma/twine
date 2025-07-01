import React from 'react';
import { AppBar, Box, Button, CircularProgress, Dialog, DialogContent, FormControl, Paper, Toolbar, Typography  } from '@mui/material';
 
import styles from '../common/globalStyle';
 
import { IconsMenu } from '../common/Icons';
import { CustomComponents } from '../utils/CustomComponents';
import { withStyles } from '@mui/styles';
import { ConfirmDialog } from '../utils/ConfirmDialog';

function SchedaArticolo(props: any) {
  const { propieta, handleSchedaUpdate , handleSchedaUpdatePrezzi} = props;

  return (
    <Box width="100%">
      {propieta.isInProgress && (
        <Box mt={2}>
          <CircularProgress color="primary" />
        </Box>
      )}
      <Box width="100%" p={1}>
        <AppBar position="static" className={propieta.classes.barBackground} color="primary">
          <Toolbar>
          <Box   width="100%" display="flex" flexDirection="row" alignItems="center"  justifyContent="space-between"  > 
              <Box  >
              <Typography variant="h6" className={propieta.classes.title}>
                Articolo - {propieta.formData.id_articolo_base === -1 ? "Nuovo" : "Modifica"}
              </Typography>
              </Box>
             
              <Box>
              {!propieta.readOnly && propieta.bChangedForm && (
                <Button
                  startIcon={<IconsMenu.SaveIcon />}
                  onClick={propieta.saveScheda}
                  style={{ marginRight: 10 }}
                  size="small"
                  color="primary"
                  variant="contained"  >
                  Salva
                </Button>
              )}
 
            {!propieta.isMobile && !propieta.readOnly && !propieta.bChangedForm  && propieta.formData.id_articolo_base !== -1 && (
                <Button 
                  onClick={() => handleSchedaUpdatePrezzi(propieta.formData)}
                  style={{ marginRight: 10 }}
                  size="small"
                  color="primary"
                  variant="contained" >
                  AGGIORNA ORDINI
                </Button>
              )}
  
              <Button onClick={propieta.handleClose} size="small" color="primary" variant="contained">
                Chiudi
              </Button>
            </Box>
          </Box>
          </Toolbar>
        </AppBar>

        <Box mt={2} width="100%">
          <Paper elevation={1} variant="outlined">
            <FormArticolo propieta={{...propieta, handleSchedaUpdate}} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

function FormArticolo(props: any) {
  const { propieta } = props;

  return (
    <FormControl>
      <Box display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-around" height="auto">
        <Box mt={2} width="50%">
        <CustomComponents.CustomTextField 
            size="small"
            error={propieta.formDataError.descrizione !== ""}
            helperText={propieta.formDataError.descrizione} 
            disabled={propieta.bReadObnly}
            InputProps={{
              classes: {
                root: propieta.classes.inputRoot,
                disabled: propieta.classes.disabled,
              },
            }}
            id="descrizione"
            name="descrizione"
            label="Descrizione"
            value={propieta.formData.descrizione}
            onChange={propieta.handleChangeForm}
          />
        </Box>
        <Box mt={2} width="20%">
          <CustomComponents.CustomTextField  
            error={propieta.formDataError.codice !== ""}
            helperText={propieta.formDataError.codice}
            InputLabelProps={{ shrink: true }}
            disabled={propieta.bReadObnly}
            InputProps={{
              classes: {
                root: propieta.classes.inputRoot,
                disabled: propieta.classes.disabled,
              },
            }}
            id="codice"
            name="codice"
            label="Codice"
            onChange={propieta.handleChangeForm}
            value={propieta.formData.codice}
          />
        </Box>

        <Box mt={2} width="15%">
          <CustomComponents.NumberFormatCustom
            value={propieta.formData.prezzo}
            error={propieta.formDataError.prezzo !== ""}
            helperText={propieta.formDataError.prezzo}
            onChange={propieta.handleChangeForm}
            id="prezzo"
            name="prezzo"
            label="Prezzo"
          />
        </Box>
      </Box>
    </FormControl>
  );
}

export interface IProps {
  formData: any;
  formDataError: any;
  handleChangeForm: any;
  handleUpdatePrezzoOrdini: any;
  scheda: any;
  elenco_colori: any;
  classes: any;
  isModal: boolean;
  handleClose: any;
  saveScheda: any;
  isInProgress: boolean;
  readOnly: boolean;
  bChangedForm: boolean;
}

export interface IState {
  schedaArticolo: any | null;
}

class Articolo_schedaView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.handleSchedaUpdatePrezzi = this.handleSchedaUpdatePrezzi.bind(this);

    this.state = {  schedaArticolo: null }; 

  }

  componentDidMount() {
    // ... (existing componentDidMount logic)
  }

  handleSchedaUpdatePrezzi = (value: any) => {
    console.log("handleSchedaUpdatePrezzi", value);
    this.setState({ schedaArticolo: value  });
  }

  render() {
    return (
      <>
      
      {this.state.schedaArticolo !== null &&
                <ConfirmDialog
                          handleConfirm={(e) => {this.props.handleUpdatePrezzoOrdini(this.state.schedaArticolo);  this.handleSchedaUpdatePrezzi(null);}}
                          handleAnnulla={() => { this.handleSchedaUpdatePrezzi(null)}}
                          contextText={'Procedere con l\'aggiornamento dei prezzi per tutti gli ordini non evasi? ' }
                          title="Articoli" />
              }



        {this.state.schedaArticolo === null && this.props.isModal && (
          <Dialog scroll="body" open={true} onClose={this.props.handleClose} aria-labelledby="form-dialog-title"   classes={{ paperWidthSm: this.props.classes.paperDialogArticoli }}>
            <DialogContent style={{ overflow: "hidden" }}>
              <SchedaArticolo propieta={this.props} />
            </DialogContent>
          </Dialog>
        )}

        {this.state.schedaArticolo === null &&  !this.props.isModal && (
          <Box display="flex" flexDirection="row" alignItems="center" width={{ xs: '80%', sm: '70%', md: '65%', lg: '55%', xl: '40%' }} mt={4} justifyContent="center">
            <Paper className={this.props.classes.paperFullWidth} variant="outlined">
              <Box width="100%">
                <SchedaArticolo propieta={this.props}  handleSchedaUpdatePrezzi={this.handleSchedaUpdatePrezzi} />
              </Box>
            </Paper>
          </Box>
        )}
      </>
    );
  }
}

export default withStyles(styles) (Articolo_schedaView);