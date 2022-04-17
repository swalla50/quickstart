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



export default class App extends Component {
  
  state ={
    UserProfile: {},
    fullName: {}
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
        <Route path="/" element={<Login setUser={this.setUser} />} />
        <Route path="register" element={<Register />} />
        <Route path="bank" element={<Bank />} /
        ><Route path="home" element={<Home UserProfile={this.state.UserProfile} setUser={this.setUser} />} />
      </Routes>
  </BrowserRouter>
  )
};
}
  

