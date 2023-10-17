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
            <a href="/courseRegistrations">Registration</a>
          </li>
          <li>
            <a href="/admin">Admin Login</a>
          </li>
          <li>
            <a href="/admin">Student Login</a>
          </li>
          <li>
            <a href="/studentLogin">Student Login</a>
          </li>
          <li>
            <a href="/registrations">Student SignUp</a>
          </li>
        </ul>
      </nav>
      }
    </header>
  );
}

export default Header;
