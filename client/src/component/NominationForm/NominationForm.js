import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {classNames} from 'classnames';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import axios from 'axios';
var transporter=require('../../services/sendOtp')
var response =require('../../services/candidateRegistration');
const styles =theme=>( {
  appBar: {
    position: 'relative',


  },
  flex: {
    flex: 1,
  },
container:{
  paddingRight:80,
  paddingLeft:80,
  paddingTop:30,
[theme.breakpoints.down('md')]: {
      margin:0,
      paddingRight:10,
      paddingLeft:10,
    },
  },
textField:{
marginBottom:20,
},
textFieldFull:{
marginBottom:20,
width:'420px'
},
displayNone:{
  display:'none',
},
radioField:{
  marginTop:8,
  float:'right',
},
  nameDiv:{
    display:'flex',
    justifyContent:'space-around'
  },
  fieldName:{
    marginTop:10,

  },
  radioField:{
    marginTop:8,
  },
  hideButton:{
    display:'none',
  },
  radioFieldText:{
    float:'left',
    marginTop:8,
  },
  inputText:{
marginTop:'auto',
marginBottom:'auto',
  },
button:{
  height:'55px',
  marginLeft:2,
  marginBottom:25,
},
}
)
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NominationForm extends React.Component {
  state = {
    password:'',
    email:'',
    otp:'',
    post:'President',
    enterOtp:'',
    verifyButtonClick:false,
    verifyButtonText:'VERIFY EMAIL',
verifyEmail:false,
fieldEmpty:true,
  };
handleChange = name => event => {
    console.log("name of input",name);
      this.setState({ [name]: event.target.value });
      console.log(this.state);
      let totalVariable=0;
      for(var key in this.state) {
         var value = this.state[key];
         console.log("value of field",value)
         if(value.length>=1)
           totalVariable++;
           console.log("totalVariable",totalVariable);
         }
if(totalVariable==5)
   this.setState({fieldEmpty:false})
    };

    verifyEmail=()=>{
      console.log("email is ",this.state.email);
      axios.post('/rest/verifyCandidate',{email:this.state.email}).then(res=>{
        console.log("is valid",res.data.isValid);
        if(res.data.isValid)
        {
        this.setState({emailIsValid:res.data.isValid,otp:res.data.otp,verifyButtonClick:true,name:res.data.name})
        console.log("state",this.state);
      }})


    }
  handleNominationRegistration=(e)=>{
    e.preventDefault();


    console.log("handle register");

if(!this.state.fieldEmpty)
{
    response(this.state);

}    // var arr=registrationResponse.res;
    // console.log("iuysdsfdfkuk",arr.entries());
    // var arrValue=arr.values();
    // console.log(arrValue);
    // console.log("iuysdsfdfkuk",arr[Symbol.iterator]().__proto__.next);
    // console.log("type of",typeof(arr))
  }

  verifyOtp=(enterOtp)=>{
    console.log("verifyOtp button ",enterOtp);
    if(this.state.otp==this.state.enterOtp)
      {
        console.log("if statement called");
        this.setState(state=>({
          verifyEmail:!state.verifyEmail,
          verifyButtonText:'VERIFIED',
        }))
    console.log("states are",this.state);
      }
    console.log("states are after if block",this.state);
  };
  componentDidMount(){
    console.log("registration form mounted");
  }


  render() {
    var helperText;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(this.state.email) ) {
         helperText=""
    }
    else {
        helperText="please Enter a valid Email id";
    }
    const post=require("../../config/keys")
    const { classes } = this.props;
    var hideButton;
    if(this.state.verifyButtonClick)
       hideButton=classes.hideButton;
    else {
      hideButton=classes.button;
    }
     var verifyEmail;
     if(this.state.verifyButtonClick)
     {verifyEmail=
       <Grid container spacing={8} >
    <Grid item md={5} sm={5}>
    <TextField
     id="outlined-password-input"
     label="Enter Otp"
     className={classes.textField}
     type="number"
     onChange={this.handleChange('enterOtp')}
     value={this.state.enterOtp}
     margin="normal"
     variant="outlined"
     required
     disabled={this.state.verifyEmail}
    />
    </Grid>
    <Grid item md={2} sm={2} >
    <Button variant="contained" color="secondary" style={{marginTop:15}} disabled={this.state.verifyEmail} fullWidth="true" onClick={()=>this.verifyOtp(this.state.enterOtp)} className={classes.button}>
  {this.state.verifyButtonText}
 </Button>
    </Grid>
       </Grid>
     }else if(this.state.verifyEmail){
       verifyEmail=null;
     }
     else{
       verifyEmail=null;
     }
  //var verifyEmail=false;
    return (
        <Dialog
          className={classes.dialog}
          open={this.props.nominationFormOpen}
          onClose={this.props.handleNomination}
          onBackdropClick={this.handleBackdrop}
          TransitionComponent={Transition}
          fullWidth
        >
        <DialogTitle id="alert-dialog-title">Please Enter Your Details</DialogTitle>
       <Divider/>
          <form className={classes.container} noValidate autoComplete="off">


          <Typography variant="p" component='h4'  className={classes.fieldName}>
          User Email
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Email"
            className={classes.textFieldFull}
            type="email"
            value={this.state.email}
            variant="outlined"
            error={this.state.email.length<1}
            required
            onChange={this.handleChange('email')}
          />
        <Button variant="contained" disabled={!re.test(this.state.email)} color="primary"  onClick={this.verifyEmail} className={hideButton}>
        {this.state.verifyButtonText}
          </Button>

          {verifyEmail}
          <Typography variant="p" component='h4'  className={classes.fieldName}>
            Password
          </Typography>
          <TextField
           id="outlined-password-input"
           label='Password'
            error={this.state.password<1}
           //className={classes.textFieldFull}
           type="password"
           required
           variant="outlined"
           value={this.state.password}
           margin="normal"
           onChange={this.handleChange('password')}
           fullWidth
          />
          <Typography variant="p" component='h4'  className={classes.fieldName}>
            Select post
          </Typography>
          <Select
                      native
                      fullWidth
                      className={classes.textField}
                      value={this.state.post}
                      onChange={this.handleChange('post')}
                      input={
              <OutlinedInput

                name="age"
                id="outlined-age-simple"
              />
            }
                >
                      {
                        post.post.map(posts=>{
                          return(
                         <option value={posts}>{posts}</option>)
                        })
                      }
            </Select>
          </form>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleBackdrop} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Reset
              </Typography>
              <Button color="inherit" disabled={this.state.fieldEmpty} onClick={this.handleNominationRegistration} variant="contained" color="primary">
                Register
              </Button>
            </Toolbar>
          </AppBar>
        </Dialog>

    );
  }
}

NominationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
    return{
      serIsRegister:(register)=>{
        dispatch({
          type:'check',
          payload:123,
        })
      }
    }
}

function mapStateToProps(state) {
    return { userLogged: state.userLogged.userLogged };
}

export default withStyles(styles)(NominationForm);
