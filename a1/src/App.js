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
import { StudentProfile } from './components/Student';
import { AdminUsers } from './components/adminUsers';
import { Hi } from './components/Admin';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
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
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/admin" element={<Hi />} />

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
