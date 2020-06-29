import React, {Component, Fragment, CreateRef} from 'react';
import ReactDOM from 'react-dom';
import './Orders.css';
import DataGrid from '../../components/DataGrid'
import { html, h } from "gridjs";
import Button from '@material-ui/core/Button';
import  axios  from 'axios';
import DetailModal from '../../components/DetailModal';




class Orders extends Component  {
  
 
  constructor(props) {
    super(props);
    
   
    
    function email(data) {
      return html(`<a href='mailto:${data}'>Email</a>`);
    }

    function link(data) {
      return html(`<a href='#' onclick='this.onModalClick(${data})'>Detail</a>`);
    }
   
   
  
    
    this.state = {
        //ref: CreateRef(null),
        data: [],  
        isOpen: false,
        limit: 10,
        sort: true,
        pagination: true,
        search: true,
        page:1,
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

  

  async onModalClick(id)  {
    const response = await axios.get(`http://localhost:3000/order/${id}`);
    this.setState((state, props) => ({
        order: response.data,
        isOpen: true
    }));
  }    
         

  handleClose()  {
    
    this.setState({isOpen:false});
  };
   
   
  async fetchOrders()  {
      const response = await axios.get(process.env.BOOKING_BASE_URL);
      let result = [];
      response.data[0].items.map(function(order, index){
            let products = '';
            let price = 0;
            let documento=`${order.customer.identity.type.name}:${order.customer.identity.value}` 
            order.items.map(function(item, index){
                products = (products==='')?`${item.product.code}`:`${products},${item.product.code}`;
                price = price + item.price.amount; 
            })  
            result.push(
              {id: order.id, 
                created_at: order.created_at, 
                email:order.customer.email, 
                document: documento, 
                products: products, 
                price: price, actions:''});

           
      
          });
      this.setState({data: result
          })    
  }
  

  async componentDidMount() {
      await this.fetchOrders();
  }    

  
  render() {
    return (
    <div>
           <h1>This is Orders</h1> 
           <DataGrid 
           columns={this.state.columns} 
           data={this.state.data}  
           style={this.state.style} 
           sort={this.state.sort}
           search={this.state.search}
           pagination={this.state.pagination}
           limit={this.state.limit} 
           page ={this.state.page}
           onModalClick={this.onModalClick.bind(this)}
           > 
           </DataGrid>
           <DetailModal isOpen={this.state.isOpen}  handleClose={this.handleClose.bind(this)}  order={this.state.order}></DetailModal> 

          
    </div>
    );
  }
}

export default Orders;
