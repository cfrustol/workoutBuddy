import React from 'react'
import { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';


const WorkoutList = () => {
  const {state,dispatch} = useContext(UserContext);
  const [workouts,setWorkouts] = useState([])


  const navigate = useNavigate()



  useEffect(() =>{
      axios.get("http://localhost:8000/api/workouts")
      .then((workoutList) =>{
        setWorkouts(workoutList.data.Workouts)
          console.log(workoutList)  
      })
      .catch((err) =>{
          console.log(err)   
      })
  },[])

  const handleDelete=(id)=>{
    axios.delete(`http://localhost:8000/api/workouts/${id}`)
    .then((res)=>{
    console.log(res)
    navigate('/dashboard')
    })
    .catch((err)=>{
    console.log(err)
    })
  }

  const handleLogout = ()=>{
  console.log("logged out")
  dispatch({
    type:"LOGOUT_USER",
    payload:navigate
  })
  }

  return (
  
    <div className="container">
      <div className="header">
        <button onClick={()=>navigate(`/workout/add`)} >Add Workout</button>
        <button onClick={handleLogout} >Log Out</button>
      </div>
      
    
      <div >
            <table>
              <tbody>
                    <tr>
                      <th>Workout Name</th>
                      <th>Goal</th>
                      <th>Creator</th>
                      <th>Actions</th>
                    </tr>
                        {
                        workouts.map((item,idx)=>(
                              <tr key={idx}> 
                                <td>{item.name}</td>   
                                <td>{item.goal}</td>
                                <td>{item.creator}</td>
                                <td>
                                <button onClick={()=>navigate(`/workout/edit/${item._id}`)} >Edit</button> 
                                <button onClick={()=>navigate(`/workout/view/${item._id}`)} >View</button> 
                                <button onClick={() => handleDelete(item._id)} >Delete </button>
                                </td>
                              </tr>
                          )
                          )
                        } 
              </tbody>
            </table>
        </div>
      
    </div>
  
  )
}

export default WorkoutList