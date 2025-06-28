import React from 'react'; 

import {     Box,  IconButton,   TableHead, TableSortLabel} from '@mui/material';
import { withStyles } from "@mui/styles";
import   styles   from '../common/globalStyle'
 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
 
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
 
 
import Paper from '@mui/material/Paper';
  
import EditIcon from '@mui/icons-material/Search';
 

 
import {    Order, tableUtility,   } from '../common/tableUtility';
 
import NumberFormat from 'react-number-format';
import { CommonFunctions } from '../common/CommonFunctions';
 
 

 
function TableHeader   (props: any  ) {
  const {   order, orderBy,    onRequestSort  } = props;
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
                    Data Consegna
              </TableSortLabel>
            </TableCell> 

            <TableCell width="50%"   key="cliente_descrizione"  align="left" 
                sortDirection={orderBy === "cliente_descrizione" ? order : false}>

              <TableSortLabel  
                active={orderBy ===  "cliente_descrizione"}
                direction={orderBy === "cliente_descrizione" ? order : 'asc'}
                onClick={createSortHandler("cliente_descrizione")}>
                    Cliente
              </TableSortLabel>
            </TableCell>

 



            <TableCell   width="5%"    align="left"> 
                    Qta 
            </TableCell>
 

     

            <TableCell   width="5%"    align="left"> 
                    Totale 
            </TableCell>

 

            <TableCell    key="consegnato"  align="left" sortDirection={orderBy === "consegnato" ? order : false}>

              <TableSortLabel
                active={orderBy ===  "consegnato"}
                direction={orderBy === "consegnato" ? order : 'asc'}
                onClick={createSortHandler("consegnato")}>
                    Consegnato
              </TableSortLabel>
            </TableCell>
            
            {sessionStorage.getItem("profile") === "admin" && 
              <TableCell    key="user_new"  align="left" sortDirection={orderBy === "user_new" ? order : false}>

                <TableSortLabel
                  active={orderBy ===  "user_new"}
                  direction={orderBy === "user_new" ? order : 'asc'}
                  onClick={createSortHandler("user_new")}>
                      Utente
                </TableSortLabel>
              </TableCell>
            }
            
            <TableCell></TableCell>
           

      </TableRow>
    </TableHead>
  );
}
 
 
function TableRows   (props: any ) {
  const {   row  , isEditMode , propieta } = props;
 

  return (   
    <TableRow     hover       tabIndex={-1}>

 
    
        <TableCell  align="left"  width="7%">{CommonFunctions.FormatDateDDMMYYYY ( row.data_ricezione)}</TableCell>
        <TableCell  align="left"  width="7%">{CommonFunctions.FormatDateDDMMYYYY ( row.data_consegna)}</TableCell> 
        <TableCell   align="left" width="20%">
 
        {row.cliente_descrizione }
        </TableCell>

 

        <TableCell   align="left"  width="5%">{row.qta}</TableCell>

 

        

        <TableCell   align="left"   style={{ whiteSpace: "nowrap"}}>
         
          <NumberFormat decimalSeparator="," 
                thousandSeparator="."  decimalScale={2} fixedDecimalScale={true}
                value={
                  row.importo_totale  
                
                } displayType={'text'} prefix={'€ '} />   

        </TableCell> 

   
        <TableCell   align="left" >{row.consegnato  === true ? "Si" : "No"}</TableCell>
        {sessionStorage.getItem("profile") === "admin" && 
        <TableCell   align="left" width="10%">{row.user_new}</TableCell>
        }

        {isEditMode &&
        <TableCell align="right"   style={{ whiteSpace: "nowrap"}}  >
  
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
  
  

}

class Ordini_elenco_testataView  extends React.Component <IProps,IState> {

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

 export default withStyles(styles) (Ordini_elenco_testataView); 

 