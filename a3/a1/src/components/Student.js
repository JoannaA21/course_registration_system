import Axios from "axios"
import { useState, useEffect } from "react";
import { CourseList } from "./adminData";
import Course from "./Course";
import SearchCourse from './SearchCourse';
import ContactForm from "./ContactForm";
import Response from './Response';
import StudentHeader from './studentNav';
import '../css/student.css';

//Student search courses (list of courses available)
export const StudentRegisterCourse = () => {
    //Gets the toke of the user
    const token = JSON.parse(localStorage.getItem('loggedIn'));
    //If no token then redirect to login
    if (!token) window.location.href = 'login';
    else if (token.role === 'admin') window.location.href = 'admin'
    
    const courseURL = 'http://localhost:3001/';
    const [userData, setUserData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
  
    useEffect(() => {
      // Fetch all data when the component mounts
      fetchAllData();
    }, []);
  
    const fetchAllData = () => {
      Axios.get(courseURL + 'courses')
        .then((response) => {
          console.log(response.data);
          setUserData(response.data);
          setFetchError(null);
        })
        .catch((error) => {
          console.warn('Error fetching all data :(', error);
          setUserData([]);
          setFetchError("Error fetching data");
        });
    };
    console.log(userData);
    //Student register for courses
    const [newCourse, setNewCourse] = useState({});
    const handleRegister = (course) => {
        const studId = { id: token.id, courseid: course };
        // compare registered course if any conflicts on enrolling course
        // console.log(registeredCourses)
        // console.log('map')
        // const isConflict = false;
        // registeredCourses.forEach(c=> {
        //     console.log(c.courseid)
        //     courses.forEach(course =>{
        //         if (course.id === c.courseid){
        //             console.log('okay')
        //             console.log(course.starttime)
        //             console.log(course.endtime)
        //             const st = course.starttime
        //             const et = course.endtime
        //             if 
        //         }
        //     })
        // })
        // end

        if (exchangecourses && exchangecourses.id === token.id) {
            const exchange = JSON.parse(localStorage.getItem('course'));
            exchange.push(studId);
            console.log(exchangecourses.courseid);
            const modifiedData = exchange.filter(item => item.courseid !== exchangecourses.courseid);
            localStorage.setItem("course", JSON.stringify(modifiedData));
            alert("You have successfully exchange your courses!");
            // drop the exchange course
            localStorage.removeItem('exchangecourse');
        } else {
            alert("You have successfully registered!");
            setNewCourse(studId);
            const updatedRegisteredCourse = Array.isArray(registeredCourses) ? [...registeredCourses, studId] : [studId];
            saveAndSetRegisteredCourses(updatedRegisteredCourse);
        }

        window.location.href = 'studentinfo';
        const buttonElement = document.querySelector(`#courseContainer-${studId.courseid.id}`);
        if (buttonElement) {
            buttonElement.style.display = 'none';
        }
    };

    // available courses

    //Create a function to save registered courses on localstorage and on the registeredCourses State
    const saveAndSetRegisteredCourses = (course) => {
        setRegisteredCourses(course);
        localStorage.setItem('course', JSON.stringify(course));
    };
    const handleDrop = (courseid) => {
        const updatedRegisteredCourse = registeredCourses.filter((c) => !(c.id === token.id && c.courseid === courseid));
        saveAndSetRegisteredCourses(updatedRegisteredCourse);
    };
    const handleCancelExchange = () => {
        localStorage.removeItem('exchangecourse');
        alert("Cancelled exchange course");
        window.location.href = "studentinfo";
    };
    //Declare a State for the list of Courses to be displayed on the registration
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('ListofCourses')) || CourseList);
    const [exchangecourses, setExchangecourses] = useState(JSON.parse(localStorage.getItem('exchangecourse')) || []);
    //Define a State to store all Courses a student is registeres in
    const [registeredCourses, setRegisteredCourses] = useState(JSON.parse(localStorage.getItem('course')) || []);
    //Define a State for the Search Components
    const [searchCourse, setSearchCourse] = useState('');
    const filteredCoursesAvailable = courses.filter((course) => {
        const isRegistered = registeredCourses.some((c) => c.id === token.id && c.courseid === course.id);
        return (
            !isRegistered &&
            (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                course.title.toLowerCase().includes(searchCourse.toLowerCase()))
        );
    });
    const filteredExchaneCourses = courses.filter((course) => {
        // const isRegistered = exchangecourses.some((c) => c.id === token.id && c.courseid === course.id);
        let isRegistered = null;
        if (exchangecourses.id === token.id && exchangecourses.courseid === course.id) isRegistered = true;
        return (
            isRegistered &&
            (exchangecourses)
        );
    });


    return (
        <>
            <div className="Student_info_body">
                <StudentHeader />
                <SearchCourse
                    searchCourse={searchCourse}
                    setSearch={setSearchCourse}
                />

                {filteredExchaneCourses.length ? (
                    <h2 className="admin-subTitle">Exchange Course</h2>
                ) : null}
                {filteredExchaneCourses.length ? (
                    <Course
                        courses={filteredExchaneCourses}
                        registeredCourses={exchangecourses}
                        handleCancelExchange={handleCancelExchange}
                    />
                ) : null}

                <h2 className="studentInfo_label">Courses</h2>

                {filteredCoursesAvailable.length ? (
                    <Course
                        courses={filteredCoursesAvailable}
                        handleRegister={handleRegister}
                        registeredCourses={registeredCourses}
                        handleDrop={handleDrop}
                    />
                ) : (
                    <p className="no-avail">No courses were found</p>
                )}

                {/* <ContactForm></ContactForm> */}
            </div>
        </>
    );
};

