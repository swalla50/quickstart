import React, { Component } from 'react'
import axios from 'axios'
import Login from './Login';
import Canvas from '../Components/Canvas';
import { Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import './Home.css'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LineChart from '../Components/ChartJS/LineChart';
import Tab from '../Components/Tabs/Tabs';
import BankFeed from '../Components/BankFeed';
import DragnDrop from '../Components/DragnDrop/DragnDrop';


export default class Home extends Component {


  state = {}
  logout() {
    localStorage.removeItem('token');
    <Navigate to='/' />
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
    <Navigate to='/' />

  }
  data = {
    labels: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"],
    datasets: [{
      data: [12, 19, 3, 6, 2, 4]
    }]
  }

  render() {
    
      let navItemList;



      navItemList = (
        <><li className='nav-list'>  <FontAwesomeIcon icon={faBriefcase} size='2x' /> <a href="home" className="nav-links">Business Overview</a> </li><li className='nav-list'>  <FontAwesomeIcon icon={faBuildingColumns} size='2x' /> <a className="nav-links" href="bank">Banking</a> </li><li className='nav-list'> <FontAwesomeIcon icon={faMoneyBill1Wave} size='2x' />  <a href="payroll" className="nav-links"> Payroll </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faReceipt} size='2x' /> <a className="nav-links">Bookkeeping </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faClock} size='2x' />  <a href="timesheet" className="nav-links">Time Sheet</a></li><button href='/' className='nav-list' onClick={this.handleLogout}> Logout </button></>
      )

      return (

        <div>
          <Canvas UserProfile={this.props.UserProfile} setUser={this.props.setUser} fullName={this.props.UserProfile.fullName} navItems={navItemList} userPic={this.props.UserProfile.userPic}>
            <div className='fin-overview'>
              <Tab className='BarChart' />
            </div>
            <div className='row-2'>
              <div className='left-home'>
                <h4 className='transaction-header'>Transactions</h4>
                <div className='transaction-feed'>
                  <BankFeed />
                </div>
              </div>
              <div className='right-home'>
                <DragnDrop/>
              </div>
            </div>
          </Canvas>
        </div>

      )

    



  }
}
