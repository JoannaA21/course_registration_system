import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../css/header.css"
import BVCLogo from "../css/BVCLogo.png"

function StudentHeader() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const logout = () => {
    localStorage.removeItem('loggedIn')
    alert('Log out successfully!')
    window.location.href = '/'
}
  return (
    <header>
      {isHomeRoute ? null :
      <nav className="navbar">
        <div className="container">
            <ul className="navbar-nav">
              <li>
              <img src={BVCLogo} className='BVCheaderlogo'></img>
              </li>
              <li className="nav-item">
                <Link to="/studentinfo" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <a href="/studentinfo#myCourses" className="nav-link">My Courses</a>
              </li>
              <li className="nav-item">
                <Link to="/studentregistercourse" className="nav-link">Add courses</Link>
              </li>
              <li className="nav-item">
                <a href="/studentinfo#contact" className="nav-link">Ask Question</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>Log out</a>
        
              </li>
            </ul>
          </div>
      </nav>
      }
    </header>
  );
}
export default StudentHeader;
