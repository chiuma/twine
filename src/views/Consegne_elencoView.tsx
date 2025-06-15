import React from 'react'; 

import {     Box,  Checkbox,  IconButton, TableHead, TableSortLabel, Tooltip} from '@mui/material';
 

import   styles   from '../common/globalStyle'
 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
 
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
 
 
import Paper from '@mui/material/Paper';
  
import EditIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
 import HideConsegna from '@mui/icons-material/VisibilityOff';
import ShowConsegna from '@mui/icons-material/Visibility';
 
import {    Order, tableUtility,   } from '../common/tableUtility';
 
import NumberFormat from 'react-number-format';
import { CommonFunctions } from '../common/CommonFunctions';
import { withStyles } from '@mui/styles';
 
 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort, isEditMode } = props;

  
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => 
  {   
      
    onRequestSort(event, property);   

    };


   
  return (   
    <TableHead>
      <TableRow>
 
 
            
            <TableCell   key="data_consegna_effettuata"  align="left"   sortDirection={orderBy === "data_consegna_effettuata" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "data_consegna_effettuata"}
                direction={orderBy === "data_consegna_effettuata" ? order : 'asc'}
                onClick={createSortHandler("data_consegna_effettuata")}>
                    Data  consegna
              </TableSortLabel>
            </TableCell>

            <TableCell    key="progressivo"  align="left" sortDirection={orderBy === "progressivo" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "progressivo"}
                direction={orderBy === "progressivo" ? order : 'asc'}
                onClick={createSortHandler("progressivo")}>
                    Codice
              </TableSortLabel>
            </TableCell>

            {props.showCliente   && 
            <TableCell    key="cliente_descrizione"  align="left" sortDirection={orderBy === "cliente_descrizione" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cliente_descrizione"}
                direction={orderBy === "cliente_descrizione" ? order : 'asc'}
                onClick={createSortHandler("cliente_descrizione")}>
                    Cliente
              </TableSortLabel>
            </TableCell>
            }
            {sessionStorage.getItem("username")==="fulladmin" &&
              <>
              <TableCell     align="center"> 
              Totale   
              </TableCell>


              <TableCell     align="center"> 
              Totale scontato
              </TableCell>
              </>
            }
            <TableCell     align="center"> 
             Commissione
            </TableCell>


            {isEditMode &&
            <TableCell  ></TableCell>
            }

      </TableRow>
    </TableHead>
  );
}
 
 
function TableRows   (props: any ) {
  const {   row  , isEditMode , propieta , handleChangeForm } = props;
  
  return (   
    <TableRow     hover       tabIndex={-1}>

 
    
         
        <TableCell  align="left" style={{ whiteSpace: "nowrap" }}>{CommonFunctions.FormatDateDDMMYYYY ( row.data_consegna_effettuata)}</TableCell>
        <TableCell   align="left" >
          <>
          <Tooltip title={row.nota} arrow>
            <Box>
            {row.progressivo} <sup>{row.nota !=="" ? "*" : ""}</sup>
            </Box>
          </Tooltip>
          </>
          
         
        </TableCell>

        {props.showCliente   && 
        <TableCell   align="left" >{ row.cliente_descrizione     }  </TableCell>

        }
         {sessionStorage.getItem("username")==="fulladmin" &&
         <>
        <TableCell  align="center"  style={{ whiteSpace: "nowrap" }}>   
             <NumberFormat decimalSeparator=","   prefix={'€ '}
              thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
              value={  row.importo  }  
              displayType={'text'}  />   
        </TableCell>


        <TableCell  align="center"  style={{ whiteSpace: "nowrap" }}>   
            <NumberFormat decimalSeparator=","   prefix={'€ '}
              thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
              value={  row.importo_scontato }  
              displayType={'text'}  />   
        </TableCell>
        </>
        }
        <TableCell  align="center"  style={{ whiteSpace: "nowrap" }}>   
            <NumberFormat decimalSeparator=","   prefix={'€ '}
              thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
              value={  row.importo_manuale*row.importo_scontato/100  }   
              displayType={'text'}  />   
        </TableCell>    
 
      {isEditMode &&
        <TableCell align="right"   style={{ whiteSpace: "nowrap" }}>  
        {sessionStorage.getItem("username")==="fulladmin" && false &&
            <IconButton color="primary"  component="span"   
            title= {row.hide===1 ? "Clicca per renderlo visibile" : "Clicca per nascondere"} 
                onClick={() => { propieta.hiddingScheda(row.id_consegna);}}>
                  {row.hide===0 &&  
                  <ShowConsegna/>
                } 
                  {row.hide===1 &&  
                  <HideConsegna/>
                } 
        
 

            </IconButton>   
          } 
            <IconButton color="primary"  component="span"   onClick={() => { propieta.deleteScheda(row);}}>
            <DeleteIcon />
            </IconButton>    
            {  sessionStorage.getItem("username") === "fulladmin" && 
            <IconButton color="primary"  component="span"   onClick={() => { propieta.showScheda(row);}}>
            <EditIcon />
            </IconButton>
}

            <Checkbox 
              style={{  padding:  '1px 2px 0px 5px'  }}
                size="small"  title='Stampa etichetta cliente'
                checked={row.stampa === true} 
                id="stampa"
                name="stampa" 
                onChange={ (event:any )  => { 
                  handleChangeForm (      
                    {target: {name: 'stampa', value:  event.target.checked, id_consegna: row.id_consegna}}) 
                  } } />
              
           
        </TableCell>
        }
  </TableRow>
  );
}


