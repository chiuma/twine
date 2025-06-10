import {   Theme } from '@material-ui/core/styles';

const styles =(theme:Theme) => ({
  popper: {
    maxWidth: "fit-content"
  },

    paperDialogClienti: { minWidth: "70%" },
    paperDialogordineDettaglio: { minWidth: "85%" },
    paperDialogColore : { minWidth: "50%" },
    paperDialogProvenienza : { minWidth: "40%" },
    paperDialogArticoli : { minWidth: "40%" },
    paperElenco: {
        width: '96%',
        height: '96%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: 10
    
      },
  
    paperFullWidth: {
      width: '100%', 
  
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