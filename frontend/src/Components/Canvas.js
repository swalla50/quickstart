import React, {useState, setShow,useEffect,setUser} from 'react'
import './Canvas.css'
import { DropdownButton,Dropdown } from 'react-bootstrap'
import {AnimatePresence,motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Canvas = ( props ) => {


  const logout = () =>{
    localStorage.removeItem('token');
  }


  const variants={
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: "-100%"}
  }
  const [show, setShow] = useState(false);
  
  if(localStorage.getItem('token')){
  
  return (
    <div className='Template'>
    <motion.nav className= 'nav-card' 
    animate={show ? "open" : "closed"}
    variants= {variants}
    transition={{duration: 0.5}}
     >
       <motion.div className="inner-nav">
          {props.navItems}
        </motion.div>
    </motion.nav>
    <div className="canvas">
      <motion.button className='toggle' onClick={() => setShow(show => !show)}
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
      >
        {show? <FontAwesomeIcon icon={faTimes} size ='2x' /> : <FontAwesomeIcon icon={faBars} size ='2x' /> }
      </motion.button>
      <div className='welcome-banner'>
        <h3 className='welcome-name'> 
          Welcome {props.fullName}
          <div className="dropdown" id='user-pic-drpdwn'>
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img className='profile-pic' src={'https://webapi20220126203702.azurewebsites.net/Images/' + props.userPic}  style ={{height:'60px',width:'60px', borderRadius:'50px'}}/>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Settings</a>
              <a className="dropdown-item" onClick={logout} href="/">Logout</a>
            </div>
          </div>
        </h3>
        
      </div>
      { props.children }
    </div>
    </div>
  )
}
}
export default Canvas