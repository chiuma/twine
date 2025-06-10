import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';

 

export function NumberFormatCustom(props: any) {
  

  return (
    
    <NumberFormat
    customInput={TextField}
    prefix="€ "
     
        isNumericString={true}
      {...props}

      onFocus={ e => { 
          e.target.select(); 
          if (props.onFocus) props.onFocus(Object.assign({}, e));
        }}  
 
      onChange={e => {         
        if(props.onChange) {
          let newTarget = {name: e.target.name , value: parseFloat( e.target.value.replace("€ ","")) }
          let newEvent:any =   Object.assign({}, e, { target: newTarget });
          props.onChange(newEvent);
        } 
        
        }}    

      onBlur={e => { 
         
        if(props.onChange) 
        {
          let sValue =   (Math.round(Number(e.target.value.replace("€ ","")) * 100) / 100).toFixed(2)    ;
          let newEvent:any =   Object.assign({}, e); 
          newEvent.target = {name: props.name, value: parseFloat( sValue)  };    
          props.onChange(newEvent);
        }
      }}
    />
  );
}