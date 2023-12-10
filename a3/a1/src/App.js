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
import { StudentCourse} from './components/Coursepreview';
import { Admin } from "./components/Admin";
//import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {Logout} from './components/common/Logout';
import './index.css';
import { Error } from './components/Error'

function App() {

  const token = JSON.parse(localStorage.getItem('loggedIn'))

  const [questions, setQuestion] = useState(JSON.parse(localStorage.getItem('questions')) || []);

  const initialData = {
          isanswered:false,
          query:''
  }
  const [newquestion, setNewQuestion] = useState({});


  const handleChange = (e)=> {
    const name = e.target.name;
    const value = e.target.value;
    setNewQuestion((curQuestion)=> 
      ({...curQuestion, [name]: value}));   
  }

  // const handleSubmit = (e, name, email) => {
  //     e.preventDefault()
  //     const id = questions.length ? questions[questions.length - 1].id + 1 : 1;
  //     const studid = token.id
  //     const newquestionItem = { studid,id,name,email, ...newquestion };
  //     const updatedQuestion = Array.isArray(questions) ? [...questions, newquestionItem] : [newquestionItem];
  //     setQuestion(updatedQuestion);
  //     alert('Your question is sent!')
  //     localStorage.setItem('questions', JSON.stringify(updatedQuestion));
  //     setNewQuestion({isanswered: false, query:""});
  // }

  //////////////HANDLE SUBMIT(UPDATED)///
  const handleSubmit = async (e, name, email) => {
      e.preventDefault()
      const id = questions.length ? questions[questions.length - 1].id + 1 : 1;
      const studid = token.id
      const newquestionItem = { studid,id,name,email, ...newquestion };
      const updatedQuestion = Array.isArray(questions) ? [...questions, newquestionItem] : [newquestionItem];
      setQuestion(updatedQuestion);
      localStorage.setItem('questions', JSON.stringify(updatedQuestion));
      setNewQuestion({isanswered: false, query:""});

      await Axios.post('http://localhost:3001/studentquery', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.token
      }
    }, JSON.stringify(newquestionItem))
      .then((response) => {
      //console.log(response)
      if(response.status === 200){
        alert('Your question is sent!')
      }else{
        console.error("Failed to Submit Question. Try Again")
      }
    }).catch((error) => {
      console.log(error)
    });
  }
  const handleResponse = (e, id) => {
      const name = e.target.name;
      const value = e.target.value;
      setNewQuestion((curQuestion)=> 
      ({
        ...curQuestion, 
        [id]: { ...curQuestion[id], [name]: value },
      }));
  };

  // const handleSubmitRes = (id) => {
  //     // Find the question with the matching id
  //   const updatedQuestions = questions.map((question) => {
  //       if (question.id === id) {
  //           return {
  //             ...question,
  //             isanswered: true,
  //             response: newquestion[id] ? newquestion[id].response : "",
  //         };
  //       }
  //       return question;
  //       });

  //   setQuestion(updatedQuestions);
  //   localStorage.setItem('questions', JSON.stringify(updatedQuestions));

  //   setNewQuestion((prevNewQuestions) => ({
  //       ...prevNewQuestions,
  //       [id]: { isanswered: false, response: "" },
  //   }));
    
  //   alert('Your response is sent!');
  // }

  //////HANDLE RESPONSE UPDATED//////////
  const handleSubmitRes = (id) => {
       // Find the question with the matching id
       const updatedQuestions = questions.map((question) => {
        if (question.id === id) {
            return {
              ...question,
              isanswered: true,
              response: newquestion[id] ? newquestion[id].response : "",
          };
        }
        return question;
        });

    setQuestion(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setNewQuestion((prevNewQuestions) => ({
        ...prevNewQuestions,
        [id]: { isanswered: false, response: "" },
    }));

    Axios.put(`http://localhost:3001/adminresponse/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.token
      }
    }, JSON.stringify(updatedQuestions))
      .then((response) => {
      if(response.status === 200){
        alert('Your Response is sent!')
      }else{
        console.error("Failed to Submit Response. Try Again")
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <Router>
      <div>
       {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Role />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/StudentRegisterCourse" element={< StudentRegisterCourse />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/coursepreview" element={<StudentCourse />} />
          <Route path="/admin" element={<Admin 
          newquestion={newquestion}
          questions={questions}
          handleResponse={handleResponse}
          handleSubmitRes={handleSubmitRes}
          />} />

          <Route path="/studentinfo" element={<StudentInformation 
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newquestion={newquestion}
          questions={questions} />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error/>}/> 

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
