import React from 'react'; 
import { Box, IconButton, TableHead, TableSortLabel, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from '@mui/material';
 import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../common/globalStyle';
import { Colore } from '../model/Colore';
import { Order, tableUtility } from '../common/tableUtility';
import { Theme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
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
      
    
    
      {sessionStorage.getItem("profile") === "admin" &&
      <TableCell align="right">
        <Box display="flex" flexDirection="row" flexWrap="nowrap" alignItems="center">
          <IconButton color="primary" component="span" onClick={() => { propieta.deleteScheda(row); }}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" component="span" onClick={() => { propieta.showScheda(row); }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </TableCell> 
      }
 
 

  </TableRow>
  );
}


export interface IProps { 
  elenco: Colore[], 
  isEditMode: boolean,
  classes:any,
  showScheda: (scheda: Colore) => void,
  deleteScheda: (scheda: Colore) => void,
  theme?: Theme
}

const Colori_elencoView = ({ classes, elenco, isEditMode, showScheda, deleteScheda }: IProps) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Colore>('descrizione');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Colore) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%" justifyContent="center">
      <Paper className={classes.paperElencoSmall} variant="outlined">
        <TableContainer>
          <Table 
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table">
            <TableHeader
              isEditMode={isEditMode}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={elenco.length}
            />
            <TableBody>
              {tableUtility.stableSort(elenco, tableUtility.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRows 
                    key={index}
                    propieta={{ showScheda, deleteScheda }}
                    row={row}
                    isEditMode={isEditMode}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Righe per pag."
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={elenco.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
 
export default  withStyles (styles)  (Colori_elencoView) ;

 