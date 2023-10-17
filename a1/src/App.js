import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/Home';
// import CourseListPage from './components/CourseList';
// import CourseRegistrationPage from './components/CourseRegistration';
// import AdminDashboard from './components/AdminDashboard';
// import AdminLoginPage from './components/AdminLoginPage';
import { Registration } from './components/RegisterStudent';
import { Role } from './components/Role';
import { StudentLogin } from './components/Studentlogin';
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
          <Route path="/Studentlogin" element={<StudentLogin />} />
          <Route path="/Admin" element={<Registration />} />
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
