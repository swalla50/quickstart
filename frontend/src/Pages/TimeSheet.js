import React, { Component } from 'react'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Canvas from '../Components/Canvas';
import './TimeSheet.css'
import TimeSheetfunc from '../Components/TimeSheet/TimeSheetfunc';

export default class TimeSheet extends Component {
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);

    }
    logout() {
        localStorage.removeItem('token');
    }
    state = {
        UserProfile: {},
        fullName: {},
        myUserId: {}
    }


    render() {
        if (localStorage.getItem('token') == null) {
            return (
                <Navigate to="/" />
            )
        }
        else {
            let navItemList;


            navItemList = (
                <><li className='nav-list'>  <FontAwesomeIcon icon={faBriefcase} size='2x' /> <a href="home" className="nav-links">Business Overview</a> </li><li className='nav-list'>  <FontAwesomeIcon icon={faBuildingColumns} size='2x' /> <a className="nav-links" href="bank">Banking</a> </li><li className='nav-list'> <FontAwesomeIcon icon={faMoneyBill1Wave} size='2x' />  <a href="payroll" className="nav-links"> Payroll </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faReceipt} size='2x' /> <a className="nav-links">Bookkeeping </a> </li><li className='nav-list'> <FontAwesomeIcon icon={faClock} size='2x' />  <a href="timesheet" className="nav-links">Time Sheet</a></li><button className='nav-list' onClick={this.handleLogout}> Logout </button></>
            )
            return (
                <Canvas fullName={this.props.UserProfile.fullName} navItems={navItemList} userPic={this.props.UserProfile.userPic}>
                    <TimeSheetfunc />
                </Canvas>
            )
        }
    }
}


