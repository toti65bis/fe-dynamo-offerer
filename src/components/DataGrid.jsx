import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#ff5722',
    color: theme.palette.common.white,
    fontWeight: 'bold' 
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const dateFormater = (isoDate) => {
  let date = new Date(isoDate);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return dt+'/'+month+'/'+year;
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const names = []; 
  const aligns = []; 
  
  props.columns.map(function(row, index){
      names[index] = row.name;
      aligns[index] = row.align;
  })

  props.data.map(function(row, index){
    console.log("ROWS", row[index]);
  })

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
           <TableRow>
            <StyledTableCell align={aligns[0]}>{names[0]}</StyledTableCell>
            <StyledTableCell align={aligns[1]}>{names[1]}</StyledTableCell>
            <StyledTableCell align={aligns[2]}>{names[2]}</StyledTableCell>
            <StyledTableCell align={aligns[3]}>{names[3]}</StyledTableCell>
            <StyledTableCell align={aligns[4]}>{names[4]}</StyledTableCell>
            <StyledTableCell align={aligns[5]}>{names[5]}</StyledTableCell>
            <StyledTableCell align={aligns[6]}>{names[6]}</StyledTableCell>
          </TableRow> 
         
            
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <StyledTableCell align="left">{dateFormater(row.created_at)}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.document}</StyledTableCell>
              <StyledTableCell align="left">{row.products}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
              <StyledTableCell align="left">{row.actions}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}