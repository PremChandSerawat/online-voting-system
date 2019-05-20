import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {browserHistory} from 'react-router';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {response} from '../../services/voting';
import axios from 'axios';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    backgroundColor:'#006599',
    marginTop:110,
    display:'flex',
    justifyContent:'center',
    height:'500px',
    paddingLeft:0,
    paddingRight:0,
  },
  divClass1:{
    margin:10,
    opacity:0.4,
   width:'50%',
   padding:40,
   borderRadius:5,
   backgroundColor:'white',
   borderLeft:'solid',
   borderColor:'#006599',
   borderWidth:1,
  },
   display2:{
     marginTop:30,
     marginRight:5,
   },
   display1:{
     fontSize:40,
     marginTop:0,
   },
  display3:{
fontSize:30,
  },
  divClass:{
    margin:10,
   width:'50%',
   padding:40,
   borderRadius:5,
   backgroundColor:'white',
   borderLeft:'solid',
   borderColor:'#006599',
   borderWidth:1,
  },
  button: {
    padding:'auto',
    marginTop:'auto',
    marginBottom:'auto',
    fontSize:'30px',
    marginLeft:10,
    width:300,
    height:150,
    backgroundColor:'#4fc3f7',
  },
  textField:{
  marginBottom:20,
  },
  button1:{
  height:50,
  },
});

class AdminPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      post:"President",
      candidates:[],
      open:false,
    }
  }
  componentDidMount(){
    console.log("componet did mount");
    axios.post("/rest/candidateList",{post:this.state.post}).then(res=>{
      this.setState({
        candidates:res.data
      });
    })
  }
  handleVote=()=>{
  if(this.state.otp==this.state.userOtp)
    console.log("otp is right");
    console.log("state",this.state);
    axios.post('/rest/addVote',{voterEmail:this.state.voterEmail,
                                canditateEmail:this.state.canditateEmail,
                                post:this.state.post}).then(res=>{
                                  alert(res.data.massage)
                                  this.handleClose();
                                })

  }

  handleClickOpen = () => {
var otp;
    axios.post("/rest/voting",{
      voterEmail:this.state.voterEmail,
      password:this.state.password,
      post:this.state.post,
      canditateEmail:this.state.canditateEmail,
    })
      .then(response=> {
       console.log("then block of axios");
        //store.dispatch({type:'voterRegistration'
        if(response.data.otp!=0)
        {
        otp=response.data.otp;
        this.setState({ open: true,otp:otp });
      console.log("otp",otp);
    }
        })

      //})
      .catch((error)=> {
        console.log('registration fail');
        })

 };

 handleClose = () => {
   this.setState({ open: false });
 };
handleChange=name=>event=>{
  this.setState({
    [name]:event.target.value,
  }
);
this.componentDidMount();
}

  handleClick=(link)=>{
     this.props.history.push(link);
   }

  render(){
    const post=require("../../config/keys")
  const { classes } = this.props;
  return (
    <div>
    <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Please Enter OTP</DialogTitle>
              <DialogContent>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="OTP"
                  value={this.state.userOtp}
                  onChange={this.handleChange('userOtp')}
                  type="number"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleVote} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>




      <Paper className={classes.root} elevation={1} square>
     <div className={classes.divClass1}>
     <Typography component="h4"  variant="display1" className={classes.display1} style={{textAlign:'center'}}>
        Candidate Details
        </Typography>
        <Divider />
     <Typography component="h6"  variant="display3" className={classes.display3}>
        Name- Prem
        </Typography>
        <Typography component="h6"  variant="display3" className={classes.display3}>
         Gender:- Male
        </Typography>
        <Typography component="h6"  variant="display3" className={classes.display3}>
        Email:- serawatprem@gmail.com
        </Typography>
        <Typography component="h6"  variant="display3" className={classes.display3}>

        </Typography>
        <Typography component="h6"  variant="display3" className={classes.display3}>

        </Typography>
      </div>
      <div className={classes.divClass}>
      <Typography component="p" variant="p" >
        User Name
      </Typography>
      <TextField
          id="outlined-bare"
          className={classes.textField}
          defaultValue="Bare"
          //margin="normal"
          fullWidth
          variant="outlined"
          value={this.state.voterEmail}
          onChange={this.handleChange('voterEmail')}
        />
        <Typography component="p" variant="p" >
          Password
        </Typography>
     <TextField
          id="outlined-bare"
          className={classes.textField}
          defaultValue="Bare"
          //margin="normal"
          fullWidth
          type="password"
          variant="outlined"
          value={this.state.password}
          onChange={this.handleChange('password')}
        />
        <Typography component="p" variant="p" >
          Select Condidate
        </Typography>
        <Select
                    native
                    className={classes.textField}
                    value={this.state.post}
                    onChange={this.handleChange('post')}
                    onClose={this.handleChange('post')}
                    input={
            <OutlinedInput
              name="Post"
              id="outlined-age-simple"
            />
          }
              >
                    {
                      post.post.map(posts=>{
                        return(
                       <option value={posts} >{posts}</option>)
                      })
                    }
          </Select>
          <Select
                      native
                      fullWidth
                      style={{width:"65%",marginLeft:6}}
                      className={classes.textField}
                      value={this.state.canditateEmail}
                      onChange={this.handleChange('canditateEmail')}
                      //onClose={()=>this.handleCadidateDetails(this)}
                      input={
              <OutlinedInput

                name="age"
                id="outlined-age-simple"
              />
            }
                >
                      {
                        this.state.candidates.map(candidate=>{
                          console.log("candidate",candidate);
                          return(
                         <option value={candidate.email}>{candidate.name}</option>)
                        })
                      }
            </Select>
          <Button variant="contained" fullWidth color="primary" className={classes.button1} onClick={this.handleClickOpen}>
            vote
          </Button>
       </div>
      </Paper>
    </div>
  );
}
}
AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);
