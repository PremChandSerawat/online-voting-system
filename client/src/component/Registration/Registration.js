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
import axios from 'axios';
var transporter=require('../../services/sendOtp')
var response =require('../../services/Registration');
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
marginBottom:30,
},
textFieldFull:{
marginBottom:20,
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
  marginTop:15,
  marginBottom:20,
},
dialog:{

},
}
)
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class RegistrationForm extends React.Component {
  state = {
    name:'',
    enrNo:'',
    password:'',
    gender:'male',
    email:'',
    otp:'',
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
         if(value.length>1)
           totalVariable++;


       }
console.log("state",this.state);
console.log("totalVariable",totalVariable);
if(totalVariable==7)
this.setState({fieldEmpty:false})
else {
  this.setState({fieldEmpty:true})
}
    };

    handleVerifyEmail=(email)=>{
      console.log("email is ",email)
      var otp =Math.floor(Math.random() * 100000);
      console.log("otp is ",otp);
      axios.post("/rest/sendOtp",{email:email,otp:otp}).then((res)=>{
        console.log("massage send succefuly")
      }).catch(error=>{
        console.log("error",error)
      })
      this.setState({otp:otp,
      verifyButtonClick:true,});
    }
  handleRegistration=(e)=>{
    e.preventDefault();


    console.log("handle register");

if(!this.state.fieldEmpty)
{
    response(this.state);
    this.props.handleRegistration()
}    // var arr=registrationResponse.res;
    // console.log("iuysdsfdfkuk",arr.entries());
    // var arrValue=arr.values();
    // console.log(arrValue);
    // console.log("iuysdsfdfkuk",arr[Symbol.iterator]().__proto__.next);
    // console.log("type of",typeof(arr))
  }
  handleBackdrop=()=>{
    this.setState({
      name:'',
      enrNo:'',
      password:'',
      gender:'m',
      email:'',
      enterOtp:'',
      otp:'',

  verifyEmail:false,
    })
    this.props.handleRegistration();
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
    <Grid item md={10} sm={10}>
    <TextField
     id="outlined-password-input"
     label="Enter Otp"
     className={classes.textFieldFull}
     type="number"
     onChange={this.handleChange('enterOtp')}
     value={this.state.enterOtp}
     margin="normal"
     variant="outlined"
     required
     disabled={this.state.verifyEmail}
     fullWidth
    />
    </Grid>
    <Grid item md={2} sm={2} >
    <Button variant="contained" color="secondary" disabled={this.state.verifyEmail} fullWidth="true" onClick={()=>this.verifyOtp(this.state.enterOtp)} className={classes.button}>
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
          open={this.props.voteropen}
          onClose={this.props.handleBackdrop}
          onBackdropClick={this.props.handleRegistration}
          TransitionComponent={Transition}
          fullWidth
        >
          <form className={classes.container}  autoComplete="off">


          <Typography variant="p" component='h4'  className={classes.fieldName}>
          Full Name
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Name"
            className={classes.textFieldFull}
            type="text"
            //value={this.state.name}
            variant="outlined"
            fullWidth
            error={this.state.name.length<1}
            required
            onChange={this.handleChange('name')}
          />
           <Grid container spacing={8}>
           <Grid item xs={2}>
           <Typography variant="p" component='h4' className={classes.radioField}>
             Gender
           </Typography>
           </Grid>
           <Grid item xs={3}>
           <Typography variant="h6" component='p'  className={classes.radioFieldText}>
             Male
           </Typography>
           <Radio
            checked={this.state.gender === 'male'}
            onClick={this.handleChange('gender')}
            value="male"
            color="secondary"
            name="radio-button-demo"
            aria-label="D"
          />
           </Grid>
           <Grid item xs={3}>
           <Typography variant="h6" component='p'  className={classes.radioFieldText}>
             Female
           </Typography>
           <Radio
           checked={this.state.gender === 'female'}
            onClick={this.handleChange('gender')}
            value="female"
            color="secondary"
            name="radio-button-demo"
            aria-label="D"
          />

           </Grid>
           </Grid>
          <Typography variant="p" component='h4'  className={classes.fieldName}>
            Email Id
          </Typography>
          <TextField
          disabled={this.state.verifyEmail}
           id="outlined-password-input"
           label='Email Id'
           error={this.state.email<1}
           className={classes.textFieldFull}
           type="email"
           required
           helperText={helperText}
           autoComplete="current-email"
           variant="outlined"
           value={this.state.email}
           onChange={this.handleChange('email')}
           fullWidth
          />

          <Button variant="contained" disabled={!re.test(this.state.email)} color="primary" fullWidth="true" onClick={()=>this.handleVerifyEmail(this.state.email)} className={hideButton}>
        {this.state.verifyButtonText}
          </Button>

          {verifyEmail}

          <Typography variant="p" component='h4'  className={classes.fieldName}>
            Enrollment No
          </Typography>
          <TextField
           id="outlined-password-input"
           label="Enrollment No"
           className={classes.textFieldFull}
           type="text"
           error={this.state.enrNo<1}
           value={this.state.enrNo}
           onChange={this.handleChange('enrNo')}
           autoComplete="current-password"
           required
           variant="outlined"
           fullWidth
          />
          <Typography variant="p" component='h4'  className={classes.fieldName}>
            Password
          </Typography>
          <TextField
           id="outlined-password-input"
           label='Password'
            error={this.state.password<1}
           className={classes.textFieldFull}
           type="password"
           required
           variant="outlined"
           value={this.state.password}
           onChange={this.handleChange('password')}
           fullWidth
          />
          </form>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleBackdrop} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Reset
              </Typography>
              <Button color="inherit" disabled={this.state.fieldEmpty} onClick={this.handleRegistration} variant="contained" color="primary">
                Register
              </Button>
            </Toolbar>
          </AppBar>
        </Dialog>

    );
  }
}

RegistrationForm.propTypes = {
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

export default withStyles(styles)(RegistrationForm);
