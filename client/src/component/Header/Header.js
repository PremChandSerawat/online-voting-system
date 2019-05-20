import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CollegeIcon from './ecbImage.jpg';
const styles = theme=>({
  root: {
    flexGrow: 1,
    padding:20,
  },
  iconName:{
    zIndex:200,
    color:'#F0F8FB',
    fontWeight:700,
     fontFamily: "Times New Roman, Times, serif",
     position:'relative',
     top:60,
     marginLeft:'auto',
     marginRight:'auto',
     [theme.breakpoints.down('xs')]: {
      fontSize:"35px",
      marginLeft:'15%',

    },
  },
  icon:{
    height:'120px',
    width:'100%',
    position:'fixed',
    top:0,
    left:0,
  },

  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  menuIcon:{
    cursor:'pointer',
    position:'fixed',
    right:'15px',
    color:"white",
    top:'65px',
    height:50,
    width:40,
    zIndex:100,
    [theme.breakpoints.down('xs')]: {
      height:30,
      width:25,
      position:'fixed',
      right:'5px',
      top:'65px',
   },
  },
  menuIconButton:{
    cursor:'pointer',
    position:'fixed',
    right:'10px',
    top:'65px',
    height:50,
    width:50,
    padding:'auto',
    zIndex:100,
    [theme.breakpoints.down('xs')]: {
      height:30,
      width:25,
      position:'fixed',
      right:'5px',
      top:'65px',
   },
  },
})
class Header extends React.Component{
  componentDidMount(){
    console.log("Header form mounted");
  }
render(){
  const { classes } = this.props;
  let menuIcon;
  if(!this.props.isAdmin)
  {menuIcon=
    <IconButton className={classes.menuIconButton}>
   <MenuIcon className={classes.menuIcon} onClick={this.props.handleMenuIcon}/>
   </IconButton>
 }else{
   menuIcon=null;
 }
  return (

      <AppBar style={{height:'120px'}}>
<img src={CollegeIcon} className={classes.icon}/>
<Typography className={classes.iconName} component="h2" variant="h3" >
Election Commission
</Typography>
{
  menuIcon
}
</AppBar>

  );
}
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
