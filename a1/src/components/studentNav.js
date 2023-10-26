import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../css/header.css"

function StudentHeader() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  return (
    <header>
      {isHomeRoute ? null :
      <nav className="navbar">
        <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/studentinfo" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <a href="#myCourses" className="nav-link">My Courses</a>
              </li>
              <li className="nav-item">
                <Link to="/studentregistercourse" className="nav-link">Add courses</Link>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">Ask Question</a>
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

export default StudentHeader;
