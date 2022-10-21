import React, { useEffect, useContext, useCallback, Component } from "react";

import Header from "./Components/Headers";
import Products from "./Components/ProductTypes/Products";
import Items from "./Components/ProductTypes/Items";
import Context from "./Context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Bank from "./Pages/Bank";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { User } from "plaid-threads";
import TimeSheet from "./Pages/TimeSheet";
import Payroll from "./Pages/Payroll";
import Reports from "./Pages/Reports";
import Project from "./Pages/Project";
import Auth from "./Auth/Auth";
import Bookkeeping from "./Pages/Bookkeeping";
import './global'
import Settings from "./Pages/Settings";
//Report Viewer source
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';
//Data-Visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
//Reports react base
import '@boldreports/react-reporting-components/Scripts/bold.reports.react.min';
import AuthenticatedRoute from "./AuthenticatedRoute";


export default class App extends Component {
  
  state ={
    UserProfile: [],
 
  }
 
  componentDidMount = () => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    axios.get('UserProfile', config).then(
      res => {
        this.setUser(res.data);
        console.log("Logged In User: ", this.state.UserProfile)
      },
      err =>{
        console.log(err);
      }
    )
  };

  setUser = UserProfile => {
    this.setState({
      UserProfile: UserProfile
    });
  }
  // <Navigate to="/home"/>
  //            window.history.pushState("", "", "/home");
  //            window.location.reload();

  render(){
    const isAuthenticated = !!localStorage.getItem("token");
  return(
  <BrowserRouter>
      <Routes>

        <Route exact path="/" element={!!isAuthenticated?<Navigate to='/home'/>: <Login UserProfile={this.state.UserProfile}  setUser={this.setUser} />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route exact path="bank" element={isAuthenticated? <Bank UserProfile={this.state.UserProfile} setUser={this.setUser}/>: <Navigate to='/'/>} />
        <Route exact path="bookkeeping" element={isAuthenticated? <Bookkeeping UserProfile={this.state.UserProfile} setUser={this.setUser}/>: <Navigate to='/'/>} />
        <Route exact path="payroll" element={<Payroll UserProfile={this.state.UserProfile} setUser={this.setUser}/>} />
        <Route exact path="reports" element={isAuthenticated? <Reports UserProfile={this.state.UserProfile} setUser={this.setUser}/>: <Navigate to='/'/>} />
        <Route exact path="home" element={isAuthenticated? <Home UserProfile={this.state.UserProfile} setUser={this.setUser} /> : <Navigate to='/'/>} />
        <Route exact path="timesheet" element={isAuthenticated? <TimeSheet UserProfile={this.state.UserProfile} setUser={this.setUser} /> :<Navigate to='/'/> } />
        <Route exact path="project" element={isAuthenticated? <Project UserProfile={this.state.UserProfile} setUser={this.setUser} /> : <Navigate to='/'/>} />
        <Route exact path="settings" element={isAuthenticated?<Settings UserProfile={this.state.UserProfile} setUser={this.setUser} />: <Navigate to='/'/>} />
        
      </Routes>
  </BrowserRouter>
  )
};
}
  

