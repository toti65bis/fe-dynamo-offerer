import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ResponsiveDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState((props.isOpen)?props.isOpen:false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper elevation={3}>
          <DialogTitle id="responsive-dialog-title">
                  {`Orden #${(props.order)?props.order.id:''}`}
          </DialogTitle>
          <DialogContent>
                     <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Paper>
                            Productos
                        
                         {/*    <List>
                              <ListItem>
                                <ListItemText primary="Plan 1" secondary="1">

                                </ListItemText>
                                <Chip
                                avatar={<Avatar>{'ARS'}</Avatar>}
                                label="1200"
                                color={'primary'}
                              />
                              </ListItem>

                            </List> */}

                            {  console.log(props.order.items)}
{/* 
                          {props.order.items.map( (product,index) => (

                                <ListItem>
                                      <ListItemText primary={product.title} secondary={product.code}>

                                      </ListItemText>
                                      <Chip
                                          avatar={<Avatar>{'ARS'}</Avatar>}
                                          label={product.price}
                                          color={'primary'}
                                          deleteIcon={<AttachMoneyIcon />}
                                        />
                                          <Divider variant={'inset'} component={'li'} />
                                  </ListItem>
                            ))}  */}
                             
                        
                      </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Paper>Titular</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper>Vendedor</Paper>
                    </Grid>
                     </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={props.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={props.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions> 

        </Paper>
  
      </Dialog>
    </div>
  );
}