import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import response from '../../services/voterList';
import axios from 'axios';
var response1 =require('../../services/voterAuthHandler');
const styles = theme => ({
  root: {
    width: '100%',
    height:'100%',
    padding:10,
    marginTop: 120,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      candidates:[],
    }
  }
  componentDidMount(){
    axios.get("/rest/candidateList")
      .then(response=> {
       console.log("voterlist axios");
        //store.dispatch({type:'voterRegistration'
        console.log("response",response.data);

        this.setState({candidates:response.data});
        console.log("voters state",this.state.candidates);
        })

      //})
      .catch((error)=> {
        console.log('error',error);

      })
  }
handleStatus = (email,status)=>{
   console.log("email",email);
   console.log("status",status);
axios.post("/rest/candidateStatusChange",{email:email,status:status}).then(response=>{
console.log("database updated");
});
this.props.history.push("/adminPage/nominatorsList");
}
render(){
  const { classes } = this.props;

  return (
    <Paper className={classes.root}>
    <Typography component="h2" variant="display3" style={{textAlign:'center'}}>
         List of Candidates
     </Typography>
     <Divider />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Post</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       {
         this.state.candidates.map(
           (candidate,id)=>
             <TableRow>
             <TableCell key={id}>{candidate.name}</TableCell>
             <TableCell key={id}>{candidate.email}</TableCell>
             <TableCell key={id}>{candidate.post}</TableCell>
     <TableCell key={id}><Button variant={this.status} onClick={()=>{this.handleStatus(candidate.email,candidate.status)}} color="primary" >
     {candidate.status}</Button></TableCell>
             </TableRow>

         )
       }
        </TableBody>
      </Table>
    </Paper>
  );
}
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
