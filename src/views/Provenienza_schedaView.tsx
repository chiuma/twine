import React from 'react';
import { 
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  Paper,
  Toolbar,
  Typography,
  TextField
} from '@mui/material';
 
import styles from '../common/globalStyle';
import { IconsMenu } from '../common/Icons';
import SaveIcon from '@mui/icons-material/Save';
import { withStyles } from '@mui/styles';
import { CustomComponents } from '../utils/CustomComponents';

 
 
function Scheda(props: any) {
  const { propieta } = props;
  return (
    <Box width="100%">
      {propieta.isInProgress && (
        <Box mt={2}>
          <CircularProgress color="primary" />
        </Box>
      )}
      <Box width="100%" p={2}>
        <AppBar position="static" className={propieta.classes.barBackground} color="primary">
           <Toolbar>
            <Typography variant="h6"  className={propieta.classes.title}>
              Provenienza - {propieta.formData.id_provenienza === -1 ? "Nuovo" : "Modifica"}
            </Typography>
            {!propieta.readOnly && propieta.bChangedForm && (
              <Button color="inherit" onClick={propieta.saveScheda}>
                <SaveIcon />
              </Button>
            )}
            <Button onClick={propieta.handleClose} size="small" color="primary" variant="contained">
              Chiudi
            </Button>
          </Toolbar>
        </AppBar>
        <FormControl style={{width: '100%', marginTop:'4%', marginBottom:'2%'}}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <CustomComponents.CustomTextField  
                error={propieta.formDataError.descrizione !== ""}
                helperText={propieta.formDataError.descrizione} 
                disabled={propieta.bReadObnly}
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
    </Box>
  );
}

export interface IProps { 
    formData: any,
    formDataError: any,
    handleChangeForm: any,
    scheda: any,
    isModal:boolean,
    handleClose:any,
    saveScheda:any,
    isInProgress: boolean,
    readOnly:boolean,
    bChangedForm: boolean
}

export interface IState {}

class Provenienza_schedaView extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.isModal && (
          <Dialog
            open={true}
            onClose={this.props.handleClose}
            aria-labelledby="dialog-title"
            PaperProps={{
              sx: {
                minWidth: '500px'
              }
            }}
          >
            <DialogContent style={{ overflow: "hidden" }}>
              <Scheda propieta={this.props} />
            </DialogContent>
          </Dialog>
        )}
        {!this.props.isModal && (
          <Box display="flex" flexDirection="row" alignItems="center" height="70%" width="50%"
            mt={4} justifyContent="center">
 
              <Scheda propieta={this.props} />
  
          </Box>
        )}
      </>
    );
  }
}

export default withStyles(styles) (Provenienza_schedaView) ; 