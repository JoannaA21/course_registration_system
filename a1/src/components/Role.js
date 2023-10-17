import '../css/Role.css'

export const Role = () => {
    const StudentPath = () => {
        window.location.href = "/Studentlogin"
        console.log("Student path")
        //router
    }

    const AdminPath = () => {
        window.location.href = "/Admin"
        console.log("Admin path")
        //router
    }

    return(
    <>
    <div className="role-component">
        <h1>Log in</h1>
            <div className="role">
                <h2>I am</h2>
                <button type="button" onClick={StudentPath}>a Student</button>
                <button type="button" onClick={AdminPath}>an Admin</button>
            </div>
    </div>
    </>
    )
}