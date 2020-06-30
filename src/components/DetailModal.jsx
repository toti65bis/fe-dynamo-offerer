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
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const StyledCardHeader = withStyles((theme) => ({
  root: {
    backgroundColor: '#ff5722',
    color: theme.palette.common.white,
    fontWeight: 'bold' 
  },
 
}))(CardHeader);


const StyledDialogTitle = withStyles((theme) => ({
  root: {
    backgroundColor: '#ff5722',
    color: theme.palette.common.white,
    fontWeight: 'bold' 
  },
 
}))(DialogTitle);

const StyledChip = withStyles((theme) => ({
  root: {
    backgroundColor: '#ff5722',
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
  root: {
    backgroundColor: 700,
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
    <MuiThemeProvider>
      <div>
          <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth={true}
            maxWidth={'md'}
          >
            <Paper elevation={3}>
              <StyledDialogTitle   id="responsive-dialog-title">
                      {`Orden #${(props.order)?props.order.id:''}`}
              </StyledDialogTitle>
              <DialogContent dividers>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Paper>
                              
                            <Card>
                              <CardContent>
                                <CardHeader title="Productos" 
                                 style={{ backgroundColor:'#ff5722' , }
                                }
                                titleColor='white'
                                titleStyle={{textAlign: 'center', fontWeight: 'bold',  fontStyle: 'italic' }}                          
                                />
                            
                                {  console.log("ORDER: ",props.order)}
                                {
                                    (props.order.items) && (
                                        props.order.items.map( item => (
                                            <List>
                                                <ListItem>
                                                    <ListItemText primary={`Codigo: ${item.product.title}`} secondary={`Cantidad:${props.order.items.length}`} >
                                                    </ListItemText>
                                                    <ListItemText primary={item.price.amount} secondary={`Total a Pagar en ${item.price.currency.iso_code}`} >
                                                          
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        ))
                                    )
                                }
                            </CardContent>
                            </Card>
                          </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                          <Paper>
                          <Card>
                              <CardContent>
                                <CardHeader title="Vendedor" 
                                 style={{ backgroundColor:'#ff5722' , }
                                }
                                titleColor='white'
                                titleStyle={{textAlign: 'center', fontWeight: 'bold',  fontStyle: 'italic' }}                          
                                />
                            <List>
                                <ListItem>
                                      <ListItemText primary={(props.order.collaborator)?props.order.collaborator.sid:''} secondary={`Codigo Vendedor`} >
                                      </ListItemText>
                                </ListItem>
                            </List>
                            </CardContent>
                            </Card> 
                          </Paper>
                        </Grid>
                          <Grid item xs={12} sm={6}>
                          <Paper>
                          <Card>
                              <CardContent>
                                <CardHeader title="Titular" 
                                 style={{ backgroundColor:'#ff5722' , }
                                }
                                titleColor='white'
                                titleStyle={{textAlign: 'center', fontWeight: 'bold',  fontStyle: 'italic' }}                          
                                />
                            <List>
                                      <ListItem>
                                          <ListItemText primary={(props.order.customer)?props.order.customer.last_name +' '+props.order.customer.first_name:''} secondary='Nombre'>
                                          </ListItemText>
                                      </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                    {/*   <ListItem>
                                          <ListItemText primary={(props.order.customer.identity)?props.order.customer.identity.value:''} secondary={(props.order.customer)?props.order.customer.identity.type.name:''}>
                                          </ListItemText>
                                      </ListItem> */}
                                      <Divider variant={'inset'} component={'li'} />
                                      <ListItem>
                                          <ListItemText primary={`${(props.order.customer)?props.order.customer.email:''}`} secondary={'Email'}>
                                          </ListItemText>
                                      </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                      <ListItem>
                                          <ListItemText primary={`${(props.order.customer)?props.order.customer.gender:''}`} secondary={'Sexo'}>
                                          </ListItemText>
                                      </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                      <ListItem>
                                          <ListItemText primary={`${(props.order.customer)?props.order.customer.birth_date:''}`} secondary={'Fecha de Nacimiento'}>
                                          </ListItemText>
                                      </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                      <ListItem>
                                          <ListItemText primary={`${(props.order.customer)?props.order.customer.nationality.name:''}`} secondary={'Nacionalidad'}>
                                          </ListItemText>
                                      </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                      <ListItem>
                                          <ListItemText primary={`${(props.order.customer)?props.order.customer.type:''}`} secondary={'Tipo de Persona'}>
                                          </ListItemText>
                                      </ListItem>
                            </List>          
                             </CardContent>
                             </Card>           
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Paper>
                          <Card>
                              <CardContent>
                                <CardHeader title="Domicilio" 
                                 style={{ backgroundColor:'#ff5722' , }
                                }
                                titleColor='white'
                                titleStyle={{textAlign: 'center', fontWeight: 'bold',  fontStyle: 'italic' }}                          
                                />
                              <List>
                                  <ListItem>
                                      <ListItemText primary={(props.order.customer)?props.order.customer.address.street:''} secondary={'Calle'}>
                                          </ListItemText>
                                  </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                  <ListItem>  
                                      <ListItemText primary={(props.order.customer)?props.order.customer.address.number:''} secondary={'Numero'}>
                                      </ListItemText>
                                  </ListItem>   
                                      <Divider variant={'inset'} component={'li'} />
                                  <ListItem>  
                                      <ListItemText primary={(props.order.customer)?props.order.customer.address.floor:''} secondary='Piso'>
                                      </ListItemText>
                                  </ListItem>
                                      <Divider variant={'inset'} component={'li'} />
                                  <ListItem>      
                                      <ListItemText primary={(props.order.customer)?props.order.customer.address.door:''} secondary='Departamento'>
                                      </ListItemText>
                                  </ListItem>  
                                      <Divider variant={'inset'} component={'li'} />
                                  <ListItem>      
                                      <ListItemText primary={(props.order.customer)?props.order.customer.address.zip_code:''} secondary='Codigo Postal'>
                                      </ListItemText>
                                  </ListItem> 
                                      <Divider variant={'inset'} component={'li'} /> 
                                  <ListItem>      
                                      <ListItemText primary={(props.order.customer)?props.order.customer.address.city:'Ciudad'} secondary={(props.order.customer)?props.order.customer.address.state:'Provincia'}>
                                      </ListItemText>
                                  </ListItem> 
                                  <ListItem>      
                                      <ListItemText primary='Ciudad' secondary='Provincia'>
                                      </ListItemText>
                                  </ListItem> 
                            </List>      
                          </CardContent>
                          </Card>
                        </Paper>
                        
                        </Grid>
                      
                        </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={props.handleClose} color="primary" autoFocus>
                  Cerrar
                </Button>
              </DialogActions> 

            </Paper>
      
          </Dialog>
    </div>
    </MuiThemeProvider>
  );
}