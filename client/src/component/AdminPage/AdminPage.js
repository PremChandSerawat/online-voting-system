import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {browserHistory} from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    backgroundColor:'#006599',
    marginTop:110,
    display:'flex',
    justifyContent:'center',
    flexWrap: 'wrap',
    height:'550px',

  },
  button: {
    marginTop:'auto',
    opacity:0.8,
    marginBottom:'auto',
    fontSize:'30px',
    marginLeft:10,
    width:350,
    height:150,
    backgroundColor:'#4fc3f7',
  },
});

class  AdminPage extends React.Component {
   constructor(props){
     super(props);
     this.state={

     }
   }
componentDidMount(){
  axios.get('/rest/nominationStatus').then((res)=>{
    console.log("res data",res.data[0]);
    var nominationStatus=res.data[0].nominationStatus;
    var voting =res.data[0].voting;
    this.setState({
      nominationStatus,
      voting,
    })
  })
}

  handleClick=(link)=>{
     this.props.history.push(link);
   }

  handleNomination=(status)=>{
     console.log("click to the handd",status);
axios.post('/rest/nominationStatusChange',{nominationStatus:status}).then((res)=>{
  var nominationStatus=res.data[0].nominationStatus;
  this.setState({
    nominationStatus
  },(state)=>{
    console.log("call back function",state);
    this.state=state;
  })
  this.componentDidMount();
})
}
handleVoting=(status)=>{
   console.log("click to the handd",status);
axios.post('/rest/votingStatusChange',{voting:status}).then((res)=>{
var voting=res.data[0].nominationStatus;
this.setState({
  voting
},(state)=>{
  console.log("call back function",state);
  this.state=state;
})
this.componentDidMount();
})
}
render(){
const {classes}=this.props;
  return (

    <div>
      <Paper className={classes.root} elevation={1}>

      <Button variant="contained" color='secondary' onClick={()=>this.handleClick('/adminPage/voterList')}  className={classes.button}>
       List of Voter
     </Button>
     <Button variant="contained" color='secondary' className={classes.button} onClick={()=>this.handleClick('/adminPage/nominatorsList')}>
       List of Candidates
    </Button>

    <Button variant="contained" color='secondary'  className={classes.button} onClick={()=>this.handleNomination(this.state.nominationStatus)}>
     {this.state.nominationStatus} Nomination
   </Button>
   <Button variant="contained" color='secondary'  className={classes.button} onClick={()=>this.handleVoting(this.state.voting)}>
    {this.state.voting} Voting
  </Button>
  <Button variant="contained" color='secondary'  className={classes.button}>
   Declare Result
 </Button>
      </Paper>
    </div>
  )
}
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);
