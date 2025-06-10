import React  from 'react';
 
 
import {     Box,   Button, CircularProgress,        FormControl,    Grid,    Paper } from '@material-ui/core';
 
import TextField from '@material-ui/core/TextField/TextField';
 
import { withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
 
 
import   styles   from '../common/globalStyle'
import { ConstantUtils } from '../ConstantUtils';
export interface IProps { 
    formData: any,
    error_message: string,
    handleLogin:any,
    handleChangeForm:any,
    isInProgress: boolean,

    classes: any, 

}
   
export interface IState {
    mex_letto:boolean
 
}
 

class LoginView  extends React.Component <IProps,IState> {
    
  
    constructor(props: any) {
      super(props); 
      this.setLetto  = this.setLetto.bind(this);
      this.handleLogin  = this.handleLogin.bind(this);
      this.state = { mex_letto : false };
    }
 


    componentDidMount()
    {
 
       
    }

    handleLogin( ) 
    {
      
   
 
     
        this.setState({ mex_letto : false });
        this.props.handleLogin();

 
    }

    setLetto ( )
    { 
        this.setState({ mex_letto : true });
    }


    render() {    
 //  console.log(this.state.mex_letto, this.props.error_message)
       
        
        return (

    <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center"  > 
            {!this.props.isInProgress && this.props.error_message !== "" &&  this.state.mex_letto === false && 
            <Box mt={2}>
            <Alert onClose={e=> this.setLetto () } variant="outlined" severity="error">{this.props.error_message}</Alert>
 
            </Box>
            }

            {this.props.isInProgress &&

            <Box mt={2}>
                <CircularProgress color="primary" />
            </Box>
            }
 
 
            <Box  display="flex" flexDirection="column" alignItems="center"  height="70%"  
                width="90%"
                mt={2}   justifyContent="center"  > 

<Box mb={2}  >
 
<img className="img-fluid d-block mx-auto w-100" alt="Twine" src= {ConstantUtils.url.HOME_URL +  "img/logo.png"} />
    
</Box>

                <Paper className={this.props.classes.paperElenco} variant="outlined"  >

            
                    <FormControl style={{width: '100%'}}>

                        <Grid container spacing={4} >

                        <Grid item xs={12} >
                            <TextField  size="small"  
                                InputLabelProps={{shrink: true}} 
                                InputProps={{ 
                                    classes:{
                                    root: this.props.classes.inputRoot,
                                    disabled: this.props.classes.disabled,
                                    }
                                }}
                                
                                id="email"
                                name="email"
                                label="Utente"
                                value={this.props.formData.email}   
                                onChange={this.props.handleChangeForm}    
                            />

                        </Grid>

                        <Grid item xs={12} >
                            <TextField  size="small"  
                                InputLabelProps={{shrink: true}} 
                                InputProps={{ 
                                    classes:{
                                    root: this.props.classes.inputRoot,
                                    disabled: this.props.classes.disabled,
                                    }
                                }}
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                value={this.props.formData.password}   
                                onChange={this.props.handleChangeForm}    
                            />

                        </Grid>

                        <Grid item xs={12} >
                            <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="flex-end" width="100%">
                            {this.props.formData.password !== "" && this.props.formData.email !== "" &&
                            <Button onClick={this.handleLogin}   size="small" color="primary" variant="contained" >
                            Login
                            </Button>
                            }
                            </Box>
                        </Grid>

                        </Grid>
                    </FormControl>


               </Paper>
            </Box>
  
 

        </Box>
     
    )}

 
}

 
 
 


export default withStyles(styles) (LoginView);