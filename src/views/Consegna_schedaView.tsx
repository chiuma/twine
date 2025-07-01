import React from 'react';
import { AppBar, Box, Button, CircularProgress, IconButton, Paper, Toolbar, Typography } from '@mui/material';
 import styles from '../common/globalStyle';
import { Cliente } from '../model/Cliente';
import Consegna_dettaglioForm from './Consegna_dettaglioForm';
import Consegna_testataForm from './Consegna_testataForm';
import { Consegna, ConsegnaTestataErrors } from '../model/Consegna';
import { ConsegnaDettaglioErrors } from '../model/ConsegnaDettaglio';
import { IconsMenu } from '../common/Icons';
import { consegneServices } from '../services/consegneServices';
import { NotificationManager } from 'react-notifications';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { withStyles } from '@mui/styles';

async function esportaFattura(id_consegna) {
  let response = await consegneServices.getFatturaXml(id_consegna);
  let mex = "";
  if (response.esito === 'OK') {
    NotificationManager.success('Operazione eseguita con successo.', 'Consegne', 3000);
  } else {
    if (response.err_code === "001")
      mex = "Errore server.";
    else if (response.err_code === "002")
      mex = "Impossibile esportare la fattura. Dati del cliente mancanti.";
    else
      mex = "Errore durante l'elaborazione.";
    NotificationManager.error(mex, 'Consegne', 3000);
  }
}

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function Testata(propieta: any) {
  let props = propieta.props;
  return (
    <Box width="100%">
      <Box width="100%" >
        <AppBar position="static" className={props.classes.barBackground} color="primary">
          <Toolbar>
            <Typography variant="h6" className={props.classes.title}>
              {props.formConsegna.id_consegna === -1 ? "Nuovo " : ""}Consegna
            </Typography>

            {!props.isInProgress &&
            <>
              {!props.bChangedForm && props.formConsegna.id_consegna !== -1 &&
              <>
                <Button onClick={() => { esportaFattura(props.formConsegna.id_consegna); }}
                  style={{ marginRight: 10 }} size="small" color="primary" variant="contained">
                  Esporta Fattura
                </Button>

                <Button onClick={props.handleEtichetteStampa} style={{ marginRight: 10 }} startIcon={<IconsMenu.StampaIcon />} size="small" color="primary" variant="contained">
                  Etichette
                </Button>

                <Button onClick={props.handleStampa} style={{ marginRight: 10 }} startIcon={<IconsMenu.StampaIcon />} size="small" color="primary" variant="contained">
                  Stampa
                </Button>
              </>
              }

              {!props.readOnly && props.formConsegna.consegnaDettaglio.length > 0 &&
                <Button style={{ marginRight: 10 }} startIcon={<IconsMenu.OrdiniIcon />} onClick={e => props.handleAddOrdine(true)}
                  size="small" color="primary" variant="contained">
                  AGGIUNGI ORDINE
                </Button>
              }

              {!props.readOnly &&
                !(props.formConsegna.consegnaDettaglio.reduce((accumulator, currentValue, currentIndex) =>
                  accumulator && currentValue.consegnato, true)) &&
                <Button style={{ marginRight: 10 }} onClick={props.handleConsegnaAll}
                  size="small" color="primary" variant="contained">
                  Consegna tutto
                </Button>
              }

              {!props.readOnly && props.bChangedForm &&
                props.formConsegna.consegnaDettaglio.findIndex(x => x.consegnato === true) !== -1 &&
                <Button onClick={props.handleSaveConsegna} style={{ marginRight: 10 }} size="small" color="primary" variant="contained">
                  Salva
                </Button>
              }

              <Button onClick={e => props.handleSaveConsegna(null)} size="small" color="primary" variant="contained">
                Chiudi
              </Button>
            </>}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

export interface IProps {
  formConsegna: Consegna,
  formDataError: ConsegnaTestataErrors,
  arrFormDettaglioErrors: ConsegnaDettaglioErrors[],
  handleStampa: any,
  handleEtichetteStampa: any,
  handleConsegnaAll: any,
  handleAddOrdine: any,
  elenco_clienti: Cliente[],
  applicaSconto: any | null,
  classes: any,
  handleDelDettaglio: any,
  handleChangeFormTestata: any,
  handleChangeFormDettaglio: any,
  deleteOrdineDettaglio: any,
  handleSaveConsegna: any,
  isInProgress: boolean,
  readOnly: boolean,
  bChangedForm: boolean,
  showCliente: any
}

export interface IState {
}

class Consegna_schedaView extends React.Component<IProps, IState> {
  render() {
    let that = this;
    return (
      <>
        {this.props.isInProgress &&
          <Box mt={2} mb={2}>
            <CircularProgress color="primary" />
          </Box>
        }

        <Box display="flex" flexDirection="row" alignItems="center" width="100%"
          justifyContent="center">
          <Paper className={this.props.classes.paperFullWidth} variant="outlined">
            <Box width="100%" p={2}>
              <Box mb={2}>
                <Testata props={this.props} />
              </Box>

              <Box mb={2}>
                <Paper variant="outlined" elevation={1}>
                  <Box p={2}>
                    <Consegna_testataForm 
                      showCliente={this.props.showCliente}
                      elenco_clienti={this.props.elenco_clienti}
                      formData={this.props.formConsegna}
                      formDataError={this.props.formDataError}
                      readOnly={this.props.readOnly}
                      handleChangeForm={this.props.handleChangeFormTestata}
                    />
                  </Box>
                </Paper>
              </Box>

              {this.props.formConsegna.consegnaDettaglio.length === 0 && this.props.formConsegna.id_cliente !== -1 &&
                <Box mb={2} mt={4} fontWeight={500} color="secondary.main" textAlign="center">
                  Nessun ordine da consegnare al cliente selezionato
                </Box>
              }

              {this.props.formConsegna.consegnaDettaglio.map((consegnaDettaglio, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {consegnaDettaglio.id_consegna_dettaglio === -1 && (idx === 0 || (idx > 0 && this.props.formConsegna.consegnaDettaglio[idx - 1].id_consegna_dettaglio !== -1)) &&
                      <Box mt={2} ml={1} fontWeight={700} color="secondary.main" style={{ fontSize: '120%', flexWrap: 'wrap', }}>
                        Aggiungi alla consegna:
                      </Box>
                    }

                    <Box mb={2} mt={2} key={idx}>
                      <Paper variant="outlined" elevation={3}>
                        <Box p={1}>
                          <Consegna_dettaglioForm
                            key={idx}
                            deleteOrdineDettaglio={this.props.deleteOrdineDettaglio}
                            applicaSconto={idx === 0 && !this.props.readOnly && consegnaDettaglio.consegnato ? this.props.applicaSconto : null}
                            formData={consegnaDettaglio}
                            readOnly={this.props.readOnly}
                            formDataError={this.props.arrFormDettaglioErrors[idx]}
                            handleChangeForm={(e) => that.props.handleChangeFormDettaglio(e, idx)}
                            handleDelDettaglio={(e) => that.props.handleDelDettaglio(e, idx)}
                          />
                        </Box>
                      </Paper>
                    </Box>
                  </React.Fragment>
                );
              })}

              {this.props.formConsegna.consegnaDettaglio.length > 5 &&
                <Box mt={1} width="100%" textAlign="right">
                  <IconButton color="primary" title="Vai all'inizio" component="span" onClick={() => { goTop(); }}>
                    <ArrowUpwardIcon />
                  </IconButton>
                </Box>
              }
            </Box>
          </Paper>
        </Box>
      </>
    );
  }
}

export default withStyles(styles) (Consegna_schedaView) ;