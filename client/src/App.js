import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link ,Switch } from "react-router-dom";
import Header from './component/Header/Header.js';
import Footer from './component/Footer/Footer.js';
import CaroselMenu from './component/Carosel/Carosel.js';
import LoginForm from './component/LoginForm/LoginForm.js';
import AdminPage from './component/AdminPage/AdminPage.js';
import ElectionPage from  './component/ElectionPage/ElectionPage.js';
import SubmenuDrawer from './component/SubmenuDrawer/SubmenuDrawer.js';
import SimpleTable from './component/List/List.js';
import RegistrationForm from './component/Registration/Registration.js';
import NominationForm from "./component/NominationForm/NominationForm";
import CandidateList from './component/Candidatelist/CandidateList.js';
import Result from './component/Result/Result.js';
import axios from 'axios';
class App extends Component {

  state={
    adminLogin:true,
    voterLogin:false,
    registrationForm:false,
    menuIcon:false,
    isAdmin:false,
    nominationFormOpen:false,
  //  isElectionStart:false,
  };
componentWillMount(){
  window.isAdmin=false;
  axios.get("/rest/nominationStatus").then(res=>{
    console.log("admin data",res.data[0]);
    if(res.data[0].voting=='Start')
        this.setState({isElectionStart:true})
    else{
      this.setState({isElectionStart:false})
    }
  })
}


  handleAdmin = () => {
    window.isAdmin=true;
    console.log('handleAdmin');
    this.setState(state=>({
      adminLogin: !state.adminLogin,
    }));
    console.log(this.state.adminLogin);

  };
  handleNomination = () => {
    console.log('handleAdmin');
    this.setState(state=>({
      nominationFormOpen: !state.nominationFormOpen,
    }));


  };

  handleVoter = () => {
    this.setState({
      open: true,
    });
  };
  handleMenuIcon = () => {
    console.log('handleAdmin');
    this.setState(state=>({
      menuIcon: !state.menuIcon,
    }));
    console.log(this.state.adminLogin);
  };
  handleRegistration = () => {
   console.log("handle registration is called");
    this.setState(state=>({
      menuIcon:false,
      registrationForm: !state.registrationForm
    }));

  };
  render() {
    var carosel;
    if(!this.state.isElectionStart)
      {
        carosel=<CaroselMenu />;
      }else{
        carosel=<ElectionPage />
      }
    return (
      <Router>
      <div>

      <Header handleMenuIcon={this.handleMenuIcon} isAdmin={window.isAdmin}/>
      <NominationForm nominationFormOpen={this.state.nominationFormOpen} handleNomination={this.handleNomination}/>
      <Route path="/admin" exact render={(props)=>
      <LoginForm {...props} adminloginopen={this.state.adminLogin} handleAdmin={this.handleAdmin}/>
    }/>
    <Route path="/" exact render={(props)=>
      <RegistrationForm {...props} voteropen={this.state.registrationForm} handleRegistration={this.handleRegistration}/>
    }/>
    <Route path="/" render={(props)=>
    <SubmenuDrawer  sideDraweropen={this.state.menuIcon} handleMenuIcon={this.handleMenuIcon} handleRegistration={this.handleRegistration} handleNomination={this.handleNomination}/>}
    />
<Route path="/"  exact render={(props)=>
   <div style={{marginTop:120}}>
   {carosel}
  </div>
}/>
<Switch>
<Route path="/adminPage/result" exact component={Result} />
<Route path="/adminPage" exact component={AdminPage} />
<Route path="/adminPage/voterList" component={SimpleTable} />
<Route path="/adminPage/nominatorsList" component={CandidateList} />
</Switch>
<Route path="/" exact render={()=>
      <div style={{marginTop:1}}>
      <Footer />
      </div>
} />
      </div>
  </Router>
    );
  }
}

export default App;
