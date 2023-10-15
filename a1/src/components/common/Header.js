import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/courses">Courses</a>
          </li>
          <li>
            <a href="/registration">Registration</a>
          </li>
          <li>
            <a href="/admin">Admin Login</a>
          </li>
          <li>
            <a href="/admin">Student Login</a>
          </li>
          <li>
            <a href="/signup">Student SignUp</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
