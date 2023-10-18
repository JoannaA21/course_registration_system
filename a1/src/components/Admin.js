import AddCourse from "./AddCourse"
import Course from "./Course"
import SearchCourse from "./SearchCourse"
import { useState } from "react"
import "../css/admin.css"


export const Admin = () => {

//Courses Data to be Displayed
const [courses, setCourse] = useState(JSON.parse(localStorage.getItem('ListofCourses') || []));

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

//Function that pushes the new data to the courses array object and stores the data on the local storage
const setAndSaveCourse = (newCourse) => {
  setCourse(newCourse);
  localStorage.setItem('ListofCourses', JSON.stringify(newCourse));
}

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
  const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
  const newCourseItem = { id, ...newCourse };
  const updatedCourses = Array.isArray(courses) ? [...courses, newCourseItem] : [newCourseItem];;
  setAndSaveCourse(updatedCourses);

  setNewCourse(initialNewCourse);
};
  

    return (
        <div className="adminpage">
            <AddCourse
                courses={courses}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                newCourse ={newCourse}
            />

            <SearchCourse
            searchCourse = {searchCourse}
            setSearch = {setSearch}
            />

            {/* Displaying Courses */}

            {courses.length ? (
                <Course
                    courses={courses.filter(course =>
                                            course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                                            course.title.toLowerCase().includes(searchCourse.toLowerCase())
                                    )}
                    handleDelete={handleDelete}
                />
            ) : (
                <p style={{
                    fontSize:'2rem',
                    fontWeight:'bolder',
                    display:'flex',
                    justifyContent: 'center',
                    margin: '4rem'}}>There are no available Courses</p>
            )}
        </div>
    )
}
