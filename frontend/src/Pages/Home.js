import React, { Component } from 'react'
import axios from 'axios'
import Login from './Login';
import Canvas from '../Components/Canvas';
import { Router, Route, Navigate, Routes, useNavigate} from 'react-router-dom';
import './Home.css'
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Home extends Component{
  

  state={}
logout(){
localStorage.removeItem('token');
<Navigate to='/'/>
}

handleLogout= () => {
  localStorage.clear();
  this.props.setUser(null);
  <Navigate to='/'/>
  
}

 render(){
  if(localStorage.getItem('token')==null){
    return(
    <Navigate  to ="/"/>
    )
  }
  else{
  let navItemList;
  

    navItemList = (
      <><li className='nav-list'>  <FontAwesomeIcon icon={faBriefcase} size='2x' /> <a href="home" className="nav-links">Business Overview</a> </li><li className='nav-list'>  <FontAwesomeIcon icon={faBuildingColumns} size='2x' /> <a className="nav-links" href="bank">Banking</a> </li><li className='nav-list'> <FontAwesomeIcon icon={faMoneyBill1Wave} size='2x' />  <a href="payroll" className="nav-links"> Payroll </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faReceipt} size='2x' /> <a className="nav-links">Bookkeeping </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faClock} size='2x' />  <a href="timesheet" className="nav-links">Time Sheet</a></li><button href='/' className='nav-list' onClick={this.handleLogout}> Logout </button></>
    )
  
  
   return (
    
    <div>
    <Canvas  fullName={this.props.UserProfile.fullName} navItems = {navItemList} userPic={this.props.UserProfile.userPic}>
      <div className='fin-overview'>

      </div>
      <div className='row-2'>
        <div className='left-home'>

        </div>
        <div className='right-home'>
          
        </div>
      </div>
    </Canvas>
    </div>
    
    )
  
}
  
  

}
}
