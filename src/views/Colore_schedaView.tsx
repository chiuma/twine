import React from 'react';
import { AppBar, Box, Button, CircularProgress, Dialog, DialogContent, FormControl, Grid, Paper, Toolbar, Typography, TextField } from '@mui/material';
 import { IconsMenu } from '../common/Icons';
import styles from '../common/globalStyle';
import { withStyles } from '@mui/styles';
import { CustomComponents } from '../utils/CustomComponents';

function Scheda(props: any) {
  const { propieta } = props;
  return (
    <Box width="100%">
      {propieta.isInProgress &&
        <Box mt={2}>
          <CircularProgress color="primary" />
        </Box>
      }

      <AppBar position="static" className={propieta.classes.barBackground} color="primary">
        <Toolbar>
          <Typography variant="h6" className={propieta.classes.title}>
            Colore - {propieta.formData.id_colore === -1 ? "Nuovo" : "Modifica"}
          </Typography>

          {!propieta.readOnly && propieta.bChangedForm &&
            <Button startIcon={<IconsMenu.SaveIcon />} onClick={propieta.saveScheda} style={{ marginRight: 10 }} size="small" color="primary" variant="contained">
              Salva
            </Button>
          }
 
          <Button onClick={propieta.handleClose} size="small" color="primary" variant="contained">
            Chiudi
          </Button>
        </Toolbar>
      </AppBar>

      <FormControl style={{ width: '100%', marginTop: '4%', marginBottom: '2%' }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <CustomComponents.CustomTextField  
              error={propieta.formDataError.codice !== ""}
              helperText={propieta.formDataError.codice} 
              disabled={propieta.bReadObnly}
              InputProps={{
                classes: {
                  root: propieta.classes.inputRoot,
                  disabled: propieta.classes.disabled,
                }
              }}
              id="codice"
              name="codice"
              label="Codice"
              value={propieta.formData.codice}
              onChange={propieta.handleChangeForm}
            />
          </Grid>

          <Grid item xs={8}>
            <CustomComponents.CustomTextField  
              error={propieta.formDataError.descrizione !== ""}
              helperText={propieta.formDataError.descrizione}
     
              disabled={propieta.bReadObnly}
              InputProps={{
                classes: {
                  root: propieta.classes.inputRoot,
                  disabled: propieta.classes.disabled,
                }
              }}
              id="descrizione"
              name="descrizione"
              label="Descrizione"
              value={propieta.formData.descrizione}
              onChange={propieta.handleChangeForm}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}

export interface IProps {
  formData: any,
  formDataError: any,
  handleChangeForm: any,
  scheda: any,
  classes: any,
  isModal: boolean,
  handleClose: any,
  saveScheda: any,
  isInProgress: boolean,
  readOnly: boolean,
  bChangedForm: boolean
}

export interface IState {
}

class Colore_schedaView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.isModal &&
          <Dialog 
            scroll="body" 
            open={true} 
            onClose={this.props.handleClose} 
            aria-labelledby="form-dialog-title"
            disableEscapeKeyDown={true}
            classes={{ paperWidthSm: this.props.classes.paperDialogColore }}>
            <DialogContent style={{ overflow: "hidden" }}>
              <Scheda propieta={this.props} />
            </DialogContent>
          </Dialog>
        }

        {!this.props.isModal &&
          <Box display="flex" flexDirection="row" alignItems="center" height="70%" width="50%"
            mt={4} justifyContent="center">
            <Paper className={this.props.classes.paperElenco} variant="outlined">
              <Scheda propieta={this.props} />
            </Paper>
          </Box>
        }
      </>
    );
  }
}

export default withStyles(styles) (Colore_schedaView) ;