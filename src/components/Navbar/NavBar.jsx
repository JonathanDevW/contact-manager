import React from 'react';
import {Link} from 'react-router-dom'

function NavBar() {
  return ( 
    <React.Fragment>
        <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
          <div className='container'>
              <Link to ={'/'} className="navbar-brand">
              <li className='fa fa-mobile text-success'></li><span className='text-warning'> Contact </span>Manager
              </Link>
          </div>

        </nav>
    </React.Fragment>
  )
}

export default NavBar
