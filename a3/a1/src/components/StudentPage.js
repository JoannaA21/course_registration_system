import React, { useState } from 'react'
import Course from './Course'
import SearchCourse from './SearchCourse'
import {CourseList} from './adminData'
import ContactForm from './ContactForm'
import Response from './Response'



const StudentPage = ({handleChange,handleSubmit,newquestion,questions}) => {
    //Gets the User Token
    const token = JSON.parse(localStorage.getItem('loggedIn'))
    //if (!token) window.location.href = 'studentlogin'
    //const studetnId = token.id;


    //Declare a State for the list of Courses to be displayed on the registration
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('ListofCourses')) || CourseList );
    //Define a State to store all Courses a student is registeres in
    const [registeredCourses, setRegisteredCourses] = useState(JSON.parse(localStorage.getItem('myRegisteredCourses'))||[]);

    //State for new Data to be push to the courses array Object
    const initialData = {};

    const [newCourse, setNewCourse] = useState({});

    //Define a State for the Search Components
    const [searchCourse, setSearch] = useState('');

    //Create a function to save registered courses on localstorage and on the registeredCourses State
    const saveAndSetRegisteredCourses = (course) => {
        setRegisteredCourses(course);
        localStorage.setItem('myRegisteredCourses',JSON.stringify(course));
    }

    const handleRegister = (courseId) => {
        // const studentData = JSON.parse(localStorage.getItem('loggedIn'));
        // const studetnId = 3;
        //studentData.id;

        const mynewCourse ={id:studetnId,courseid:courseId};
        setNewCourse(mynewCourse);
        const updatedRegisteredCourse = Array.isArray(registeredCourses) ? [...registeredCourses, mynewCourse] : [mynewCourse];
        saveAndSetRegisteredCourses(updatedRegisteredCourse);   
    }

    const handleDrop=(courseid)=>{
        // const studentData = JSON.parse(localStorage.getItem('loggedIn'));
        // const studetnId = 3;
        //studentData.id;

        const updatedRegisteredCourse = registeredCourses.filter((c)=> !(c.id === studetnId && c.courseid === courseid));
        saveAndSetRegisteredCourses(updatedRegisteredCourse);
    }

    const filteredCoursesAvailable = courses.filter((course) => {
        const isRegistered = registeredCourses.some((c) => c.id === studetnId && c.courseid === course.id);
        return (
            !isRegistered &&
            (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                course.title.toLowerCase().includes(searchCourse.toLowerCase()))
        );
    });

    const filteredCoursesRegistered = courses.filter((course) => {
        const isRegistered = registeredCourses.some((c) => c.id === studetnId && c.courseid === course.id);
        return (
            isRegistered &&
            (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                course.title.toLowerCase().includes(searchCourse.toLowerCase()))
        );
    });


    return (
        <div>
            
            <h2 className="Admin-page-Title">Register Courses</h2>

            <SearchCourse 
               searchCourse = {searchCourse}
               setSearch = {setSearch}
            />
            
            <h2 className="admin-subTitle">My Courses</h2>

            {filteredCoursesRegistered.length ? (
                <Course
                    courses={filteredCoursesRegistered}
                    handleRegister={handleRegister}
                    registeredCourses={registeredCourses}
                    handleDrop={handleDrop}
                />
            ) : (
                <p  className="no-avail">You are not registered in any courses</p>
            )}

            <h2 className="admin-subTitle">Courses</h2>

            {filteredCoursesAvailable.length ? (
                <Course
                    courses={filteredCoursesAvailable}
                    handleRegister={handleRegister}
                    registeredCourses={registeredCourses}
                    handleDrop={handleDrop}
                />
            ) : (
                <p  className="no-avail">No courses were found</p>
            )}

                
            <h2 className="admin-subTitle">Have a Question? </h2>

            <ContactForm
                role="student"
                id={studetnId}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                newquestion={newquestion}
                questions={questions}
            />

            <h2 className="admin-subTitle">Queries</h2>       

            
            <Response
                questions={questions}
            />

        </div>
    )
}

export default StudentPage
