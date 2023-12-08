import '../css/Role.css'

export const Role = () => {
    const StudentPath = () => {
        window.location.href = "/login"
        console.log("Student path")
        //router
    }

    const AdminPath = () => {
        window.location.href = "/adminlogin"
        console.log("Admin path")
        //router
    }

    const PublicCoursePath = () => {
        window.location.href = "/coursepreview"
        console.log("Course preview path")
    }

    return(
    <>
    <div className="role-component">
        <h1>LOGIN AS</h1>
            <div className="role">
                {/* <h2>AS</h2> */}
                <button type="button" onClick={StudentPath}>a Student</button>
                <button type="button" onClick={AdminPath}>an Admin</button>
            </div>

            <div className="publicCourse">
                <button type="button" onClick={PublicCoursePath}>View Available Courses</button>
            </div>
    </div>
    </>
    )
}