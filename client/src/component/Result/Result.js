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
    height:'1550px',

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
  display3:{
    color:'white',
  }
});

class  Result extends React.Component {
   constructor(props){
     super(props);
     this.state={

     }
   }

render(){
const {classes}=this.props;
  return (

    <div>
      <Paper className={classes.root} >
<Typography component="h2" variant="display3" className={classes.display3} >
Congratulation !
</Typography>

      </Paper>
    </div>
  )
}
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Result);
