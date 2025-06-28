import React from 'react'; 

 

import styles from '../common/globalStyle'
 
import EditIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import { Articolo } from '../model/Articolo';
import {    Order, tableUtility,   } from '../common/tableUtility';
 
import NumberFormat from 'react-number-format';
import { withStyles } from '@mui/styles';
import { TableHead, TableRow, TableCell, TableSortLabel, IconButton, Box, Paper, TableContainer, TableBody, TablePagination } from '@mui/material';
import { Table } from 'react-bootstrap';
 
 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort, isEditMode } = props;
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {   onRequestSort(event, property);   };

   
  return (   
    <TableHead>
      <TableRow>
 
            <TableCell   key="codice"  align="left"   sortDirection={orderBy === "codice" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "codice"}
                direction={orderBy === "codice" ? order : 'asc'}
                onClick={createSortHandler("codice")}>
                    Codice 
              </TableSortLabel>
            </TableCell>
            
            <TableCell    key="descrizione"  align="left" sortDirection={orderBy === "descrizione" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "descrizione"}
                direction={orderBy === "descrizione" ? order : 'asc'}
                onClick={createSortHandler("descrizione")}>
                    Descrizione
              </TableSortLabel>
            </TableCell>

            <TableCell   width="10%"  key="prezzo"  align="left" sortDirection={orderBy === "prezzo" ? order : false}>

            <TableSortLabel
                active={orderBy ===  "prezzo"}
                direction={orderBy === "prezzo" ? order : 'asc'}
                onClick={createSortHandler("prezzo")}>
                    Prezzo
              </TableSortLabel>
            </TableCell>

 
            
            {isEditMode && sessionStorage.getItem("profile") === "admin" &&
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

    
        <TableCell  align="left" >{row.codice}</TableCell>
        <TableCell   align="left" >{row.descrizione}</TableCell>
        <TableCell   align="left" width="10%">
         
          <NumberFormat decimalSeparator="," 
                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                value={row.prezzo } displayType={'text'} prefix={'€ '} />   

        </TableCell> 
        
      {isEditMode &&  sessionStorage.getItem("profile") === "admin" &&
      <TableCell align="right">
        <Box display="flex" flexDirection="row" flexWrap="nowrap" alignItems="center">
          <IconButton color="primary" component="span" onClick={() => { propieta.deleteScheda(row); }}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" component="span" onClick={() => { propieta.showScheda(row); }}>
            <EditIcon />
          </IconButton>
        </Box>
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

class Articoli_elencoView  extends React.Component <IProps,IState> {

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
 



  handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Articolo) => {
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

 
 

<Box  display="flex" flexDirection="row" alignItems="center"    justifyContent="center"
    width={'100%'}  > 
 
          <Paper className={this.props.classes.paperElenco} variant="outlined" >

              <TableContainer  >
                <Table  
                  className={this.props.classes.table}
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table">

                  <TableHeader
                    isEditMode={this.props.isEditMode}
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

export default withStyles(styles) (Articoli_elencoView) ;

 