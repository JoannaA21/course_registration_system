// Register Student

// - Generate student ID successful registration and redirect to Login Page.
// - Registration form
//     - First name
//     - Last name
//     - Email
//     - Phone number
//     - Date of Birth (DOB)
//     - Department
//     - Program
//     - Username
//     - Password

import React, {useState} from 'react'
import '../css/Register.css'

export const Registration = () =>{
    const[student, setStudents] = useState({fname:"", lname:"", email:"", phone:"", dob:"", dept:"", program:"", username:"", password:"", confirmpassword:""})
    const[submit, setSubmit]=useState(false)

    const handleData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudents({...student,[name]:value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        setSubmit(true)
        console.log(student)

        // student key/value pairs will be saved in studentData
        const studentData = JSON.stringify(student)
        localStorage.setItem('studentdata', studentData)
    }
    
    return(
        <>
        <div className="RegisterStudent-component">
        <form onSubmit={handleSubmit}>
            <h1>Bow Valley College</h1>
            <h3>Registration Form</h3>
            <input type='text' id='' value={student.fname} name='fname' onChange={handleData} placeholder='First name'/>
            <input type='text' id='' value={student.lname} name='lname' onChange={handleData} placeholder='Last name'/>
            <input type='text' id='' value={student.email} name='email' onChange={handleData} placeholder='Email'/>
            <input type='number' id='' value={student.phone} name='phone' onChange={handleData} placeholder='Phone number'/>
            <label className="dob">Date of Birth</label>
            <input type='date' id='' value={student.dob} name='dob' onChange={handleData} placeholder='Date of Birth'/>
            <input type='text' id='' value={student.department} name='department' onChange={handleData} placeholder='Department'/>
            <input type='text' id='' value={student.program} name='program' onChange={handleData} placeholder='Program'/>
            <input type='text' id='' value={student.username} name='username' onChange={handleData} placeholder='Username'/>
            <input type='password' id='' value={student.password} name='password' onChange={handleData} placeholder='Password'/>
            <input type='password' id='' value={student.confirmpassword} name='confirmpassword' onChange={handleData} placeholder='Confirm Password'/>
            <button type="submit">Register</button>
        </form>
        </div>
        </>
    )
}

