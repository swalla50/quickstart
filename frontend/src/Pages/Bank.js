import React, { useEffect, useContext, useCallback, Component } from "react";

import Header from "../Components/Headers";
import Products from "../Components/ProductTypes/Products";
import Items from "../Components/ProductTypes/Items";
import Context from "../Context";
import Canvas from "../Components/Canvas";
import PlaidLink from "../Components/PlaidLink";
import { Router, Route, Navigate, Routes, useNavigate} from 'react-router-dom';
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Bank.css'



export default class Bank extends Component {
  handleLogout= () => {
    localStorage.clear();
    this.props.setUser(null);
    
  }
  logout(){
    localStorage.removeItem('token');
    }
  
    
    render(){
      if(localStorage.getItem('token')==null){
        return(
        <Navigate  to ="/"/>
        )
      }
      else {
      let navItemList;
      
    
        navItemList = (
          <><li className='nav-list'>  <FontAwesomeIcon icon={faBriefcase} size='2x' /> <a href="home" className="nav-links">Business Overview</a> </li><li className='nav-list'>  <FontAwesomeIcon icon={faBuildingColumns} size='2x' /> <a className="nav-links" href="bank">Banking</a> </li><li className='nav-list'> <FontAwesomeIcon icon={faMoneyBill1Wave} size='2x' />  <a href="payroll" className="nav-links"> Payroll </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faReceipt} size='2x' /> <a className="nav-links">Bookkeeping </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faClock} size='2x' />  <a href="timesheet" className="nav-links">Time Sheet</a></li><button className='nav-list' onClick={this.handleLogout}> Logout </button></>
        )
    return (
      <Canvas fullName={this.props.UserProfile.fullName} navItems = {navItemList} userPic={`https://webapi20220126203702.azurewebsites.net/Images/${this.props.UserProfile.userPic}`}>
            <PlaidLink/>
        </Canvas>
    );
  }
}
}

