import React, {Component, Fragment} from 'react';
import './Orders.css';
import DataGrid from '../../components/DataGrid'
import { html } from "gridjs";
import Button from '@material-ui/core/Button';
import DetailModal from '../../components/DetailModal'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Orders extends Component {

 
  constructor(props) {
    super(props);

    function email(data) {
      return html(`<a href='mailto:${data}'>Email</a>`);
    }

    
    this.state = {
        isOpen: false,
        page: 1,
        records_per_page: 10,
        total_records: 0,
        columns: ['Name', 'Email', 'Phone Number',
        {name: 'Actions',
         formatter: (_, row) => email(row.cells[1].data)}],
        style: {
          table: {
            border: '3px solid #ccc'
          },
          th: {
            'background-color': '#ff5722',
            color: 'white',
            'border-bottom': '3px solid #ccc',
            'text-align': 'center'
          },
          td: {
            'text-align': 'center'
          }
        },  
        data: [ 
                ['John', 'john@example.com', '(353) 01 222 3333', ''],
                ['Mark', 'mark@gmail.com', '(01) 22 888 4444',  '']
              ]
          
        
        
      }

      this.handleClose = this.handleClose.bind(this);
   }

  onModalClick()  {
    this.setState({isOpen:true});
  }

  handleClose()  {
    
    this.setState({isOpen:false});
  };
   
   

  componentDidMount() {

    
    this.setState({
        data: [
        ['John', 'john@example.com', '(353) 01 222 3333', ''],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444',  '']
      ]
    });
    

   

  }

  
  render() {
    return (
    <div>
           <h1>This is Orders</h1> 
           <DataGrid columns={this.state.columns} data={this.state.data}  style={this.state.style}></DataGrid>
           {/* <DetailModal isOpen={this.state.isOpen}></DetailModal> */}
           <Dialog
        open={this.state.isOpen}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
           <Button onClick={() => this.onModalClick()}>Modal</Button>
    </div>
    );
  }
}

export default Orders;
