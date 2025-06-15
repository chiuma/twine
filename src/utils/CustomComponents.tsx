import { Box, Dialog, DialogActions, DialogContent, CircularProgress, IconButton, DialogContentText, DialogTitle  , TextField , Autocomplete,   Checkbox, FormControlLabel, FormHelperText, MenuItem, Typography, Button, Modal, Accordion, AccordionDetails, AccordionSummary, Container, InputAdornment } from '@mui/material';
 
 
import NumberFormat from 'react-number-format';

function CustomCheckbox({ validationMex="",   ...props    }) {
  //  console.log(props.label, props)
 
    return (
      <>
        <FormControlLabel
          label={<Typography variant="body2" color="primary"  
            fontSize="70%"
                         fontWeight={"bold"}>{props.label} </Typography>}
          labelPlacement="top" 
          control={
                  <Checkbox 
                    style={{  padding:  '1px 2px 0px 5px'  }}
                    size="small"  
                    checked={props.value === true} 
                    {...props}               
                        />
                  }
        /> 
        {validationMex !== "" &&
          <Box>
            <FormHelperText style={{color: 'red'}}>{validationMex}  </FormHelperText> 
          </Box>
        }

      </>
     
    );
  }
function NumberFormatCustom(props: any) {
  

  return (
    
    <NumberFormat
    customInput={TextField}
    prefix="€ "
     variant="standard"
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

 


 function CustomTextField (props) {
 
 
 
     return (
       <TextField
         variant="standard"
         size="small"  
 
         InputLabelProps={{  shrink: true }} 
   
         { ...props  }

       />
       
     );
}

 function CustomAutocomplete ({ label, ...props }: { label: string } & any) {
 
 
      return (
       <Autocomplete
         variant="standard"
         size="small"  
        renderInput={(params) => <TextField {...params}  variant="standard"
          InputLabelProps={{ shrink: true }} 
         label={label} margin="normal" />}

         clearOnEscape
         { ...props  }
       />
  );
}
export const CustomComponents = {
    CustomTextField  ,
    NumberFormatCustom,
    CustomAutocomplete,
  CustomCheckbox 
}