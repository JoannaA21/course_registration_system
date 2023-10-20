import React from 'react';
import { useLocation, Link } from 'react-router-dom';


function Header() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  return (
    <header>
      {isHomeRoute ? null :
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/login">Student Login</Link>
          </li>
          <li>
            <Link to="/adminlogin">Admin Login</Link>
          </li>
          <li>
            <Link to="/StudentRegisterCourse">Register for courses</Link>
          </li>
          <li>
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </nav>
      }
    </header>
  );
}

export default Header;
