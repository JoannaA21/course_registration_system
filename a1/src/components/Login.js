import React, {useState} from "react";

import '../css/Login.css'
import {AdminUsers} from './adminUsers'

export const Login = () => {
    //student
    const[studentlogin, setStudent] = useState({username:'',password:''});
    const[submitstd,setSubmitStd]=useState(false);

    //admin
    const[adminlogin, setAdmin] = useState({username:'',password:''});
    const[submitadm,setSubmitAdm]=useState(false);
    const handleChangeForAdmin = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAdmin({...adminlogin,[name]:value})
    }

    const handleSubmitForAdmin = (e) => {
        e.preventDefault()
        setSubmitAdm({username:'', password:''})

        AdminUsers.forEach(element => {
            if(element.username === adminlogin.username && element.password === adminlogin.password){
                window.location.href = 'admin'
            }
            else{
                alert('Username and password does not match.')
            }
        });

        
    }

    const handleChangeForStudent=(e)=>{      
        const name = e.target.name;
        const value = e.target.value
        setStudent({...studentlogin,[name]:value});
    }
    
    const handleSubmitForStudent =(e)=>{
        e.preventDefault()
        setSubmitStd({username:'',password:''})

        const studentData = localStorage.getItem('studentdata')
        const data = JSON.parse(studentData)
        
        if(data.username === studentlogin.username && data.password === studentlogin.password){
            window.location.href = '/studentprofile'
        }
        else{
            alert('Username and password does not match.')
        }
    }

    if (window.location.pathname === '/login') {
        return(
        <>
       
            <div className="Login">
                <h1>Student Log in</h1>
                <form>
                    <input type='text' onChange={handleChangeForStudent} name='username' placeholder='Username'/>
                    <input type='password' onChange={handleChangeForStudent} name='password' placeholder='Password'/>
                    <button type="submit" onClick={handleSubmitForStudent}>Log In</button>
                </form>
            </div>    
        </>
        )

    } else {
        return(
        <>
            <div className="Login">
                <h1>Admin Log in</h1>
                <form>
                    <input type='text' onChange={handleChangeForAdmin} name='username' placeholder='Username'/>
                    <input type='password' onChange={handleChangeForAdmin}  name='password' placeholder='Password'/>
                    <button type="submit" onClick={handleSubmitForAdmin}>Log In</button>
                </form>
            </div>    
        </>
        )

    }
}