//Student information after logged in
export const StudentInformation = ({ handleChange, handleSubmit, newquestion, questions, handleResponse, handleSubmitRes }) => {
    const token = JSON.parse(localStorage.getItem('loggedIn'));
    if (!token) window.location.href = 'login';
   else if (token.role === 'admin') window.location.href = 'admin'

    const getCourse = JSON.parse(localStorage.getItem('course'));
    if (getCourse) {
        getCourse.forEach(e => {
            if (token.id === e.StudentId) {
                console.log(e.course);
            }
            //console.log(e.StudentId)
        });
    }

    //Student exchnage course
    const handleExchange = (course) => {
        const myexchangeCourse = { id: token.id, courseid: course.id };
        console.log(myexchangeCourse);
        localStorage.setItem('exchangecourse', JSON.stringify(myexchangeCourse));
        window.location.href = 'studentregistercourse';
    };

    //Declare a State for the list of Courses to be displayed on the registration
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('ListofCourses')) || CourseList);
    //Define a State to store all Courses a student is registeres in
    const [registeredCourses, setRegisteredCourses] = useState(JSON.parse(localStorage.getItem('course')) || []);
    const [newCourse, setNewCourse] = useState({});
    //Define a State for the Search Components
    const [searchCourse, setSearchCourse] = useState('');
    const saveAndSetRegisteredCourses = (course) => {
        setRegisteredCourses(course);
        localStorage.setItem('course', JSON.stringify(course));
    };

    const handleRegister = (courseId) => {
        const mynewCourse = { id: token.id, courseid: courseId };
        setNewCourse(mynewCourse);
        const updatedRegisteredCourse = Array.isArray(registeredCourses) ? [...registeredCourses, mynewCourse] : [mynewCourse];
        saveAndSetRegisteredCourses(updatedRegisteredCourse);
    };

    //handleDrop
    const handleDrop = (courseid) => {
        const updatedRegisteredCourse = registeredCourses.filter((c) => !(c.id === token.id && c.courseid === courseid));
        saveAndSetRegisteredCourses(updatedRegisteredCourse);
        alert('Course successfully dropped.');
    };

    const filteredCoursesRegistered = courses.filter((course) => {
        const isRegistered = registeredCourses.some((c) => c.id === token.id && c.courseid === course.id);
        return (
            isRegistered &&
            (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                course.title.toLowerCase().includes(searchCourse.toLowerCase()))
        );
    });

    return (
        <>
            <StudentHeader />
            <div className="Student_info_body">
                <div className="main">
                    {/* <h2 className="student-subTitle">My Information</h2> */}
                    <h2 className="studentInfo_label">My Information</h2>
                    <div className="card">
                        <div className="student_card_body">
                            <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" />
                            <h2 className="studentInfo_label">I am a {token.role}</h2>
                            <p className="info"><b>Student ID: </b>{token.id} </p>
                            <p className="info"><b>Program: </b>{token.program} </p>
                            <p className="info"><b>Department: </b>{token.department} </p>
                            <p className="info"><b>Username: </b> {token.username}</p>
                            <p className="info"><b>First name: </b>{token.fname} </p>
                            <p className="info"><b>Last name: </b>{token.lname} </p>
                            <p className="info"><b>Email: </b>{token.email} </p>
                            <p className="info"><b>Phone: </b>{token.phone} </p>
                            <p className="info"><b>DOB: </b>{token.dob}</p>
                        </div>
                    </div>
                </div>

                <h2 className="studentInfo_label" id="myCourses">My Courses</h2>

                {filteredCoursesRegistered.length ? (
                    <Course
                        courses={filteredCoursesRegistered}
                        handleRegister={handleRegister}
                        registeredCourses={registeredCourses}
                        handleDrop={handleDrop}
                        handleExchange={handleExchange}
                    />
                ) : (
                    <div className="no-avail-container">
                        <p className="no-avail">You are not registered in any courses</p>
                    </div>
                )}

                <h2 className="studentInfo_label" id="contact">Have a Question? </h2>

                <ContactForm
                    role="student"
                    id={token.id}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    newquestion={newquestion}
                    questions={questions}
                />

                <Response
                    questions={questions}
                />
            </div>

        </>
    );
};
