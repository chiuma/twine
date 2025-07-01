import React  from 'react';
import { TextField, Box, Button, CircularProgress, FormControl, Grid, Paper } from '@mui/material';
import Alert from '@mui/material/Alert'; 
import { withStyles } from '@mui/styles';
import styles from '../common/globalStyle';
 
import { CustomComponents } from '../utils/CustomComponents';

export interface IProps { 
    formData: any,
    formDataError: any,
    handleExecChangePwd:any,
    handleChangeForm:any,
    isInProgress: boolean,

    classes: any, 

}
   
export interface IState { 
 
}
 

class ChangePassword  extends React.Component <IProps,IState> {
    
  
    constructor(props: any) {
      super(props);  
      this.state = {   };
    }
 


    componentDidMount()
    {
 
       
    }

 

 

    render() {    
 
 
        return (

    <Box  display="flex" flexDirection="column" alignItems="center"  justifyContent="center"  > 
 

            {this.props.isInProgress &&

            <Box mt={2}>
                <CircularProgress color="primary" />
            </Box>
            }
 
 
            <Box  display="flex" flexDirection="column" alignItems="center"  height="70%"  
                 width={{ xs: '80%', sm: '65%' , md: '60%', lg: '50%', xl: '40%',}}
                mt={2}   justifyContent="center"  > 

 

                <Paper className={this.props.classes.paperElenco} variant="outlined"  >

            
                    <FormControl style={{width: '100%'}}>

                        <Grid container spacing={4} >

                        <Grid item xs={12} > 
                            <CustomComponents.CustomTextField   
                                id="username"
                                name="username"
                                label="Username"
                                value={this.props.formData.username}   
                                onChange={(e) => null}    
                            />

                        </Grid>

                        <Grid item xs={12} >
                            <CustomComponents.CustomTextField   
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                value={this.props.formData.password}   
                                onChange={this.props.handleChangeForm}    
                                error={this.props.formDataError.password !== ""}
                                helperText={this.props.formDataError.password} 
                            />

                        </Grid>

                        <Grid item xs={12} >
                            <CustomComponents.CustomTextField   
                                type="password"
                                id="new_password"
                                name="new_password"
                                label="Nuova password"
                                value={this.props.formData.new_password}   
                                onChange={this.props.handleChangeForm}    
                                error={this.props.formDataError.new_password !== ""}
                                helperText={this.props.formDataError.new_password} 
                            />

                        </Grid>

                        <Grid item xs={12} >
                            <CustomComponents.CustomTextField   
                                type="password"
                                id="ripeti_pwd"
                                name="ripeti_pwd"
                                label="Ripeti password"
                                value={this.props.formData.ripeti_pwd}   
                                onChange={this.props.handleChangeForm}    
                                error={this.props.formDataError.ripeti_pwd !== ""}
                                helperText={this.props.formDataError.ripeti_pwd} 
                            />

                        </Grid>
                        <Grid item xs={12} >
                            <Box  display="flex" flexDirection="row" alignItems="center"  justifyContent="flex-end" width="100%">
                            {this.props.formData.password !== "" && this.props.formData.email !== "" &&
                            <Button onClick={this.props.handleExecChangePwd}   size="small" color="primary" variant="contained" >
                            Cambia 
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

 
 
 
export default withStyles(styles) (ChangePassword) ;
 