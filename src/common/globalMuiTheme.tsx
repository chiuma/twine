
import {     createMuiTheme,     } from '@material-ui/core';
const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
  



    overrides: {  
    
 

      MuiTooltip:
      {
        tooltip: {
         
            color: "white",
            backgroundColor:"#3e84d1",
            fontSize: ".8rem",
  
          
        }
      },
      
 
      MuiInputBase: 
      {
        root: {
          "&.Mui-disabled": {
            color: "#999999"
          }, 
        }
      },
 
      
    MuiFormLabel:
    {
      root: {
        "&.Mui-disabled": {
          color: "#707070"
        },
        "&.Mui-error": {
          color: "#007bff"
        }
      }
    },
 



      MuiCheckbox: {
        colorSecondary: {
          color: "grey",
          "&:hover": {
            color: "#00b5e5"
          },
          "&$checked": {
            color: "#00b5e5",
            "&:hover": {
              color: "lightblue"
            },
            "&.Mui-focusVisible": {
              color: "red"
            }
          },
          "&.Mui-focusVisible": {
            color: "white"
          } 
        }
      },


      MuiFormControlLabel :{
        label: {fontSize: "small", color:'#007bff', fontWeight:"bold"},
      },

      MuiDivider:{
        root: {backgroundColor: 'red', color:'red' , width:'80%'}
      },

      MuiFormControl:{
        root: {width: '99%'},
        marginNormal: {marginTop: '0'}
      },

      MuiInputLabel:{
        shrink: {fontSize: "large", color:'#007bff', fontWeight:"bold",whiteSpace:'nowrap'}
      },

      MuiTableCell: {
        head:{fontWeight: 'bold', color: "#007bff",},
        
        sizeSmall : {paddingRight: 1}
      },
    
      MuiTypography:  {
          colorPrimary : { color: "#007bff"}
      },

   


      MuiTableSortLabel: {
        root: {
          "&$active": {
            color:'#007bff'
            },

            'font-weight': 'bold',
            color:'#007bff'
        } 
      },

      MuiAppBar:{
        colorPrimary:{  backgroundColor: '#007bff'}

      },

  

  
      MuiLink:
      {
        underlineHover:
        {
          '&:hover': {
            
            textDecoration: 'none'
          },
          
        }
      },
      
   
  
      MuiButton:{
        root: {
          '&:focus': {
            
            outline: 'none'
          } 
        },
  
 

        containedPrimary:
        {
          backgroundColor: '#007bff',
          "&:hover": {
            textDecoration: "none",
            backgroundColor: "#056ddc",
          
            }
        }
  
      
      },
   
   
  
   
  
   
               
    },
  
   
  
  
  });


  export default theme;