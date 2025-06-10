import React  from 'react';

 
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core';

export function ConfirmFialog(props ) {

 
    return (
  
      <Dialog
      PaperProps ={{
        style: {        borderWidth: 2,
          borderRadius: 10,
          borderColor: "#007bff",
          borderStyle: "solid",
          backgroundColor: "white" }
      }}
   
      open={true}
      onClose={() => props.handleAnnulla()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">


        
      <DialogTitle id="alert-dialog-title" >
      <Box style={{color:'red'}} fontWeight={750}>{props.title}</Box>
      </DialogTitle>
      <DialogContent>
            <DialogContentText id="alert-dialog-description" >
             <Box style={{color:'black'}}>{props.contextText}</Box>
            </DialogContentText>
          </DialogContent>
      <DialogActions>
        <Button onClick={ () => props.handleAnnulla()} color="primary"  >
          No
        </Button>
        
        <Button   autoFocus color="primary"  
                onClick={() => {
                    props.handleConfirm();
                }
              }
           >
          Si
        </Button>

      </DialogActions>
    </Dialog>
  
  
  
    )
    
  }