import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import WB from '../assets/wb.jpg'


const Home = () => {
  


  const navigate = useNavigate()

  return (
<div className="container">
      
      <div className= "about">
        <div >
            <h1>Workout Buddy Is Here To Help</h1>
        </div>
        <div>
          <img src={WB} style={{height:'400px',width:'400px', borderRadius:100}} alt="test"></img>
        </div>
        <div>
            <h3>About</h3>
            <p> Workout Buddy(WB) is where you can create exercises that are based upon goal types you want to achieve. WB is so easy to use, even your pet will want to get in the action. </p>
        </div>
        <div>
            <h3>Excercise Plan</h3>
            <p>An exercise plan acts as a roadmap that clearly identifies the steps you need to take to reach your desired destination. Without a plan you will be relying on a lot of luck to get you where you want to be</p>
        </div>
        <div>
            <h3>Goal Types</h3>
            <p>Explaining the goal different types such as Balance, Flexibility, Strength and Endurance</p>
        </div>
      </div>
      <div className="header">
        <Button bsstyle="primary" id="navb" onClick={()=>navigate(`/register`)} >LogIn or Register</Button>
      </div>
      
    </div>
  
  )
}

export default Home