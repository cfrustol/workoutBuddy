import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';


const Login = ({setLoggedIn}) => {
    const {state,dispatch} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("current state")
        console.log(state)
        state.user && navigate('/dashboard')
    },[state.user])

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            email,
            password,
        }, {withCredentials:true})
            .then(res => {
                
                dispatch({
                type:"SET_USER",
                payload:res.data
                })
            
                setLoggedIn(true)
                console.log("updated current state")
                console.log(state)
                navigate('/dashboard')
                })

            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data.error);
      });
    }

    return (
    <div>
        <div>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" onChange = {(e)=>setEmail(e.target.value)}/>
                            {errors ? <p>{errors}</p> : null}
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange = {(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <input value={"Login"} type="submit"/>
                </form>
            </div>
        </div>
    </div>
    )
}
export default Login;
