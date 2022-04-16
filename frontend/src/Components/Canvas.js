import React from 'react'
import './Canvas.css'
import { DropdownButton,Dropdown } from 'react-bootstrap'
import userPic from '../assets/images/steven-user-pic.png'

const Canvas = ( props ) => {
  const logout = () =>{
    localStorage.removeItem('token');
    }
  return (
    <div className="canvas">
      <div className='welcome-banner'>
        <h3 className='welcome-name'> 
          Welcome Steven Wallace
          <div class="dropdown" id='user-pic-drpdwn'>
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img className='profile-pic' src={userPic}  style ={{height:'60px',width:'60px', borderRadius:'50px'}}/>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Settings</a>
              <a class="dropdown-item" onClick={logout} href="/">Logout</a>
            </div>
          </div>
        </h3>
        
      </div>
      { props.children }
    </div>
  )
}

export default Canvas