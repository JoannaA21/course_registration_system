import AddCourse from "./AddCourse"
import Course from "./Course"
import SearchCourse from "./SearchCourse"
import { useState } from "react"
import "../css/admin.css"
import {CourseList} from './adminData'
import ContactForm from "./ContactForm"
import { v4 as uuidv4 } from 'uuid';
import BVCLogo from "../css/BVCLogo.png"



export const Admin = ({newquestion,handleResponse,handleSubmitRes, questions}) => {
    const token = JSON.parse(localStorage.getItem('loggedIn'))
    if (!token) window.location.href = 'adminlogin'
    else if (token.role !== 'admin') {
        alert("You are not an admin");
        // window.history.back();
        window.location.href = 'studentinfo'
    }

//function for local storage remaining mb
function getLocalStorageSize() {
    let totalSize = 0;
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const itemSize = (key.length + value.length) * 2; // Size in bytes (UTF-16 encoding)
  
      totalSize += itemSize;
    }
  
    // Convert the total size to a more human-readable format (e.g., KB, MB)
    const formattedSize = (totalSize / 1024).toFixed(2) + ' KB';
    
    return {
      size: totalSize,
      formattedSize
    };
  }
  
  const localStorageInfo = getLocalStorageSize();
  console.log('Total localStorage size:', localStorageInfo.size, 'bytes');
  console.log('Total localStorage size:', localStorageInfo.formattedSize);

//Courses Data to be Displayed
const [courses, setCourse] = useState(JSON.parse(localStorage.getItem('ListofCourses') || JSON.stringify(CourseList) ));

//Initial reset data for Add Course Forms
const initialNewCourse = {
  code: '',
  title: '',
  startdate: '',
  enddate: '',
  days: '',
  starttime: '',
  endtime: '',
  instructor: ''
};

//State for new Data to be push to the courses array Object
const [newCourse, setNewCourse] = useState(initialNewCourse);

//State for the search Form
const [searchCourse, setSearch] = useState('');

// //State for the generation of an id TODO
// const [cid, setID] = useState(3000)

//Function that pushes the new data to the courses array object and stores the data on the local storage
const setAndSaveCourse = (newCourse) => {
  setCourse(newCourse);
  localStorage.setItem('ListofCourses', JSON.stringify(newCourse));
}

// const findMaxID = (courses) => {
//   if(courses.length === 0) return 0;
//   return Math.max(...courses.map(course => course.id));
// }

//Handles Changes on the Form
const handleChange=(e)=>{      
  const name = e.target.name;
  const value = e.target.value;
  setNewCourse((curCourses)=> 
    ({...curCourses, [name]: value}));      
}

//Handles the delete
const handleDelete = (id) => {
    const listcourses = courses.filter((course)=> course.id !== id); 
    setAndSaveCourse(listcourses);
}

//Handles the submit on Add course Form
const handleSubmit = (e) => {
  e.preventDefault()
  // const id = cid;
  // setID(cid + 1);
  // const maxid = findMaxID(courses);
  // const id = maxid * 2 + 12 ;
  const id = uuidv4();
  const newCourseItem = { id, ...newCourse };
  const updatedCourses = Array.isArray(courses) ? [...courses, newCourseItem] : [newCourseItem];;
  setAndSaveCourse(updatedCourses);

  setNewCourse(initialNewCourse);

};
  
const [isFormVisible, setFormVisible] = useState(false);

const toggleFormVisibility = () => {
  setFormVisible(!isFormVisible);
};

//Search component
const filteredCourses = courses.filter(course =>
  course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
  course.title.toLowerCase().includes(searchCourse.toLowerCase())
);

//logout
const logout = () => {
  localStorage.removeItem('loggedIn')
  alert('Log out successfully!')
  window.location.href = '/'
}
    return (
      <div className="adminpage">

     <nav className="navbar">
        <div className="container">
            <ul className="navbar-nav">
              <li>
              <img src={BVCLogo} className='BVCheaderAdmin'></img>
              </li>
              <li>
                <p>Logged in as: {token.username}</p>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>Log out</a>
        
              </li>
            </ul>
          </div>
      </nav>



           
            <SearchCourse
            searchCourse = {searchCourse}
            setSearch = {setSearch}
            />

          <button onClick={toggleFormVisibility} className="addCourseButton">{isFormVisible ? "Close Form" : "Add New Course"}</button>


          {isFormVisible && (
               <AddCourse
               courses={courses}
               handleChange={handleChange}
               handleSubmit={handleSubmit}
               newCourse ={newCourse}
            />
            )}
          
          
          <h2 className="admin-subTitle">Courses</h2>

            {filteredCourses.length ? (
                <Course
                    courses={filteredCourses}
                    handleDelete={handleDelete}
                />
            ) : (
              <div className='no-avail-container'>
                <p  className="no-avail" style={{'margin-left':'6em'}}>No courses were found</p>
              </div>
            )}

            <h2 className="admin-subTitle">Questions by Students </h2>
            <ContactForm

            newquestion={newquestion}
            questions={questions}
            handleResponse={handleResponse}
            handleSubmitRes={handleSubmitRes}
            />

        </div>
    )
}
