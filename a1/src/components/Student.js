import { useState, useEffect } from "react";
import { CourseList } from "./adminData";
import Course from "./Course";
import SearchCourse from './SearchCourse';
import ContactForm from "./ContactForm";
import Response from './Response';
import StudentPage from "./StudentPage";
import StudentHeader from './studentNav'
import '../css/student.css'

//Student search courses (list of courses available)
export const StudentRegisterCourse = () => {
    //Gets the toke of the user
    const token = JSON.parse(localStorage.getItem('loggedIn'));
    //If no token then redirect to login
    if (!token) window.location.href = 'login';

    //Gets the Available Courses on the local storage
    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('ListofCourses') || JSON.stringify(CourseList)));
    //Displays the students searched Courses
    let [studentSearch, setStudentSearch] = useState('');
    const [searchBtn, setSearchButton] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchButton({ search }.SearchCourse);

        const course = { search }.filter((c) => c.code.toLowerCase() === studentSearch.toLowerCase()
            || c.title.toLowerCase() === studentSearch.toLowerCase());
    };

    //Student register for courses
    const handleRegister = (course) => {
        const studId = { id: token.id, courseid: course };
        const storedCourse = localStorage.getItem('course');
        let existingCourse = [];

        if (storedCourse) {
            existingCourse = JSON.parse(storedCourse);
        }

        existingCourse.push(studId);

        localStorage.setItem('course', JSON.stringify(existingCourse));
        alert("You have successfully registered!");
        window.location.href = 'studentinfo';
        const buttonElement = document.querySelector(`#courseContainer-${studId.course.id}`);
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
    //Declare a State for the list of Courses to be displayed on the registration
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('ListofCourses')) || CourseList);
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

    return (
        <>
            <div className="Student_info_body">
            <StudentHeader/>
            <SearchCourse
                searchCourse={studentSearch}
                setSearch={setStudentSearch}
            />
            {/* <Course
                courses={search.filter(course =>
                    course.code.toLowerCase().includes(studentSearch.toLowerCase()) ||
                    course.title.toLowerCase().includes(studentSearch.toLowerCase())
                )}
                handleDelete={""}
                handleRegister={handleRegister}
            /> */}

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

    const getCourse = JSON.parse(localStorage.getItem('course'));
    if (getCourse) {
        getCourse.forEach(e => {
            if (token.id === e.StudentId) {
                console.log(e.course);
            }
            //console.log(e.StudentId)
        });
    }

    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('course') || '[]'));
    let [studentSearch, setStudentSearch] = useState('');
    //Student exchnage course
    const handleExchange = (course) => {
        let storedCourse = localStorage.getItem('course');
        localStorage.setItem('exchangecourse', JSON.stringify(course));
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
        <StudentHeader/>
            <div className="Student_info_body">
                <div className="main">
                    {/* <h2 className="student-subTitle">My Information</h2> */}
                    <h2 className="studentInfo_label">My Information</h2>
                        <div className="card">
                            <div className="student_card_body">
                            <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" />
                                <h2 className="studentInfo_label">I am a {token.role}</h2>
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
            {/* <Course
                courses={search.filter(rcourse =>
                    rcourse.course.code
                )}
                handleDelete={""}
                handleRegister={""}
                handleExchange={handleExchange}
            /> */}
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

            <h2 className="studentInfo_label">Queries</h2>


            <Response
                questions={questions}
            />
            </div>

        </>
    );
};

// export const StudentInformation = ({handleChange,handleSubmit,newquestion,questions,handleResponse,handleSubmitRes}) => {
//         const token = JSON.parse(localStorage.getItem('loggedIn'));
//         if (!token) window.location.href = 'login';
//     return (
//         <>
//         <div>
//             <h2>{token.role}</h2>
//             <p><b>Program: </b>{token.program} </p>
//             <p><b>Department: </b>{token.department} </p>
//             <p><b>Username: </b> {token.username}</p>
//             <p><b>First name: </b>{token.fname} </p>
//             <p><b>Last name: </b>{token.lname} </p>
//             <p><b>Email: </b>{token.email} </p>
//             <p><b>Phone: </b>{token.phone} </p>
//             <p><b>DOB: </b>{token.dob}</p>
//         </div>
//             <StudentPage
//                        handleChange={handleChange}
//                        handleSubmit={handleSubmit}
//                        newquestion={newquestion}
//                        questions={questions}
//                        handleResponse={handleResponse}
//                        handleSubmitRes={handleSubmitRes}
//              ></StudentPage>
//         </>
//     );
// };