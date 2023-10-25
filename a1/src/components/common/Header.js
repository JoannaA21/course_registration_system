import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import "../../css/header.css"

function Header() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  return (
    <header>
      {isHomeRoute ? null :
      <nav className="navbar">
        <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/registration" className="nav-link">Registration</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Student Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/adminlogin" className="nav-link">Admin Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/studentinfo" className="nav-link">My Student Information</Link>
              </li>
              <li className="nav-item">
                <Link to="/studentregistercourse" className="nav-link">Register for courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">Log out</Link>
              </li>
            </ul>
          </div>
      </nav>
      }
    </header>
  );
}

export default Header;
