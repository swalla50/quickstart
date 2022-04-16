import React from 'react'

function NavList() {
  return (
    <div className= 'nav-card'  >
          <li className= 'nav-list'>   <a href="home" className="nav-links">Business Overview</a> </li>
          <li className= 'nav-list'>   <a className="nav-links" href="banking">Banking</a> </li>
          <li  className= 'nav-list'>   <a href = "payroll" className="nav-links"> Payroll </a> </li>
          <li  className= 'nav-list'>  <a className="nav-links">Bookkeeping </a> </li>
          <li className= 'nav-list'>   <a href="timesheet"className="nav-links">Time Sheet</a></li>
          <button className= 'nav-list' > Logout </button>
    </div>
  )
}

export default NavList