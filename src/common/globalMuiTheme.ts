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
        MuiTablePagination: {
            styleOverrides: {
              root: {
                borderTop: '1px solid rgba(224, 224, 224, 1)'
              }
            }
          },
      
        MuiTableSortLabel: {
            styleOverrides: {
              root: {
                color: theme.palette.primary.main,
                fontWeight: 'bold'
              }
            }
          },
    
          MuiTableCell: {
            styleOverrides: {
              head: {
                    color: theme.palette.primary.main,
                  fontWeight: 'bold'
              },
              root: {
                color: 'black',
                fontWeight: 'normal'
              }
            }
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                backgroundColor: '#f5f5f5',
                 fontWeight: 'bold'
              }
            }
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                    fontWeight: 'bold',
                '&:nth-of-type(odd)': {
                  backgroundColor: '#fafafa'
                }
              }
            }
          },
          MuiTableBody: {
            styleOverrides: {
              root: {
                '& .MuiTableRow-root:hover': {
                  backgroundColor: '#f0f0f0'
                }
              }
            }
          },
      
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
        root: {
          fontSize: "90%", 
          color: theme.palette.primary.main, 
          fontWeight:"bold",
          "&.MuiInputLabel-root": {
            fontSize: "90%"
          },
          "&.MuiFormLabel-root": {
            fontSize: "90%"
          }
        },
        shrink: {
          fontSize: "small", 
          color: theme.palette.primary.main, 
          fontWeight:"bold",
          whiteSpace:'nowrap'
        },
        formControl: {
          fontSize: "90%"
        }
        }
      },

 
     
      MuiToolbar:{
        styleOverrides: {
          root: {
            minHeight: '54px',
            '@media (min-width: 600px)': {
              minHeight: '40px'
            },
            '@media (min-width: 0px)': {
              minHeight: '40px'
            },
            padding:'2px 2px 2px 2px',
        
          }, 
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

      MuiBox:{
        styleOverrides: { 
        root: {
         fontSize:'50%'
        }

      }},

  
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
          [theme.breakpoints.down('sm')]: {
            padding: '4px 8px',   
            fontSize: '0.67rem'   
          }
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

      MuiTypography: {
        styleOverrides: {
          h6: {
            [theme.breakpoints.down('sm')]: {
              fontSize: '90%'
            }
          }
        }
      }
               
    },


    
  
   
}
  
   );


  export default theme;