// const Course = ({ courses, handleDelete, handleRegister, handleDrop, handleExchange }) => {
//     //Maps through all the courses data and displays it
//     return (
//         <ul>
//             {courses.map((course) => (
//                 <li className="displayCourseContainer" key={course.id}>
//                     <h2 className="displayCourseH2">{course.code} : {course.title}</h2>
//                     <p className="displayCourseDetails">Course Start Date : {course.startdate}</p>
//                     <p className="displayCourseDetails">Course End Date :  {course.enddate}</p>
//                     <p className="displayCourseDetails">Course Schedule : {course.days}</p>
//                     <p className="displayCourseDetails">Course Time : {course.starttime} - {course.endtime}</p>
//                     <p className="displayCourseDetails">Course Instructor : {course.instructor}</p>
//                     {/* <button className="displayCourseRegister" onClick={ ()=> handleDelete(course.id)}>Delete</button> */}
//                     {handleDelete ? <button className="displayCourseRegister" onClick={() => handleDelete(course.id)}>Delete</button> : null}
//                     {handleRegister ? <button className="displayCourseRegister" id={`courseRegister-${course.id}`} onClick={() => handleRegister(course)}>Register</button> : null}
//                     {handleExchange ? <button className="displayCourseRegister" onClick={() => handleExchange(course)}>Exchange</button> : null}
//                     {handleDrop ? <button className="displayCourseRegister" onClick={() => handleDrop(course)}>Drop</button> : null}
//                 </li>
//             ))}
//         </ul>
//     );
// };


// export default Course;
const Course = ({ courses, handleDelete, handleRegister, handleDrop, handleExchange, registeredCourses }) => {
    // Get the data of the user logged in
    const data = JSON.parse(localStorage.getItem('loggedIn'));

    // Maps through all the courses data and displays them
    return (
        <div className="courseGrid">
            {courses.map((course) => {
                // Check if the student is registered in the current course
                const isRegistered = Array.isArray(registeredCourses) && registeredCourses.some(c => c.id === data.id && c.courseid === course.id);

                return (
                    <li className="displayCourseContainer" id={`courseContainer-${course.id || course.course.id}`} key={course.id}>
                        <div className="displayCourseHeader displayCourseHeaderBackground">
                            {course.code || course.course.code} : {course.title || course.course.title}
                        </div>
                        <p className="displayCourseDetails">Course Start Date : {course.startdate || course.course.startdate}</p>
                        <p className="displayCourseDetails">Course End Date :  {course.enddate || course.course.enddate}</p>
                        <p className="displayCourseDetails">Course Schedule : {course.days || course.course.days}</p>
                        <p className="displayCourseDetails">Course Time : {course.starttime || course.course.starttime} - {course.endtime || course.course.endtime}</p>
                        <p className="displayCourseDetails">Course Instructor : {course.instructor || course.course.instructor}</p>
                        {/* {handleDelete ? <button className="displayCourseRegister" onClick={() => handleDelete(course.id)}>Delete</button> : null} */}
                        {/* {handleRegister ? <button className="displayCourseRegister" id={`courseRegister-${course.id}`} onClick={() => handleRegister(course)}>Register</button> : null} */}
                        {handleExchange ? <button className="displayCourseRegister" onClick={() => handleExchange(course)}>Exchange</button> : null}
                        {/* {handleDrop ? <button className="displayCourseRegister" onClick={() => handleDrop(course)}>Drop</button> : null} */}
                        {handleDelete && <button className="displayCourseRegister displayCourseDelete" onClick={() => handleDelete(course.id)}>Delete</button>}
                        {isRegistered ? (
                            handleDrop && <button className="displayCourseRegister displayCourseDrop" onClick={() => handleDrop(course.id)}>Drop</button>
                        ) : (
                            handleRegister && <button className="displayCourseRegister" onClick={() => handleRegister(course.id)}>Register</button>
                        )}
                    </li>
                );
            })}
        </div>
    );
};

export default Course;