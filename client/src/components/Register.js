import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';


const Register = ({user, setLoggedIn}) => {
    const {state,dispatch} = useContext(UserContext);
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState("");  
    const [errors, setErrors] = useState({});
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("current state")
        console.log(state)
        user && navigate('/')
    },[user])
    
    const handleRegister = (e) => {
        e.preventDefault();
       
        axios.post('http://localhost:8000/api/register/', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, {withCredentials:true})
            .then(res=>{
                dispatch({
                type:"SET_USER",
                payload:res.data
                })
                setLoggedIn(true)
                console.log(res);
                console.log(res.data);
                console.log("updated current state")
                console.log(state)
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err.response.data.error.errors);
                setErrors(err.response.data.error.errors);
            })
    ;
    }

    return (
    <div>
        <div>
            <div>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div>
                        <div>
                            <label>First Name:</label>
                            <input type="text" name="firstName" id="firstName" onChange = {(e)=>setFirstName(e.target.value)}/>
                            {errors.firstName ? <p>{errors.firstName.message}</p> : null}
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" name="lastName" id="lastName" onChange = {(e)=>setLastName(e.target.value)}/>
                            {errors.lastName ? <p>{errors.lastName.message}</p> : null}
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" onChange = {(e)=>setEmail(e.target.value)}/>
                            {errors.email ? <p>{errors.email.message}</p> : null}
                            {error ? <p>{error}</p> : null}
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange = {(e)=>setPassword(e.target.value)}/>
                            {errors.password ? <p>{errors.password.message}</p> : null}
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                            {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : null}
                        </div>
                        
                    </div>
                    <input value={"Register"} type="submit"/>
                </form>
            </div>
        </div>
    </div>
    )
}
export default Register;
