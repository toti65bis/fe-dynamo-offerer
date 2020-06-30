import React, {Component, Fragment, CreateRef} from 'react';
import ReactDOM from 'react-dom';
import './Orders.css';
import DataGrid from '../../components/DataGrid'
import { html, h } from "gridjs";
import Button from '@material-ui/core/Button';
import  axios  from 'axios';
import DetailModal from '../../components/DetailModal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import orderBy from "lodash/orderBy";

const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class Orders extends Component  {
  
 
  constructor(props) {
    super(props);
    
    
    this.state = {
        columnToSort: "",
        sortDirection: "desc",
        query:'',
        columnToQuery:'document',
        pag_next:'',
        pag_prev:'',
        total_items:0,
        data: [],  
        isOpen: false,
        limit: 10,
        sort: true,
        pagination: true,
        search: true,
        pagination_filter:1,
        pagination_page:0,
        order: {},
        //columns: ['Orden #',{name:'Fecha Alta' , formatter: (_,row) => dateFormater(row.cells[1].data) } , 'Email','DOCUMENTO','Productos','Precio',
        //'Detalle'],
        //columns: ['Name', 'Language', 'Released At', 'Artist', {name: 'Actions', formatter: (_,row) => link(row.cells[1].data)}],
        //columns: ['Order', 'Creada'],
        columns: [{name:'Orden #', align:'left'},
        {name:'Fecha Alta', align:'left'},
        {name:'Email', align:'left'},
        {name:'Documento', align:'left'},
        {name:'Productos', align:'left'},
        {name:'Precio', align:'left'},
        {name:'Acciones', align:'left'}],
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
      }

      this.handleClose = this.handleClose.bind(this);
   }

 
  handleChangePage = async (newPage) => {
    this.setState({
      pagination_filter: (newPage)?newPage+1:1,
      pagination_page: (newPage)?newPage:0,
      }, async () => {
      await this.fetchOrders();
    });
  }

  handleChangeRowsPerPage = async (newLimit) => {

    this.setState({
      limit: (newLimit)?newLimit.target.value:10,
      pagination_filter: 1,
      pagination_page: 0,
      }, async () => {
      await this.fetchOrders();
    });
  
  }

  async onModalClick(id)  {
    const response = await axios.get(`${process.env.BOOKING_BASE_URL}/${id}`);
    //const response = await axios.get(`http://192.168.0.23:3000/order/${id}`);
    this.setState((state, props) => ({
        order: response.data,
        isOpen: true
    }));
  }    
         

  handleClose()  {
    
    this.setState({isOpen:false});
  };
   
   
  async fetchOrders()  {
      const response = await axios.get(`${process.env.BOOKING_BASE_URL}?pagelen=${this.state.limit}&page=${this.state.pagination_filter}&status=ENTERED`);
      this.setState((state, props) => ({
        page_next: response.data.next,
        page_prev: response.data.prev,
        total_items: response.data.total_items
    }));
      
     
      
      
      let result = [];
        
      response.data.items.map(function(order, index){
            let products = '';
            let price = 0;
           

            let documento=`${(order.customer)?order.customer.identity.type.name+':'+order.customer.identity.value:''}` 
            
            
            order.items.map(function(item, index){
                products = (products==='')?`${item.product.code}`:`${products},${item.product.code}`;
                price = price + item.price.amount; 
            })  
            
            result.push(
                  {id: order.id, 
                    created_at: (!order.customer)?'':order.created_at,   
                    email: (!order.customer)?'':order.customer.email, 
                    document: documento, 
                    products: products, 
                    quantity: (!order.customer)?order.items.length:0, 
                    price: price, actions:''});
           
      
          });
          

          this.setState((state, props) => ({
            data: result,
     
        }));

        
  }
  

  async componentDidMount() {
      await this.fetchOrders();
      this.handleChangePage();
      this.handleChangeRowsPerPage();
   
     
  }    


  handleChange = value => {
    this.setState({columnToQuery: value}
      , async () => {
      await this.fetchOrders();
    });
  };

  
  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
    <div>
           <h1>Ordenes Ingresadas</h1>
           <Select
                style={{ marginLeft: "1em" , paddingTop: "1em"}}
                label="Buscar..."
                placeholder="Buscar..."
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: event.target.value }, function(){
                     console.log("CAMBIO EL ESTADO", this.state.columnToQuery )
           
                  })
                }
              >
               
                <MenuItem value='document' >Documento</MenuItem>
                <MenuItem value='email' >Email</MenuItem>
                <MenuItem value='price' >Precio</MenuItem>
                <MenuItem value='products' >Productos</MenuItem>
                <MenuItem value='created_at' >Fecha Alta</MenuItem>
              </Select>
           <TextField
              id="standard-textarea"
              label="Buscar..."
              placeholder="Buscar..."
              value={this.state.query}
              onChange={e => this.setState({ query: e.target.value })}
              multiline 
              style={{marginBottom:"1em" , marginLeft: "1em"}}
              floatingLabelFixed
          /> 
            
          <DataGrid
           handleSort={this.handleSort}
           sortDirection={this.state.sortDirection} 
           columns={this.state.columns} 
           data= {this.state.query
           ? this.state.data.filter(x => (x[this.state.columnToQuery]) ?
                    x[this.state.columnToQuery].includes(this.state.query): null
             )
           : this.state.data}
           style={this.state.style} 
           sort={this.state.sort}
           search={this.state.search}
           pagination={this.state.pagination}
           limit={this.state.limit} 
           page={this.state.pagination_page}
           onModalClick={this.onModalClick.bind(this)}
           handleChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
           handleChangePage={this.handleChangePage.bind(this)}
           total_items={this.state.total_items}

           > 
           </DataGrid> 
           {<DetailModal isOpen={this.state.isOpen}  handleClose={this.handleClose.bind(this)}  order={this.state.order}></DetailModal>}

          
    </div>
    );
  }
}

export default Orders;
