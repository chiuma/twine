import React from 'react'; 

import {     Box,   IconButton, TableHead, TableSortLabel} from '@material-ui/core';

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
 
import { Colore } from '../model/Colore';
import {    Order, tableUtility,   } from '../common/tableUtility';
 
 
 

 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort, isEditMode } = props;
  const createSortHandler = (property: keyof Colore) => (event: React.MouseEvent<unknown>) => {   onRequestSort(event, property);   };

   
  return (   
    <TableHead>
      <TableRow>
 
 
            
            <TableCell    key="codice"  align="left" sortDirection={orderBy === "codice" ? order : false}>

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


 
            
            {isEditMode &&
            <TableCell></TableCell>
            }

      </TableRow>
    </TableHead>
  );
}
 
 
function TableRows   (props: any ) {
  const {   row  ,   propieta } = props;
  
  
  return (   
    <TableRow
      hover                       
      tabIndex={-1}>

  
      <TableCell align="left" >{row.codice}</TableCell>
      <TableCell align="left" >{row.descrizione}</TableCell>
      
    
    

      <TableCell align="right"   >

        <IconButton color="primary"  component="span"   
            onClick={() => { propieta.deleteScheda(row);}}>
          <DeleteIcon />
        </IconButton>    
     
        <IconButton color="primary" component="span"   onClick={() => { propieta.showScheda(row);}}>
          <EditIcon />
        </IconButton>
        
 
           
      
    </TableCell> 
    
 
 

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

class Clienti_elencoView  extends React.Component <IProps,IState> {

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
 



  handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Colore) => {
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

 


<Box  display="flex" flexDirection="row" alignItems="center"   width="100%"
                justifyContent="center" > 
 
          <Paper style={{width:'60%'}} variant="outlined" >

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
 
 
 
export default withStyles(styles) (Clienti_elencoView);

 