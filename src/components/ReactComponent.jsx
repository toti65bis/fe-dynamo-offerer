import React from 'react';
import ReactDOM from 'react-dom';
import { 
    Grid,
    h,
    createRef as gCreateRef,
    Component as gComponent 
  } from "gridjs";

class ReactComponent extends gComponent {
    ref = gCreateRef(null);
    
    constructor(props){
        super(props)
        

    }    

    componentDidMount() {
      ReactDOM.render(this.props.element, this.ref.current);
    }
    
    render() {
      return h('div', { ref: this.ref });
    }
  }

  const grid = new Grid({
    columns: [
      'Name',
      'Email',
      'Actions'
    ],
    data: Array(5).fill().map(x => [
      'faker.name.findName()',
      'faker.internet.email()',
      h(ReactComponent, { element: <b>Boom!!</b> })
    ])
  });

  export default ReactComponent;