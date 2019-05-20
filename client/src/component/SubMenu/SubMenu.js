import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
     position:'fixed',
     top:120,
     zIndex:400,
     width:'100%',
     display:'flex',
     paddingRight:300,
     paddingLeft:300,
     color:'blue',
     justifyContent: 'space-between',
     [theme.breakpoints.down('sm')]: {
       position:'fixed',
       top:100,
       zIndex:400,
       width:'100%',
       display:'flex',
       color:'blue',
       justifyContent: 'space-between',
    },
  },
  menuBar:{
    color:"#2196f3",
    cursor:'pointer',
  },
});

class SubMenu extends React.Component {

render() {
  const { classes } = this.props;

  return (

      <Paper className={classes.root} elevation={1} square='true'>
        <Typography variant="h4" component="h3" className={classes.menuBar} onClick={this.props.handleAdmin}>
          Admin
        </Typography>
        <Typography variant="h4" component="h3" className={classes.menuBar}>
          Voter
        </Typography>

        <Typography variant="h4" component="h3" className={classes.menuBar} onClick={this.props.handleRegistration}>
          Registration
        </Typography>

      </Paper>

  );
}
}
SubMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubMenu);
