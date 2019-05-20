import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme=>({
  list: {
    width: 250,
    cursor:'pointer',
  },
  paper: {
    background: "#006599",
    fontColor:"white",
  },
})

class SubmenuDrawer extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

componentDidMount(){
  console.log('');
}
  render() {
    const { classes } = this.props;


    return (


        <Drawer anchor="right" open={this.props.sideDraweropen} onClose={this.props.handleMenuIcon} classes={{ paper: classes.paper }}>
          <div
            tabIndex={3}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
           style={{color:'white',fontColor:'white'}}
          >
          <div>
            <List>

                <ListItem onClick={this.props.handleVoter} style={{cursor:'pointer',color:"white"}}  >
                  <ListItemText onClick={this.props.handleNomination}>
                   Registration for Nomination
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem onClick={this.props.handleRegistration}>
                  <ListItemText primary='Registration for voter' />
                </ListItem>
            </List>
          </div>
          </div>
        </Drawer>

    );
  }
}

SubmenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmenuDrawer);
