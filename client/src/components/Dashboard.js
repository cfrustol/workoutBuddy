import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';


const Dashboard = () => {
  const [workouts,setWorkouts] = useState([])
  const {id} = useParams();
  const userId = workouts.user_id
  const navigate = useNavigate()

  useEffect(() =>{
      axios.get("http://localhost:8000/api/workouts/all")
      .then(res =>{
        console.log(res.data)  
        setWorkouts(res.data);
      })
      .catch( err => console.log(err))
  }, [])

  return (
  
    <div className="">
      <div className="">
        <button onClick={()=>navigate(`/workout/add`)} >Add Workout</button>
        <button>Log Out</button>
      </div>
      <table className="">
            <thead className=" ">
                <tr className="">
                    <th scope=''>Name</th>
                    <th scope=''>Goal</th>
                    <th scope=''>Actions</th>
                </tr>
            </thead>
            <tbody className="">
            {
                workouts.map((workout,index)=>(
                  <tr className="" key={index}>
                      <td>{workout.name}</td>
                      <td>{workout.goal}</td>
                      <td>
                        <Link to={`/workouts/${workout._id}`}><button className="">View</button></Link>
                      </td>
                  </tr>
                ))
              }
            </tbody>
        </table>
    </div>
  
  )
}

export default Dashboard