import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/Home';
// import CourseListPage from './components/CourseList';
// import CourseRegistrationPage from './components/CourseRegistration';
// import AdminDashboard from './components/AdminDashboard';
// import AdminLoginPage from './components/AdminLoginPage';
// import SignUp from './components/SignUp';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/registration" element={<CourseRegistrationPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
