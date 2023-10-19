import { useState } from "react"
import { CourseList } from "./adminData"    
import Course from "./Course"

export const StudentProfile = () => {
    const token = JSON.parse(localStorage.getItem('loggedIn'))
    if (!token) window.location.href = 'login'
    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('ListofCourses') || JSON.stringify(CourseList) ));
    let [studentSearch, setStudentSearch] = useState('');
    const[searchBtn,setSearchButton]=useState(false);

    const handleSearch = (e) => {
    e.preventDefault()
    setSearchButton({search}.SearchCourse)

    const course = {search}.filter((c)=> c.code.toLowerCase() === studentSearch.toLowerCase() 
    || c.title.toLowerCase() === studentSearch.toLowerCase())
    }

    const handleRegister = () => {

    }

    return(
        <>
             <Course
                    courses={search.filter(course =>
                                            course.code.toLowerCase().includes(studentSearch.toLowerCase()) ||
                                            course.title.toLowerCase().includes(studentSearch.toLowerCase())
                                    )}
                    handleDelete={""}
                    handleRegister={handleRegister}
                />
        </>
    )
}