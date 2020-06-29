import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import  axios  from 'axios';
import Grid from '@material-ui/core/Grid';
import { Card, CardHeader } from 'material-ui';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Avatar from '@material-ui/core/Avatar';

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

const GridCustomStyle = withStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))(Grid);


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

  

  const [page, setPage] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [orderData, setOrderData] = React.useState({});
  const [productData, setProductData] = React.useState([{
        code:'1',
        title:'Plan 1',
        price:999,
        currency:'ARS',
  }]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function fillProducts(items){
      
      items.map(function(item,index){
            setProductData(state => [...state, 
              {code:item.product.code,title:item.product.title,price:item.product.price.amount, currency:item.product.price.currency.iso_code}
            ]);
        }
      )
      console.log("products",productData);
    };
      

  async function onModalClick(id)  {
    const response = await axios.get(`http://localhost:3000/order/${id}`);
    setOrderData({id:response.data.id}) 
    fillProducts(response.data.items); 
    
    setIsOpen(true);
  }

  const handleClose = () =>  {
    setOrderData({});
    //setProductData([]); 
    setIsOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  props.columns.map(function(row, index){
      names[index] = row.name;
      aligns[index] = row.align;
  })


  

  return (
    <Paper>
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
                <StyledTableCell align="left"><EditIcon onClick={() => onModalClick(row.id)}></EditIcon></StyledTableCell>
                
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={props.data.length}
      rowsPerPage={props.limit}
      page={props.page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper elevation={3}>
          <DialogTitle id="responsive-dialog-title">
                  {`Orden #${orderData.id}`}
          </DialogTitle>
          <DialogContent>
                     <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            Productos
                        
                            <List>
                              <ListItem>
                                <ListItemText primary="Plan 1" secondary="1">

                                </ListItemText>
                                <Chip
                                avatar={<Avatar>{'ARS'}</Avatar>}
                                label="1200"
                                color={'primary'}
                                icon={<AttachMoneyIcon />}
                              />
                              </ListItem>
                             
                            </List>
                            {productData.map(function(product,index){

                                {product}
                               /*  <ListItem>
                                    <ListItemText primary={product.title} secondary={product.code}>

                                    </ListItemText>
                                    <Chip
                                avatar={<Avatar>{'ARS'}</Avatar>}
                                label={product.price}
                                color={'primary'}
                                deleteIcon={<AttachMoneyIcon />}
                              />
                                <Divider variant={'inset'} component={'li'} />
                                </ListItem> */
                               
                             })}
                             
                        
                      </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Paper className={classes.paper}>Titular</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper className={classes.paper}>Vendedor</Paper>
                    </Grid>
                     </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions> 

        </Paper>
  
      </Dialog>
    </Paper>
  );
}