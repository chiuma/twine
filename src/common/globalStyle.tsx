const styles =(theme:any) => (  {
  popper: {
    maxWidth: "fit-content"
  },

    paperDialogClienti: { minWidth: "70%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "95%"
      } },
    paperDialogordineDettaglio: { minWidth: "85%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "95%"
      }},
    paperDialogColore : { minWidth: "50%",
      [theme.breakpoints.down('sm')]: {
        minWidth: "90%"
      }
     },
    paperDialogProvenienza : { minWidth: "40%"  ,  
      [theme.breakpoints.down('sm')]: {
      minWidth: "90%"
    }},
    paperDialogArticoli : { minWidth: "40%" ,  
      [theme.breakpoints.down('sm')]: {
      minWidth: "90%"
    }},
    paperElenco: {
        width: '96%',
        height: '96%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: 10,
        [theme.breakpoints.up('sm')]: {
          width: "96%"
        },
        [theme.breakpoints.up('md')]: {
          width: "85%"
        },
        [theme.breakpoints.up('lg')]: {
          width: "80%"
        },
        [theme.breakpoints.up('xl')]: {
          width: "70%"
        }
    
      },
      paperElencoSmall: { 
        height: '96%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: 10,
        [theme.breakpoints.up('sm')]: {
          width: "90%"
        },
        [theme.breakpoints.up('md')]: {
          width: "75%"
        },
        [theme.breakpoints.up('lg')]: {
          width: "65%"
        },
        [theme.breakpoints.up('xl')]: {
          width: "55%"
        }
    
      },
    paperFullWidth: {
      width: '100%', 
  
    },
  
  menuList: {
    width: 'auto',
    color:'white',
 
  },

    inputRoot: {
        '&$disabled': { 
          backgroundColor:'#e4e4e4',
          color: 'black'
        } 
    }, 
    disabled: {},
  

 
    root: {
      flexGrow: 1,
      width: '100%', 
 
    } ,

    title: {
        flexGrow: 1, 
      },

})  

  export default styles