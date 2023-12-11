import { useState, useEffect } from "react";
import { CourseList } from "./adminData";
import Course from "./Course";
import SearchCourse from './SearchCourse';
import ContactForm from "./ContactForm";
import Response from './Response';
import StudentHeader from './studentNav';
import '../css/student.css';
import Axios from "axios"

//Student search courses (list of courses available)
export const StudentRegisterCourse = () => {
    //Gets the toke of the user
    const token = JSON.parse(localStorage.getItem('loggedIn'));
    //If no token then redirect to login
    if (!token) window.location.href = 'login';
    else if (token.detail.role === 'admin') window.location.href = 'admin';

    const courseURL = 'http://localhost:3001/';
    const [userData, setUserData] = useState([]);
    const [registerStudentCourse, setregisterStudentCourse] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    // working but not yet implemented in all courses
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
    const handleRegister = async (course) => {
        const studId = { id: token.detail.id, courseid: course };
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

        if (exchangecourses && exchangecourses.id === token.detail.id) {
            const exchange = JSON.parse(localStorage.getItem('course'));
            exchange.push(studId);
            console.log(exchangecourses.courseid);
            const modifiedData = exchange.filter(item => item.courseid !== exchangecourses.courseid);
            // handle exchange course for backend
            let data = JSON.stringify({
                "student_id": token.detail.id,
                "existingCourse": exchangecourses.courseid,
                "courseToExchange": course
              });
              
              let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:3001/exchangecourse',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${token.token}`
                },
                data : data
              };
              
              await Axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("course", JSON.stringify(modifiedData));
                alert("You have successfully exchange your courses!");
                // drop the exchange course
                localStorage.removeItem('exchangecourse');
              })
              .catch((error) => {
                console.log(error);
                alert('Oops! Something went.');
                if (error.response.status === 401){
                    console.log('session timeout');
                    alert('session timeout');
                    localStorage.removeItem('loggedIn')
                    window.location.href = 'login';
                }
              });
        } else {
            alert("You have successfully registered!");
            setNewCourse(studId);
            const updatedRegisteredCourse = Array.isArray(registeredCourses) ? [...registeredCourses, studId] : [studId];
            await saveAndSetRegisteredCourses(updatedRegisteredCourse);
        }

        window.location.href = 'studentinfo';
        const buttonElement = document.querySelector(`#courseContainer-${studId.courseid.id}`);
        if (buttonElement) {
            buttonElement.style.display = 'none';
        }
    };

    // available courses

    //Create a function to save registered courses on localstorage and on the registeredCourses State
    const saveAndSetRegisteredCourses = async (course) => {
        setRegisteredCourses(course);
        const regCourse = JSON.stringify(course);
        // add new course to database
        var courseid, id;
        course.forEach(course =>{ 
            id = course.id;
            courseid = course.courseid;
        })
        let data = JSON.stringify({
            "courseid": courseid,
            "id": id
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/register',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token.token}`
            },
            data : data
          };
          
          await Axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            localStorage.setItem('course', regCourse);
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
    const handleDrop = (courseid) => {
        const updatedRegisteredCourse = registeredCourses.filter((c) => !(c.id === token.detail.id && c.courseid === courseid));
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
    // get registered course
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/getregisteredcourse',
        headers: { 
          'Authorization': `Bearer ${token.token}`
        }
      };

      useEffect(() => {
          // Fetch all data when the component mounts
          fetchAllRegisteredCourse();
      }, []);
  
      const fetchAllRegisteredCourse= async () => {
      
      await Axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setRegisteredCourses(response.data);
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
      
    //Define a State to store all Courses a student is registeres in
    // const [registeredCourses, setRegisteredCourses] = useState(JSON.parse(localStorage.getItem('course')) || []);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    //Define a State for the Search Components
    const [searchCourse, setSearchCourse] = useState('');
    const filteredCoursesAvailable = courses.filter((course) => {
        const isRegistered = registeredCourses.some((c) => c.id === token.detail.id && c.courseid === course.id);
        return (
            !isRegistered &&
            (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                course.title.toLowerCase().includes(searchCourse.toLowerCase()))
        );
    });
    const filteredExchaneCourses = courses.filter((course) => {
        // const isRegistered = exchangecourses.some((c) => c.id === token.detail.id && c.courseid === course.id);
        let isRegistered = null;
        if (exchangecourses.id === token.detail.id && exchangecourses.courseid === course.id) isRegistered = true;
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
    else if (token.detail.role === 'admin') window.location.href = 'admin';

    const getCourse = JSON.parse(localStorage.getItem('course'));
    if (getCourse) {
        getCourse.forEach(e => {
            if (token.detail.id === e.StudentId) {
                console.log(e.course);
            }
            //console.log(e.StudentId)
        });
    }

    //Student exchnage course
    const handleExchange = (course) => {
        const myexchangeCourse = { id: token.detail.id, courseid: course.id };
        console.log(myexchangeCourse);
        localStorage.setItem('exchangecourse', JSON.stringify(myexchangeCourse));
        window.location.href = 'studentregistercourse';
    };

    //Declare a State for the list of Courses to be displayed on the registration
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('ListofCourses')) || CourseList);
    // get registered course
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/getregisteredcourse',
        headers: { 
          'Authorization': `Bearer ${token.token}`
        }
      };

      useEffect(() => {
          // Fetch all data when the component mounts
          fetchAllRegisteredCourse();
      }, []);
  
      const fetchAllRegisteredCourse= async () => {
      
      await Axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setRegisteredCourses(response.data);
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
      
    //Define a State to store all Courses a student is registeres in
    // const [registeredCourses, setRegisteredCourses] = useState(JSON.parse(localStorage.getItem('course')) || []);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({});
    //Define a State for the Search Components
    const [searchCourse, setSearchCourse] = useState('');

    const saveAndSetRegisteredCourses = async (course) => {
        setRegisteredCourses(course);
        const regCourse = JSON.stringify(course);
        // add new course to database
        var courseid, id;
        course.forEach(course =>{ 
            id = course.id;
            courseid = course.courseid;
        })
        let data = JSON.stringify({
            "courseid": courseid,
            "id": id
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/register',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token.token}`
            },
            data : data
          };
          
          await Axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            localStorage.setItem('course', regCourse);
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

    const handleRegister = (courseId) => {
        const mynewCourse = { id: token.detail.id, courseid: courseId };
        setNewCourse(mynewCourse);
        const updatedRegisteredCourse = Array.isArray(registeredCourses) ? [...registeredCourses, mynewCourse] : [mynewCourse];
        saveAndSetRegisteredCourses(updatedRegisteredCourse);
    };

    //handleDrop
    const handleDrop = async (courseid) => {
        const updatedRegisteredCourse = registeredCourses.filter((c) => !(c.id === token.detail.id && c.courseid === courseid));
        console.log(courseid)
        // saveAndSetRegisteredCourses(updatedRegisteredCourse);
        //  drop course
        
        let data = JSON.stringify({
            "courseid": courseid,
            "id": token.detail.id
          });
          
          let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/coursedrop',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token.token}`
            },
            data : data
          };
          
          await Axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            alert('Course successfully dropped.');
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            alert('Oops! Something went.');
            if (error.response.status === 401){
                console.log('session timeout');
                alert('session timeout');
                localStorage.removeItem('loggedIn')
                window.location.href = 'login';
            }
          });
    };

    const filteredCoursesRegistered = courses.filter((course) => {
        const isRegistered = registeredCourses.some((c) => c.id === token.detail.id && c.courseid === course.id);
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
                            <h2 className="studentInfo_label">I am a {token.detail.role}</h2>
                            <p className="info"><b>Student ID: </b>{token.detail.id} </p>
                            <p className="info"><b>Program: </b>{token.detail.program} </p>
                            <p className="info"><b>Department: </b>{token.detail.department} </p>
                            <p className="info"><b>Username: </b> {token.detail.username}</p>
                            <p className="info"><b>First name: </b>{token.detail.fname} </p>
                            <p className="info"><b>Last name: </b>{token.detail.lname} </p>
                            <p className="info"><b>Email: </b>{token.detail.email} </p>
                            <p className="info"><b>Phone: </b>{token.detail.phone} </p>
                            <p className="info"><b>DOB: </b>{token.detail.dob}</p>
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
                    id={token.detail.id}
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
