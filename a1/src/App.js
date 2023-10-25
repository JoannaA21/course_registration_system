import React, { useState } from 'react';
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

  const token = JSON.parse(localStorage.getItem('loggedIn'))
    // if (!token) window.location.href = 'adminlogin'

  const [questions, setQuestion] = useState(JSON.parse(localStorage.getItem('questions')) || []);

  const initialData = {
    isanswered:false,
    query:''
  }
  const [newquestion, setNewQuestion] = useState(initialData);
  

  const handleChange = (e)=> {
    const name = e.target.name;
    const value = e.target.value;
    setNewQuestion((curQuestion)=> 
      ({...curQuestion, [name]: value}));   
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = questions.length ? questions[questions.length - 1].id + 1 : 1;
    //const studid = token.id
    const studentid = 3;
    const newquestionItem = { studentid,id, ...newquestion };
    const updatedQuestion = Array.isArray(questions) ? [...questions, newquestionItem] : [newquestionItem];;
    setQuestion(updatedQuestion);
    alert('Your question is sent!')
    localStorage.setItem('questions', JSON.stringify(updatedQuestion));
    setNewQuestion({isanswered: false, query:""});
  }


  const handleResponse = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewQuestion((curQuestion)=> 
    ({...curQuestion, [name]: value})); 
  }


  const handleSubmitRes = (id) => {
    // e.preventDefault();

  // Find the question with the matching id
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          isanswered: true,
          response: newquestion.response, 
      };
    }
    return question;
    });

 
    setQuestion(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setNewQuestion({ isanswered: false, query: '', response: '' });
    alert('Your response is sent!');

    }


  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Role />} />
          <Route path="/login" element={<Login
          // handleChange={handleChange}
          // handleSubmit={handleSubmit}
          // newquestion={newquestion}
          // questions={questions}
          />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/StudentRegisterCourse" element={< StudentRegisterCourse />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin 
          // newquestion={newquestion}
          // questions={questions}
          // handleResponse={handleResponse}
          // handleSubmitRes={handleSubmitRes}
          />} />
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
