import { useState } from "react"
import { CourseList } from "./adminData"    
import Course from "./Course"
import SearchCourse from './SearchCourse'

//Student search courses (list of courses available)
export const StudentRegisterCourse = () => {
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

    //Student register for courses
    const handleRegister = (course) => {
        const studId = {StudentId: token.id, course}
        const storedCourse = localStorage.getItem('course')
        let existingCourse = []

        if(storedCourse){
            existingCourse = JSON.parse(storedCourse)
        }

        existingCourse.forEach(e =>{
            document.querySelector(`#root > div > ul > li:nth-child(${e.course.id}) > button:nth-child(7)`).style.display = 'none'
            // console.log(e.course.id)
        })

        existingCourse.push(studId)

        localStorage.setItem('course', JSON.stringify(existingCourse))
    }

    return(
        <>
         <SearchCourse
            searchCourse = {studentSearch}
            setSearch = {setStudentSearch}
            />
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

//Student information after logged in
export const StudentInformation = () => {
    const token = JSON.parse(localStorage.getItem('loggedIn'))
    if (!token) window.location.href = 'login'

    //
    const getCourse = JSON.parse(localStorage.getItem('course'))
    getCourse.forEach(e => {
        if(token.id === e.StudentId){
            console.log(e.course)
        }
        //console.log(e.StudentId)
    })
    return(
        <div>
            <h2>{token.role}</h2>
            <p><b>Program: </b>{token.program} </p>
            <p><b>Department: </b>{token.department} </p>
            <p><b>Username: </b> {token.username}</p>
            <p><b>First name: </b>{token.fname} </p>
            <p><b>Last name: </b>{token.lname} </p>
            <p><b>Email: </b>{token.email} </p>
            <p><b>Phone: </b>{token.phone} </p>
            <p><b>DOB: </b>{token.dob}</p>
            
        </div>
    )
}