export interface IState {
  order: Order,
  orderBy: any,
  page: number,
  rowsPerPage: number,

 

}


export interface IProps { 
  classes:any, 
  elenco: any , 
  isEditMode: boolean,
  showScheda: any,
  showCliente: boolean
  deleteScheda: any,
  hiddingScheda: any,
  handleChangeForm:any
}

class Consegne_elencoView  extends React.Component <IProps,IState> {

  constructor(props: IProps) {
    super(props);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
 
    this.state = { 
       
      rowsPerPage: 25   ,
      order: 'desc',
      orderBy: 'data_consegna_effettuata',
      page: 0,  
      
      
        
    };     
  }
 



  handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
   
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';


    this.setState({order: isAsc ? 'desc' : 'asc', orderBy: property })
 
  };

 

  handleChangePage = (event: unknown, newPage: number) => {
    this.setState({page: newPage }) 
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({rowsPerPage: parseInt(event.target.value, 10) , page:0}) 

  };

 
  render() { 

   

  return (

 


<Box  display="flex" flexDirection="row" alignItems="center"    width="100%"    justifyContent="center"  mb={1} > 
 
          <Paper className={this.props.classes.paperFullWidth} variant="outlined" >

              <TableContainer  >
                <Table  
                  className={this.props.classes.table}
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table">

                  <TableHeader
                    showCliente={this.props.showCliente  }
                    isEditMode={this.props.isEditMode}
                    classes={this.props.classes} 
                    order={this.state.order}
                    orderBy={this.state.orderBy} 
                    onRequestSort={this.handleRequestSort}
                    rowCount={this.props.elenco.length} 
                  />
                  <TableBody>
                    {tableUtility.stableSort(this.props.elenco, tableUtility.getComparator(this.state.order, this.state.orderBy))
                      .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                      .map((row:any, index) => 
                      {
                        return (
                        <TableRows key={index} 
                        handleChangeForm={ this.props.handleChangeForm  }
                        showCliente={ this.props.showCliente  }
                        propieta={this.props}  row={row}  isEditMode={this.props.isEditMode} />
                        )

                      })}

                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination       
                labelRowsPerPage="Righe per pag."   
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={this.props.elenco.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage} />
          
          </Paper>
 
 
 </Box>
 
  )
              
  }
}

 
export default withStyles(styles) (Consegne_elencoView) ; 

 