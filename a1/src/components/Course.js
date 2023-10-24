const Course = ({ courses, handleDelete, handleRegister, handleDrop, handleExchange }) => {
    //Maps through all the courses data and displays it
    return (
        <ul>
            {courses.map((course) => (
                <li className="displayCourseContainer" id={`courseContainer-${course.id || course.course.id}`} key={course.id || course.course.id}>
                    <h2 className="displayCourseH2">{course.code || course.course.code} : {course.title || course.course.title}</h2>
                    <p className="displayCourseDetails">Course Start Date : {course.startdate || course.course.startdate}</p>
                    <p className="displayCourseDetails">Course End Date :  {course.enddate || course.course.enddate}</p>
                    <p className="displayCourseDetails">Course Schedule : {course.days || course.course.days}</p>
                    <p className="displayCourseDetails">Course Time : {course.starttime || course.course.starttime} - {course.endtime || course.course.endtime}</p>
                    <p className="displayCourseDetails">Course Instructor : {course.instructor || course.course.instructor}</p>
                    {/* <button className="displayCourseRegister" onClick={ ()=> handleDelete(course.id)}>Delete</button> */}
                    {handleDelete ? <button className="displayCourseRegister" onClick={() => handleDelete(course.id || course.course.id)}>Delete</button> : null}
                    {handleRegister ? <button className="displayCourseRegister" id={`courseRegister-${course.id || course.course.id}`} onClick={() => handleRegister(course)}>Register</button> : null}
                    {handleExchange ? <button className="displayCourseRegister" onClick={() => handleExchange(course || course.course)}>Exchange</button> : null}
                    {handleDrop ? <button className="displayCourseRegister" onClick={() => handleDrop(course || course.course)}>Drop</button> : null}
                </li>
            ))}
        </ul>
    );
};


export default Course;
