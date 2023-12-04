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

import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios"

import '../css/Register.css';

export const Registration = () => {
    const [student, setStudents] = useState({ fname: "", lname: "", email: "", phone: "", dob: "", department: "", program: "", username: "", password: "", confirmpassword: "" });
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState(null);

    const handleData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudents({ ...student, [name]: value });
    };

    // const handleSubmit = (e) =>{
    //     e.preventDefault()
    //     setSubmit(true)
    //     console.log(student)

    //     // student key/value pairs will be saved in studentData
    //     const studentData = JSON.stringify(student)
    //     localStorage.setItem('studentdata', studentData)
    // }
    const navigate = useNavigate();
    //Generate studentid/studentdata
    const handleSubmit = async () => {
    try {
        
        const studentSignup = {
            fname: student.fname, 
            lname: student.lname, 
            email: student.email, 
            phone: student.phone, 
            dob: student.dob, 
            department: student.department, 
            program: student.program, 
            username: student.username, 
            password: student.password
        }
        console.log(studentSignup);
        const response = await Axios.post('http://localhost:3001/signup', studentSignup);
        console.log(response);
        if (response.status === 201){
            alert('Registration successful!');
            window.location.replace('login')
        }
        
    } catch (error) {
        console.error('There is an error :(', error);
    }
        // if(isSignedUp === 201) {
        //     setSubmit = true;
        //     window.location.href = 'login'
        // }
        // else{
        //     setSubmit = false;
        //     alert("Registration error.")
        // }
        // e.preventDefault();
        // console.log(student.length);

        // const storedData = localStorage.getItem('studentdata');
        // let existingData = [];

        // if (storedData) {
        //     existingData = JSON.parse(storedData);
        // }

        // const newUsername = student.username;
        // const usernameExists = existingData.some(item => item.username === newUsername);
        // const newUserpass = student.password;
        // const newUserconfirmPass = student.confirmpassword;

        // if (usernameExists) {
        //     console.log('Username already exists.');
        //     alert('Username already exists.')
        //     setSubmit(false);
        // } else if (!newUserpass || !newUserconfirmPass || newUserpass !== newUserconfirmPass) {
        //     console.log('Password are not the same.');
        //     alert('Oops. Password did not match.')
        //     document.querySelector("#root > div > div > form > input[type=password]:nth-child(12)").focus()
        //     setSubmit(false);
        // }  else {
        //     const nextId = existingData.length > 0 ? existingData[existingData.length - 1].id + 1 : 2024;
        //     const studentData = {
        //         id: nextId,
        //         ...student
        //     };
        //     existingData.push(studentData);
        //     localStorage.setItem('studentdata', JSON.stringify(existingData));
        //     console.log('Updated student data:', studentData);
        //     setSubmit(true);
        //     alert('Registration successful!')
        //     window.location.href = 'login'
        // }
    };

    return (
        <>
            <div className="RegisterStudent-component">
                <form onSubmit={handleSubmit}>
                    <h1>Bow Valley College</h1>
                    <h3>Registration Form</h3>
                    <input type='text' id='' value={student.fname} name='fname' onChange={handleData} placeholder='First name' />
                    <input type='text' id='' value={student.lname} name='lname' onChange={handleData} placeholder='Last name' />
                    <input type='text' id='' value={student.email} name='email' onChange={handleData} placeholder='Email' />
                    <input type='number' id='' value={student.phone} name='phone' onChange={handleData} placeholder='Phone number' />
                    <input type='date' id='' value={student.dob} name='dob' onChange={handleData} placeholder='Date of Birth' />
                    <input type='text' id='' value={student.department} name='department' onChange={handleData} placeholder='Department' />
                    <input type='text' id='' value={student.program} name='program' onChange={handleData} placeholder='Program' />
                    <input type='text' id='' value={student.username} name='username' onChange={handleData} placeholder='Username' />
                    <input type='password' id='' value={student.password} name='password' onChange={handleData} placeholder='Password' />
                    <input type='password' id='' value={student.confirmpassword} name='confirmpassword' onChange={handleData} placeholder='Confirm Password' />
                    <button type="submit">Register</button>
                    <a href="/" className="alreadyHaveAnAccount">Already have an account?</a>
                </form>

            </div>
        </>
    );
}
