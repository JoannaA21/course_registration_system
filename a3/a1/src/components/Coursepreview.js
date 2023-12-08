import { useState } from "react";
import { CourseList } from "./adminData";
import Course from "./Course";
import SearchCourse from './SearchCourse';
import ContactForm from "./ContactForm";
import Response from './Response';
import StudentHeader from './studentNav';
import '../css/student.css';
import BVCLogo from '../css/BVCLogo.png'

//Student search courses (list of courses available)
export const StudentCourse = () => {


    //Declare a State for the list of Courses to be displayed on the registration
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('ListofCourses')) || CourseList);
    //Define a State for the Search Components
    const [searchCourse, setSearchCourse] = useState('');



    const loginas = () => {
        window.location.href = '/'
    }

    return (
        <>
            <div className="Student_info_body">

                <div className="adminpage">

                    <nav className="navbar">
                    <div className="container">
                        <ul className="navbar-nav">
                            <li>
                            <img src={BVCLogo} className='BVCHeaderCoursePreview'></img>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link coursePreviewLogin" onClick={loginas}>Log in</a>
                            </li>
                        </ul>
                        </div>
                    </nav>

                    <SearchCourse
                        searchCourse={searchCourse}
                        setSearch={setSearchCourse}
                    />

                    <Course
                            courses={courses}
                        />

                </div>
            </div>
        </>
    );
};
