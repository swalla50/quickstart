import React, { useState, setShow, useEffect, setUser } from 'react'
import './Canvas.css'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faBars, faTimes, faMessage, faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faComment, faComments, faPieChart, faProjectDiagram, } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/images/altbookwithtext.png';
import ChatModal from './Chat/ChatModal';
import axios from 'axios';
import { Link, Navigate, NavLink } from 'react-router-dom'
import Auth from '../Auth/Auth';
import CompanyFeed from './CompanyFeed/CompanyFeed';

const Canvas = (props) => {
  const [groupRights, setGroupRights] = useState([0]);
  const [groupRightsBookKeeping, setgroupRightsBookKeeping] = useState([0]);
  const [groupRightsBanking, setgroupRightsBanking] = useState([0]);
  const [groupRightsProject, setgroupRightsProject] = useState([0]);
  const [groupRightsReport, setgroupRightsReport] = useState([0]);
  const [groupRightsPay, setgroupRightsPay] = useState([0]);
  const [user, setUser] = useState([]);

  useEffect(() => {

    axios.get(`UserProfile`)
      .then((res) => {
        const myUser = res.data;
        setUser(myUser);



        axios.get(`groupRights/getGroupRights`)
          .then((response) => {
            setgroupRightsPay(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 7));
            setgroupRightsReport(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 5));
            setgroupRightsProject(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 4));
            setGroupRights(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 3));
            setgroupRightsBookKeeping(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 2));
            setgroupRightsBanking(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 1));
            console.log("RIGHTS  FOUND:", response.data.filter(item => (item.vendorId == res.data.Company) && (item.ModuleID == 2)))

          })
          .catch((err) => {
            console.log(err, "Unable to get user time info");
          });



      })
      .catch((err) => {
        console.log(err, "Unable to get user time info");
      });

  }, []);

  const logout = () => {
    localStorage.removeItem('token');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    Auth.logout();
  }

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-80%" }
  }
  const variantpost = {
    openedpost: { opacity: 1, x: 0, width: 500 },
    closedpost: { opacity: 0, x: "100%", width: 0 }
  }
  const [show, setShow] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [chatmodalShow, setchatModalShow] = React.useState(false);

  if (localStorage.getItem('token')) {

    return (
      <div className='Template'>
        <motion.nav className='nav-card'
          animate={show ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="inner-nav">
            {show ? <><li className='nav-list-open'><h3>Altbooks</h3> <motion.button className='toggle-open' onClick={() => setShow(show => !show)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {show ? <FontAwesomeIcon icon={faTimes} size='2x' /> : <FontAwesomeIcon icon={faBars} size='2x' />}
            </motion.button></li><li className='nav-list'>  <FontAwesomeIcon icon={faBriefcase} size='2x' /> <NavLink to="/home" className="nav-links">Business Overview</NavLink> </li>
              {groupRightsReport[0].LevelID !== null ? (<><li className='nav-list'>  <FontAwesomeIcon icon={faPieChart} size='2x' /> <NavLink to="/reports" className="nav-links">Reports</NavLink> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRightsBanking[0].LevelID !== null ? (<><li className='nav-list'>  <FontAwesomeIcon icon={faBuildingColumns} size='2x' /> <Link className="nav-links" to="/bank">Banking</Link> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRightsPay[0].LevelID !== null ? (<><li className='nav-list'> <FontAwesomeIcon icon={faMoneyBill1Wave} size='2x' />  <a href="payroll" className="nav-links"> Payroll </a> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRightsBookKeeping[0].LevelID !== null ? (<><li className='nav-list'> <FontAwesomeIcon icon={faReceipt} size='2x' /> <a href="bookkeeping" className="nav-links">Bookkeeping </a> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRights[0].LevelID !== null ? (<><li className='nav-list'> <FontAwesomeIcon icon={faClock} size='2x' />  <a href="timesheet" className="nav-links">Time Sheet</a></li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'>)</div></>)}
              {groupRightsProject[0].LevelID !== null ? (<><li className='nav-list'>  <FontAwesomeIcon icon={faProjectDiagram} size='2x' /> <NavLink to="/project" className="nav-links">Projects</NavLink> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              <a className='nav-list' onClick={handleLogout} href="/"> Logout </a></> : <><li className='nav-list-closed'>
            <motion.button className='toggle' onClick={() => setShow(show => !show)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                {show ? <FontAwesomeIcon icon={faTimes} size='2x' /> : <FontAwesomeIcon icon={faBars} size='2x' />}
              </motion.button></li>
              <li className='nav-list-closed'>  <FontAwesomeIcon className='Nav-icon-closed' icon={faBriefcase} size='2x' /> </li>
              {groupRightsReport[0].LevelID !== null ? (<><li className='nav-list-closed'> <FontAwesomeIcon className='Nav-icon-closed' icon={faPieChart} size='2x' /> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRightsBanking[0].LevelID !== null ? (<><li className='nav-list-closed'> <FontAwesomeIcon className='Nav-icon-closed' icon={faBuildingColumns} size='2x' /> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRightsPay[0].LevelID !== null ? (<><li className='nav-list-closed'> <FontAwesomeIcon className='Nav-icon-closed' icon={faMoneyBill1Wave} size='2x' /> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRightsBookKeeping[0].LevelID !== null ? (<><li className='nav-list-closed'> <FontAwesomeIcon className='Nav-icon-closed' icon={faReceipt} size='2x' /> </li></>) : (<><div style={{ contentVisibility: 'hidden' }} className='no-show'></div></>)}
              {groupRights[0].LevelID !== null ? (<><li className='nav-list-closed'> <FontAwesomeIcon className='Nav-icon-closed' icon={faClock} size='2x' /> </li></>) : (<><div className='no-show' style={{ contentVisibility: 'hidden' }}></div></>)}
              {groupRightsProject[0].LevelID !== null ? (<><li className='nav-list-closed'> <FontAwesomeIcon className='Nav-icon-closed' icon={faProjectDiagram} size='2x' /> </li></>) : (<><div className='no-show' style={{ contentVisibility: 'hidden' }}></div></>)}</>}
            </motion.div>
        </motion.nav>
        <div className="canvas">

          <div className='welcome-banner'>
            <h3 className='welcome-name'>
              Welcome {props.UserProfile.FullName}
              <div className="dropdown" id='user-pic-drpdwn'>
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img className='profile-pic' src={'https://webapi20220126203702.azurewebsites.net/Images/' + props.UserProfile.userPic} style={{ height: '60px', width: '60px', borderRadius: '50px' }} />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/settings">Settings</a>
                  <a className="dropdown-item" onClick={logout} href="/">Logout</a>
                </div>
              </div>
            </h3>

          </div>
          {props.children}

        </div>

        <motion.button className='toggle-posts' onClick={() => setShowPost(showPost => !showPost)}
          whileHover={{ scale: 1.05 }}
        >
          {showPost ? <FontAwesomeIcon icon={faCircleChevronRight} size='3x' /> : <FontAwesomeIcon icon={faCircleChevronLeft} size='3x' />}
        </motion.button>
        <motion.nav style={{ opacity: 1 }} className='feed-card'
          animate={showPost ? "openedpost" : "closedpost"}
          variants={variantpost}
          transition={{ duration: 0.5 }}
        >

          <div className='nav-card'  >
            <CompanyFeed />

          </div>
        </motion.nav>

        <button onClick={() => setchatModalShow(true)} className="TopButton" id="TopButton" title="Go to top" style={{ display: "block" }}><FontAwesomeIcon icon={faComments} size='1x' /></button>

        <ChatModal
          show={chatmodalShow}
          onHide={() => setchatModalShow(false)}
        />
      </div>
    )
  }
}
export default Canvas