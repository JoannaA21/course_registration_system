import React, {useState} from "react";

import '../css/StudentLogin.css'

export const StudentLogin = () => {
    const[login, setLogin] = useState({username:'',password:''});
    const[submit,setSubmit]=useState(false);

    const handleChange=(e)=>{      
        const name = e.target.name;
        const value = e.target.value
        setLogin({...login,[name]:value});      
    }
    
    const handleSubmit =(e)=>{
        e.preventDefault()
        setLogin({username:'',password:''})
    }

    if (window.location.pathname === '/Studentlogin') {
        return(
        <>
       
            <div className="StudentLogin">
                <h1>Student Log in</h1>
                <form>
                    <input type='text' onChange={handleChange} name='username' placeholder='Username'/>
                    <input type='password' onChange={handleChange} name='password' placeholder='Password'/>
                    <button type="submit" onClick={handleSubmit}>Log In</button>
                </form>
            </div>    
        </>
        )

    } else {
        return(
        <>
       
            <div className="StudentLogin">
                <h1>Admin Log in</h1>
                <form>
                    <input type='text' onChange={handleChange} name='username' placeholder='Username'/>
                    <input type='password' onChange={handleChange} name='password' placeholder='Password'/>
                    <button type="submit" onClick={handleSubmit}>Log In</button>
                </form>
            </div>    
        </>
        )

    }
}