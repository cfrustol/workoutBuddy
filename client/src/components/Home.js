import React from 'react'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  


  const navigate = useNavigate()




  return (
  
    <div className="container">
      <div className="header">
        <button onClick={()=>navigate(`/register`)} >LogIn or Register</button>
      </div>
      
    
      <div>
        <div>
            <h1>Workout Buddy Us here to Help</h1>
        </div>
        <div>
            <h3>About</h3>
            <p> Explanation of how having a goal type set up and how excercise help with one another. The benefits of having both</p>
        </div>
        <div>
            <h3>Excercise Plan</h3>
            <p>Brief description of what the exercise are going to entail and the purpose of doing them.</p>
        </div>
        <div>
            <h3>Goal Types</h3>
            <p>Explaining the goal different types such as Balance,Flexibitly, Strength and Endurance</p>
        </div>
      </div>
      
    </div>
  
  )
}

export default Home