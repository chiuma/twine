import React from 'react'; 

import {     Box, IconButton, TableHead, TableSortLabel} from '@material-ui/core';

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
 
import { Cliente } from '../model/Cliente';
import {   HeadCell, Order, tableUtility,   } from '../common/tableUtility';
 
 


 

const headCells: HeadCell[] = [
  { id: 'id_cliente', numeric: false,   label: 'id_cliente', align: 'left' },
 
  { id: 'descrizione', numeric: false,  label: 'Cliente', align: 'left' },
 
  { id: 'piva', numeric: false,   label: 'P. Iva', align: 'left' }, 
  { id: 'comune', numeric: false,  label: 'Comune', align: 'left' },
  { id: 'telefono', numeric: false,  label: 'Telefono', align: 'left' },
  { id: 'cellulare', numeric: false,  label: 'Cellulare', align: 'left' },
  { id: 'email', numeric: false,  label: 'Email', align: 'left' },
  
];
 

 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort, isEditMode } = props;
  const createSortHandler = (property: keyof Cliente) => (event: React.MouseEvent<unknown>) => {   onRequestSort(event, property);   };

   
  return (   
    <TableHead>
      <TableRow>
 
 
            
            <TableCell   width={'30%'}  key="descrizione"  align="left" sortDirection={orderBy === "descrizione" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "descrizione"}
                direction={orderBy === "descrizione" ? order : 'asc'}
                onClick={createSortHandler("descrizione")}>
                    Descrizione
              </TableSortLabel>
            </TableCell>

            <TableCell    key="piva"  align="left" sortDirection={orderBy === "piva" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "piva"}
                direction={orderBy === "piva" ? order : 'asc'}
                onClick={createSortHandler("piva")}>
                    P.Iva
              </TableSortLabel>
            </TableCell>

            <TableCell   >
              <TableSortLabel
                active={orderBy ===  "comune"}
                direction={orderBy === "comune" ? order : 'asc'}
                onClick={createSortHandler("comune")}>
                    Comune
              </TableSortLabel>
              
            </TableCell>


            <TableCell    key="telefono"  align="left" sortDirection={orderBy === "telefono" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "telefono"}
                direction={orderBy === "telefono" ? order : 'asc'}
                onClick={createSortHandler("telefono")}>
                    Telefono
              </TableSortLabel>
            </TableCell>

            <TableCell    key="cellulare"  align="left" sortDirection={orderBy === "cellulare" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "cellulare"}
                direction={orderBy === "cellulare" ? order : 'asc'}
                onClick={createSortHandler("cellulare")}>
                    Cellulare
              </TableSortLabel>
            </TableCell>


            <TableCell   >Email</TableCell>
 
 
            {isEditMode &&
            <TableCell></TableCell>
            }

      </TableRow>
    </TableHead>
  );
}
 
 
function TableRows   (props: any ) {
  const {   row  , isEditMode , propieta } = props;
  let idx= (isEditMode ? 0 : 1); 
  
  return (   
    <TableRow
      hover                       
      tabIndex={-1}>

 
 
 
      <TableCell align={headCells[idx++].align} >{row.descrizione}</TableCell>
      <TableCell align={headCells[idx++].align} >{row.piva}</TableCell>
      <TableCell align={headCells[idx++].align} >{row.comune}</TableCell> 
      <TableCell align={headCells[idx++].align} >{row.telefono}</TableCell> 
      <TableCell align={headCells[idx++].align} >{row.cellulare}</TableCell> 
      <TableCell align={headCells[idx++].align} >{row.email}</TableCell> 
 
    

      <TableCell align="right"  style={{ whiteSpace: "nowrap"}}  >

        <IconButton color="primary"   component="span"   onClick={() => { propieta.deleteScheda(row);}}>
          <DeleteIcon />
        </IconButton>    
   
        <IconButton color="primary"   component="span"   onClick={() => { propieta.showScheda(row);}}>
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
 



  handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Cliente) => {
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

 


<Box  display="flex" flexDirection="row" alignItems="center"   width="100%"                justifyContent="center" > 
 
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
                    headCells={headCells}
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

 