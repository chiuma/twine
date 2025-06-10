import React from 'react'; 

import {     Box,  IconButton, TableHead, TableSortLabel, Tooltip} from '@material-ui/core';

import   styles   from '../common/globalStyle'
 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
 
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
 
 
import Paper from '@material-ui/core/Paper';
  
import EditIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/core/styles";
 
 
import {    Order, tableUtility,   } from '../common/tableUtility';
 
import NumberFormat from 'react-number-format';
import { CommonFunctions } from '../common/CommonFunctions';
 
 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort, isEditMode } = props;
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => 
  {   
      
    onRequestSort(event, property);   

    };

   
  return (   
    <TableHead>
      <TableRow>
 
            <TableCell   key="data_ricezione"  align="left"   sortDirection={orderBy === "data_ricezione" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "data_ricezione"}
                direction={orderBy === "data_ricezione" ? order : 'asc'}
                onClick={createSortHandler("data_ricezione")}>
                    Data ricezione
              </TableSortLabel>
            </TableCell>
            
            <TableCell   key="data_consegna"  align="left"   sortDirection={orderBy === "data_consegna" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "data_consegna"}
                direction={orderBy === "data_consegna" ? order : 'asc'}
                onClick={createSortHandler("data_consegna")}>
                    Data  consegna
              </TableSortLabel>
            </TableCell>


            <TableCell    key="cliente_descrizione"  align="left" sortDirection={orderBy === "cliente_descrizione" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cliente_descrizione"}
                direction={orderBy === "cliente_descrizione" ? order : 'asc'}
                onClick={createSortHandler("cliente_descrizione")}>
                    Cliente
              </TableSortLabel>
            </TableCell>

            
            <TableCell    key="articolo_base_codice"  align="left" sortDirection={orderBy === "articolo_base_codice" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "articolo_base_codice"}
                direction={orderBy === "articolo_base_codice" ? order : 'asc'}
                onClick={createSortHandler("articolo_base_codice")}>
                    Articolo
              </TableSortLabel>
            </TableCell>



            <TableCell   width="5%"    align="left"> 
                    Qta 
            </TableCell>

            <TableCell   width="5%"    align="left"> 
                    Prezzo 
            </TableCell>

     

            <TableCell   width="5%"    align="left"> 
                    Totale 
            </TableCell>

   
            <TableCell    key="evaso"  align="left" sortDirection={orderBy === "evaso" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "evaso"}
                direction={orderBy === "evaso" ? order : 'asc'}
                onClick={createSortHandler("evaso")}>
                    Evaso
              </TableSortLabel>
            </TableCell>

            <TableCell    key="consegnato"  align="left" sortDirection={orderBy === "consegnato" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "consegnato"}
                direction={orderBy === "consegnato" ? order : 'asc'}
                onClick={createSortHandler("consegnato")}>
                    Consegnato
              </TableSortLabel>
            </TableCell>
            
            <TableCell     align="left"> 
                    Nota 
            </TableCell>

            {isEditMode &&
            <TableCell></TableCell>
            }

      </TableRow>
    </TableHead>
  );
}
 
 
function TableRows   (props: any ) {
  const {   row  , isEditMode , propieta } = props;
 
  return (   
    <TableRow     hover       tabIndex={-1}>

 
    
        <TableCell  align="left"  width="7%">
          {CommonFunctions.FormatDateDDMMYYYY ( row.data_ricezione)}
        </TableCell>
        <TableCell  align="left"  width="7%">{CommonFunctions.FormatDateDDMMYYYY ( row.data_consegna)}</TableCell>

        <TableCell   align="left" width="20%">
        {row.cliente_descrizione.length > 37 &&
          <Tooltip title={row.cliente_descrizione  } arrow>
            <Box>
            {  
                (row.cliente_descrizione.length > 37) ? 
                ((row.cliente_descrizione.substring(0,37 -3)) + '...') : 
                row.cliente_descrizione     

            }
            </Box>
          </Tooltip>
        }
        {row.cliente_descrizione.length <=  37 &&
          row.cliente_descrizione     
          }
        </TableCell>

        <TableCell   align="left" >
          <Tooltip title={row.articolo_base_descrizione + " / " + row.colore_descrizione 
        + (row.colore_descrizione_2 !== "" ? "+"  + row.colore_descrizione_2 : "")
        + (row.colore_descrizione_3 !== "" ? "+"  + row.colore_descrizione_3 : "")} arrow>
            <Box>
            {row.articolo_base_codice + ' / ' + row.colore_codice 
            + (row.colore_codice_2 !== "" ? "+"  + row.colore_codice_2 : "") 
            + (row.colore_codice_3 !== "" ? "+"  + row.colore_codice_3 : "")  }
            </Box>
          </Tooltip>
        </TableCell>

        <TableCell   align="left"  width="5%">{row.qta}</TableCell>

        <TableCell   align="left"  style={{ whiteSpace: "nowrap"}}>
         
          <NumberFormat decimalSeparator="," 
                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                value={row.prezzo} displayType={'text'} prefix={'€ '} />   

        </TableCell> 

        

        <TableCell   align="left"   style={{ whiteSpace: "nowrap"}}>
         
          <NumberFormat decimalSeparator="," 
                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                value={
                  row.prezzo*row.qta  
                
                } displayType={'text'} prefix={'€ '} />   

        </TableCell> 

        <TableCell   align="left" >{row.evaso  === true ? "Si" : "No"}</TableCell>
        <TableCell   align="left" >{row.consegnato  === true ? "Si" : "No"}</TableCell>
        <TableCell  align="left"  width="15%">{ row.nota}</TableCell>


      {isEditMode &&
      <TableCell align="right"   style={{ whiteSpace: "nowrap"}}  >
        {row.consegnato === false &&
        <IconButton color="primary"  component="span"   onClick={() => { propieta.deleteScheda(row);}}>
          <DeleteIcon />
        </IconButton>    
        }
        <IconButton color="primary"   component="span"   onClick={() => { propieta.showScheda(row);}}>
          <EditIcon />
        </IconButton>
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
  
  deleteScheda: any,

}

class Ordini_elenco_dettaglioView  extends React.Component <IProps,IState> {

  constructor(props: IProps) {
    super(props);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
 
    this.state = { 
       
      rowsPerPage: 25   ,
      order: 'asc',
      orderBy: 'descrizione',
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

 


<Box  display="flex" flexDirection="row" alignItems="center"    width="100%"    justifyContent="center" mb={1} > 
 
          <Paper className={this.props.classes.paperFullWidth} variant="outlined" >

              <TableContainer  >
                <Table  
                  className={this.props.classes.table}
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table">

                  <TableHeader
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
                        <TableRows key={index}  propieta={this.props}  row={row}  isEditMode={this.props.isEditMode} />
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

 
 
export default withStyles(styles) (Ordini_elenco_dettaglioView);

 