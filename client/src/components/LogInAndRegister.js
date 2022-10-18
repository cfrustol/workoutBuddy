import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'


const LogInAndRegister= () => {

    const navigate = useNavigate()

    return (
    <div >

        <div className="" >
        <h3>Register</h3>
            <form className="" >
                <div className="">
                    <label htmlFor="">First Name:</label>
                    <input  className="form-control"  name="firstName" type="text" />
                </div>
                <div className="">
                    <label htmlFor="">Last Name:</label>
                    <input className="form-control"  name="lastName" type="text" />
                </div>
                <div className="">
                    <label htmlFor="">Email:</label>
                    <input className="form-control"  name="email" type="email" />
                </div>
                <div className="">
                    <label htmlFor="">Password:</label>
                    <input  className="form-control"  name="password" type="password" />
                </div>
                <div className="">
                    <label htmlFor="">Confirm Password:</label>
                    <input className="form-control"  name="confirmPassword" type="text" />
                </div>
                <div className="row">
                    <button className="btn hover hover-success" type="submit">Register</button>
                </div>
            </form>
        </div>

        <div  >
        <h3>Login</h3>
        
        <form  >
            
            <div >
                <label htmlFor="">Email:</label>
                <input className="form-control"  name="email" type="email" />
            </div>
            <div >
                <label htmlFor="">Password:</label>
                <input className="form-control"  name="password" type="password" />
            </div>
            
            <div >
                <button className="btn hover hover-success" type="submit">Login</button>
            </div>




        </form>


    </div>
    </div>
  
)
}

export default LogInAndRegister
