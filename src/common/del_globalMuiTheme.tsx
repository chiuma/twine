import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    text: {
      disabled: 'black'
    },
 

    primary: {
      main: '#007bff'
    },
    secondary: {
      main: '#e3064f',
    },

    info: {
      main: '#ffffff',
    },
  },
});
 
theme = createTheme (theme,{
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1100,
      },
    }, 

 

    components: {

 

      MuiListItemText: {
        styleOverrides: {
          primary : {  
  
            
          }
        }},


      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: theme.palette.primary.main,
            color: 'white'
          }
        }},

        MuiListItemIcon: {
          styleOverrides: {
            root: {
              minWidth: '34px'
            }
          }},

      MuiTableCell: {
        styleOverrides: {
        root:
        {
            color: theme.palette.primary.main, 
            fontWeight:'bold',
            padding: '6px', 

        },
        head:
        { 
            verticalAlign:'bottom'

        },

      }
      },

      MuiAutocomplete: {
        styleOverrides: {
          root: {
        
          },
          input: {
            padding: '4px 4px 4px 1px' 
          },
          listbox: {
            
            fontSize: ".85rem",
          },
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
        backgroundColor: theme.palette.secondary.main,
        color:  'white'
          } 
        },
      },

      MuiTooltip:
      {
        styleOverrides: {
        tooltip: {
            fontSize: ".8rem",
            backgroundColor: theme.palette.primary.main,

 
          
        },
        arrow:{
          color: theme.palette.primary.main,
        },
        popperArrow: {
        
          
        
        },

        }
      },
   

 
      MuiFormHelperText: 
      {
        styleOverrides: {
          root: { 
            
            input: { 
              
            },  
            "&.Mui-error": {
              color: theme.palette.secondary.main
            }
 

        },
      } 
      },


      MuiInput: 
      {
        styleOverrides: {
          root: { 
            
            input: {padding: '4px 4px 4px 1px' },   
            "&.Mui-disabled": {
              backgroundColor: '#e7e7e7', 
              paddingLeft: '2px' 
            }
 
 

        },
      } 
      },

      MuiSelect:
      {
        styleOverrides: { 
            select: {
              padding: '4px 4px 4px 1px' ,
            
            },  
      } 
      },
     
      
      MuiTabs:
      {
        styleOverrides: { 
          indicator:  {
            backgroundColor:  theme.palette.primary.main,  
          
          }, 
      } 
      },


      MuiInputBase: 
      {
        styleOverrides: {
          root: { 
            
            input: {
              
              
            }, 

            inputProps:
            { 
              
            }, 
 
            fontSize: ".87rem",

        },
      } 
      },

       
  
    MuiFormLabel:
    {
      styleOverrides: {
      root: {
        "&.Mui-disabled": {
          color: theme.palette.primary.main
        },
        "&.Mui-error": {
          color: theme.palette.primary.main
        }
      }
    }
    },
 
      
 

      MuiCheckbox: {
        styleOverrides: {
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
      }
      },


      MuiFormControlLabel :{
        styleOverrides: {
        label: {fontSize: "small", color: theme.palette.primary.main, fontWeight:"bold"},
        }
      },

      MuiDivider:{
        styleOverrides: {
        root: {backgroundColor: 'red', color:'red' , width:'80%'}
        }
      },

      MuiFormControl:{
        styleOverrides: {
        root: {width: '100%'},
        marginNormal: {marginTop: '0'}
        }
      },

      MuiInputLabel:{
        styleOverrides: {
        shrink: {fontSize: "large", color: theme.palette.primary.main, fontWeight:"bold",whiteSpace:'nowrap',  }
        }
      },

 
    
     
      MuiToolbar:{
        styleOverrides: {
        root: {
          padding:'2 2 2 2'
        }
        }
      },


      MuiAppBar:{
        styleOverrides: {
        colorPrimary:{  backgroundColor: theme.palette.primary.main}
        },
        root: {
          backgroundColor: theme.palette.primary.main
        }

      },

  

  
      MuiLink:
      {
        styleOverrides: {
        underlineHover:
        {
          '&:hover': {
            
            textDecoration: 'none'
          },
          
        }
      }
      },
      
   
  
      MuiButton:{
        styleOverrides: {
        root: {         
          '&:focus': {            
            outline: 'none'
          } ,          
        },
        
        containedPrimary:
        {
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            textDecoration: "none",
            backgroundColor: "#056ddc",
          
            }
        }
        },  
      
      },
   
   
  
      MuiDataGrid:{
        styleOverrides: {
          

          columnHeaderTitle:
          {
            color: theme.palette.primary.main, 
            fontWeight:"bold",
            fontSize:'110%'
          },
          columnHeader  : {
           
            '&:focus-within': {
              
              outline: 'none'
            } 
          },
          root: {
            '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none',
            },
            
          footer: {
            height: '30px', 
          },
        }
 

        },  
      
      },
  
      
  
      MuiSvgIcon :{
        styleOverrides: {
          root  : {
            '&:focus': {
              
              outline: 'none'
            } 
          },
    
        },  
      
      },
               
    },
  
   
}
  
   );


  export default theme;