import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/Home';
// import CourseListPage from './components/CourseList';
// import CourseRegistrationPage from './components/CourseRegistration';
// import AdminDashboard from './components/AdminDashboard';
// import AdminLoginPage from './components/AdminLoginPage';
import { Registration } from './components/RegisterStudent';
import { Role } from './components/Role';
import { Login } from './components/Login';
import { StudentRegisterCourse, StudentInformation } from './components/Student';
import { Admin } from "./components/Admin";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {Logout} from './components/common/Logout';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Role />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/studentregistercourse" element={< StudentRegisterCourse />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/studentinfo" element={<StudentInformation />} />
          <Route path="/logout" element={<Logout />} />


          {/* <Route path="/courseRegistrations" element={<CourseRegistrationPage />} /> */}
          {/* <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
