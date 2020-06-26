import React , {useRef, useEffect, Fragment, useState} from 'react';
import { Grid, html } from "gridjs";
import 'gridjs/dist/theme/mermaid.css'
import Button from '@material-ui/core/Button';
import DetailModal from '../components/DetailModal'


const DataGrid = (props) => {

    const wrapperRef = useRef(null);
    
    const [isOpen, setOpen] = useState(false);

  
    
   
    useEffect(() => {

       
       
        const dataToRender = []
       
        /*
        props.data.map(function (record, index){
             record.detail = thisIsMyCopy;
             dataToRender.push(thisIsMyCopy(record[1]));
        });
        */
        console.log("Estado antes del grid",dataToRender);    

        const grid = new Grid({
            columns:  props.columns,
            data: props.data,
            pagination: { limit: 10},
            sort: true,
            search: true,
            style: props.style
          });

        grid.render(wrapperRef.current);
      });

      return (<div>
     <div ref={wrapperRef} /> 
    
     
      </div>
      );
}    
  
export default DataGrid;