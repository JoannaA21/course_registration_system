import AddCourse from "./AddCourse";
import Course from "./Course";
import SearchCourse from "./SearchCourse";
import { useState, useEffect } from "react";
import "../css/admin.css";
import { CourseList } from './adminData';
import ContactForm from "./ContactForm";
import { v4 as uuidv4 } from 'uuid';
import BVCLogo from "../css/BVCLogo.png";
import { StudentUsers } from './adminData';
import Axios from "axios";


export const Admin = ({ newquestion, handleResponse, handleSubmitRes, questions }) => {
  const token = JSON.parse(localStorage.getItem('loggedIn'));
  if (!token) window.location.href = 'adminlogin';
  else if (token.detail.role !== 'admin') {
    alert("You are not an admin");
    // window.history.back();
    window.location.href = 'studentinfo';
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

  // fetch all courses
  const courseURL = 'http://localhost:3001/';
  const [courseData, setCourseData] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
      // Fetch all data when the component mounts
      fetchAllData();
  }, []);

  const fetchAllData = () => {
      Axios.get(courseURL + 'courses')
          .then((response) => {
              console.log(response.data);
              setCourseData(response.data);
              setCourse(JSON.parse(response.data));
              setFetchError(null);
          })
          .catch((error) => {
              console.warn('Error fetching all data :(', error);
              setCourseData([]);
              setFetchError("Error fetching data");
          });
  };
  console.log(courseData);
  //Courses Data to be Displayed
  const [courses, setCourse] = useState(JSON.parse(localStorage.getItem('ListofCourses') || JSON.stringify(CourseList)));

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
  };


  //Handles Changes on the Form
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewCourse((curCourses) =>
      ({ ...curCourses, [name]: value }));

    // console.log(response)
  };

  //Handles the delete
  // const handleDelete = (id) => {
  //     const listcourses = courses.filter((course)=> course.id !== id); 
  //     setAndSaveCourse(listcourses);
  // }

  //////////////HANDLES DELETE(UPDATE)/////////////////////////////////
  const handleDelete = (id) => {
    //checks if there are courses
    if (Array.isArray(courses) && courses.length > 0) {
      Axios.delete(`http://localhost:3001/course/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
          }
        }
      )
        .then((response) => {
          //filters the course the save it to the state
          const listcourses = courses.filter((course) => course.id !== id);
          setAndSaveCourse(listcourses);
        })
        .catch((error) => {
          console.log("Error" + error.message);
        });
    } else {
      console.log("Cannot Execute Delete");
    }
  };

  //Handles the submit on Add course Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    const newCourseItem = { id, ...newCourse };
    const updatedCourses = Array.isArray(courses) ? [...courses, newCourseItem] : [newCourseItem];;

    const { code,
      title,
      startdate,
      enddate,
      days,
      starttime,
      endtime,
      instructor } = newCourseItem;
    // console.log(token.token) 
    // await Axios.post('http://localhost:3001/createcourse', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token.token
    //   }
    // }, JSON.stringify(newCourse)).then((response) => {
    //   console.log(response)
    // }).catch((error) => {
    //   console.log(error)
    // });
    let data = JSON.stringify({
      "courseCode": code,
      "courseTitle": title,
      "courseStartDate": startdate,
      "courseEndDate": enddate,
      "courseDays": days,
      "courseStartTime": starttime,
      "courseEndTime": endtime,
      "courseInstructor": instructor
    });
    console.log(data)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/createcourse',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token.token}`
      },
      data : data
    };

    await Axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setAndSaveCourse(updatedCourses);
  
      setNewCourse(initialNewCourse);
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401){
          console.log('session timeout');
          alert('session timeout');
          localStorage.removeItem('loggedIn')
          window.location.href = 'login';
      }
    });
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
    localStorage.removeItem('loggedIn');
    alert('Log out successfully!');
    window.location.href = '/';
  };

  //Define a State to store all Courses a student is registeres in
  const [registeredCourses, setRegisteredCourses] = useState(JSON.parse(localStorage.getItem('course')) || []);

  // registered student courses
  const filteredCoursesRegistered = courses.filter((course) => {
    const isRegistered = registeredCourses.some((c) => c.courseid === course.id);

    return (
      isRegistered &&
      (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
        course.title.toLowerCase().includes(searchCourse.toLowerCase()))
    );
  });
  return (
    <div className="adminpage">

      <nav className="navbar">
        <div className="container">
          <ul className="navbar-nav">
            <li>
              <img src={BVCLogo} className='BVCheaderAdmin'></img>
            </li>
            <li>
              <p className="loggedInAs">Logged in as: {token.detail.userOrEmail}</p>
            </li>
            <li className="nav-item">
              <a className="nav-link logoutAdmin" onClick={logout}>Log out</a>

            </li>
          </ul>
        </div>
      </nav>


      <SearchCourse
        searchCourse={searchCourse}
        setSearch={setSearch}
      />

      <button onClick={toggleFormVisibility} className="addCourseButton">{isFormVisible ? "Close Form" : "Add New Course"}</button>


      {isFormVisible && (
        <AddCourse
          courses={courses}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newCourse={newCourse}
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
          <p className="no-avail" style={{ 'margin-left': '6em' }}>No courses were found</p>
        </div>
      )}

      <h2 className="studentInfo_label" id="myCourses">Registered Student Courses</h2>

      {filteredCoursesRegistered.length ? (
        <Course
          courses={filteredCoursesRegistered}
          studentDetails={registeredCourses}
        />
      ) : (
        <div className="no-avail-container">
          <p className="no-avail">No student is registered for any courses</p>
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
  );
};
