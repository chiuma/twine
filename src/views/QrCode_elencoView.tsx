import React from 'react'; 

import {     Box,  IconButton, TableHead, TableSortLabel} from '@mui/material';

 
 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
 
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
 
 
import Paper from '@mui/material/Paper';
  
import EditIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
 import styles from '../common/globalStyle';
 
import { QrCode } from '../model/QrCode';
import {    Order, tableUtility,   } from '../common/tableUtility';
import { withStyles } from '@mui/styles';
 
 
 
 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort, isEditMode } = props;
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {   onRequestSort(event, property);   };

   
  return (   
    <TableHead>
      <TableRow>
 
            <TableCell   key="codice"  align="left"   sortDirection={orderBy === "code" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "code"}
                direction={orderBy === "code" ? order : 'asc'}
                onClick={createSortHandler("code")}>
                    Qr Code 
              </TableSortLabel>
            </TableCell>
            
            <TableCell    key="cod_articolo"  align="left" sortDirection={orderBy === "cod_articolo" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cod_articolo"}
                direction={orderBy === "cod_articolo" ? order : 'asc'}
                onClick={createSortHandler("cod_articolo")}>
                    Cod. articolo
              </TableSortLabel>
            </TableCell>

            <TableCell    key="cod_colore"  align="left" sortDirection={orderBy === "cod_colore" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cod_colore"}
                direction={orderBy === "cod_colore" ? order : 'asc'}
                onClick={createSortHandler("cod_colore")}>
                    Colore 1
              </TableSortLabel>
            </TableCell>
 
            <TableCell    key="cod_colore_2"  align="left" sortDirection={orderBy === "cod_colore_2" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cod_colore_2"}
                direction={orderBy === "cod_colore_2" ? order : 'asc'}
                onClick={createSortHandler("cod_colore_2")}>
                    Colore 2
              </TableSortLabel>
            </TableCell>
 
            <TableCell    key="cod_colore_3"  align="left" sortDirection={orderBy === "cod_colore_3" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cod_colore_3"}
                direction={orderBy === "cod_colore_3" ? order : 'asc'}
                onClick={createSortHandler("cod_colore_3")}>
                    Colore 3
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
  const {   row  , isEditMode , propieta } = props;
 

 
  return (   
    <TableRow     hover       tabIndex={-1}>

    
        <TableCell  align="left" >{row.code}</TableCell>
        <TableCell   align="left" >{row.cod_articolo}</TableCell>
        <TableCell   align="left" >{row.cod_colore}</TableCell>
        <TableCell   align="left" >{row.cod_colore_2}</TableCell>
        <TableCell   align="left" >{row.cod_colore_3}</TableCell>
 
        
      {isEditMode &&
      <TableCell align="right"   >

        <IconButton color="primary"   component="span"   onClick={() => { propieta.deleteScheda(row);}}>
          <DeleteIcon />
        </IconButton>    
   
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

class QrCode_elencoView  extends React.Component <IProps,IState> {

  constructor(props: IProps) {
    super(props);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
 
    this.state = { 
       
      rowsPerPage: 25   ,
      order: 'asc',
      orderBy: 'cod_articolo',
      page: 0,  
      
      
        
    };     
  }
 



  handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof QrCode) => {
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

 


<Box  display="flex" flexDirection="row" alignItems="center"    
width={{ xs: '98%', sm: '90%' , md: '75%', lg: '65%', xl: '60%',}} 
    justifyContent="center" > 
 
          <Paper className={this.props.classes.paperElenco} variant="outlined" >

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

 
export default withStyles(styles) (QrCode_elencoView) ; 
 

 