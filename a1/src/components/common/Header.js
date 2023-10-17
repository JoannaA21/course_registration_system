import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  return (
    <header>
      {isHomeRoute ? null :
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/registration">Registration</a>
          </li>
          <li>
            <a href="/login">Student Login</a>
          </li>
          <li>
            <a href="/adminlogin">Admin Login</a>
          </li>
        </ul>
      </nav>
      }
    </header>
  );
}

export default Header;
