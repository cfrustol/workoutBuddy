import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Home = () => {
  


  const navigate = useNavigate()

  return (
<div className="container">
      
      <div className= "about">
        <div >
            <h1>Workout Buddy Is here to Help</h1>
        </div>
        <div>
            <h3>About</h3>
            <p> Explanation of how having a goal type set up and how exercise help with one another. The benefits of having both</p>
        </div>
        <div>
            <h3>Excercise Plan</h3>
            <p>Brief description of what the exercise are going to entail and the purpose of doing them.</p>
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