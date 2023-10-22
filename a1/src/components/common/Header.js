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
      <nav class="navbar">
        <div class="container">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/" class="nav-link">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/registration" class="nav-link">Registration</Link>
              </li>
              <li class="nav-item">
                <Link to="/login" class="nav-link">Student Login</Link>
              </li>
              <li class="nav-item">
                <Link to="/adminlogin" class="nav-link">Admin Login</Link>
              </li>
              <li class="nav-item">
                <Link to="/StudentRegisterCourse" class="nav-link">Register for courses</Link>
              </li>
              <li class="nav-item">
                <Link to="/logout" class="nav-link">Log out</Link>
              </li>
            </ul>
          </div>
      </nav>
      }
    </header>
  );
}

export default Header;
