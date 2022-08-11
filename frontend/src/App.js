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

  render(){
  return(
  <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login UserProfile={this.state.UserProfile}  setUser={this.setUser} />} />
        <Route path="register" element={<Register />} />
        <Route exact path="bank" element={<Bank UserProfile={this.state.UserProfile} setUser={this.setUser}/>} />
        <Route exact path="bookkeeping" element={<Bookkeeping UserProfile={this.state.UserProfile} setUser={this.setUser}/>} />
        <Route exact path="payroll" element={<Payroll UserProfile={this.state.UserProfile} setUser={this.setUser}/>} />
        <Route exact path="reports" element={<Reports UserProfile={this.state.UserProfile} setUser={this.setUser}/>} />
        <Route exact path="home" element={<Home UserProfile={this.state.UserProfile} setUser={this.setUser} />} />
        <Route exact path="timesheet" element={<TimeSheet UserProfile={this.state.UserProfile} setUser={this.setUser} />} />
        <Route exact path="project" element={<Project UserProfile={this.state.UserProfile} setUser={this.setUser} />} />
      </Routes>
  </BrowserRouter>
  )
};
}
  

