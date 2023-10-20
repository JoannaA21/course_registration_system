const Course = ({courses, handleDelete, handleRegister, handleDrop, handleExchange}) => {
    //Maps through all the courses data and displays it
    return (
        <ul>
            {courses.map((course) => (
                <li className="displayCourseContainer" key={course.id}>
                    <h2 className="displayCourseH2">{course.code} : {course.title}</h2>
                    <p className="displayCourseDetails">Course Start Date : {course.startdate}</p>
                    <p className="displayCourseDetails">Course End Date :  {course.enddate}</p>
                    <p className="displayCourseDetails">Course Schedule : {course.days}</p>
                    <p className="displayCourseDetails">Course Time : {course.starttime} - {course.endtime}</p>
                    <p className="displayCourseDetails">Course Instructor : {course.instructor}</p>
                    {/* <button className="displayCourseRegister" onClick={ ()=> handleDelete(course.id)}>Delete</button> */}
                    {handleDelete ? <button className="displayCourseRegister" onClick={ ()=> handleDelete(course.id)}>Delete</button> : null }
                    <button className="displayCourseRegister" onClick={ ()=> handleRegister(course)}>Register</button>
                    <button className="displayCourseRegister" onClick={ ()=> handleExchange(course)}>Exchange</button>
                    <button className="displayCourseRegister" onClick={ ()=> handleDrop(course)}>Drop</button>
                </li>
            ))}
        </ul>
    )
}


export default Course
