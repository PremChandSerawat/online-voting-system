import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
var admin=require('../../config/keys')
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,

  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    overflow:'hidden',
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       open: props.open,
       password:'',
     };
  console.log(this.state.open);
   }
  redirectToMain=()=>{
    this.props.handleAdmin();
    this.props.history.push('/');
  }

componentDidUpdate(){
  console.log(this.state);
}
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
checkPassword=()=>{
  console.log("admin password",this.state.password);

if(admin.adminPassword==this.state.password)
{
  console.log("password match");
this.props.history.push('/adminPage');
}
else{
  console.log("password don't match");
}
}
  handleClose = () => {
    this.setState({ open: false });
  };
handleChange=(event)=>{
  this.setState({
    password:event.target.value,
  })
}
  render() {
    return (
      <div>

        <Dialog
          onClose={this.props.handleAdmin}
          aria-labelledby="customized-dialog-title"
          fullWidth='true'
          open={this.props.adminloginopen}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.props.handleAdmin}>
            Please Enter Password
          </DialogTitle>
          <DialogContent>
          <TextField
        id="outlined-full-width"
        label="Admin"
        style={{ margin: 8 }}
        placeholder="Password"
        onChange={this.handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.redirectToMain} color="secondary" variant="contained">
              Cancle
            </Button>
            <Button onClick={this.checkPassword} color="primary" variant="contained">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomizedDialogDemo;
