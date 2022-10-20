import React, {useEffect,useState, useContext} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Dashboard = () => {
  const {state, dispatch} = useContext(UserContext)
  const [workouts,setWorkouts] = useState([])
  const {id} = useParams();
  const userId = workouts.user_id
  const navigate = useNavigate()

  useEffect(() =>{
      axios.get("http://localhost:8000/api/workouts/all")
      .then(res =>{
        console.log(res.data); 
        setWorkouts(res.data);
      })
      .catch( err => console.log(err))
  }, [])

  const handleLogout = ()=>{
    console.log("logged out")
    dispatch({
      type:"LOGOUT_USER",
      payload:navigate
    })
  }

  return (
  
    <div className="">
      <div className="">
        <Button id="add" onClick={()=>navigate(`/workout/add`)} >Add Workout</Button>
        <Button id="logout" onClick={handleLogout}>Log Out</Button>
      </div>
      <Table id="dash" striped bordered hover>
            <thead className=" head">
                <tr className="">
                    <th scope=''>Name</th>
                    <th scope=''>Goal</th>
                    <th>Creator</th>
                    <th scope=''>Actions</th>
                </tr>
            </thead>
            <tbody className="">
            {
                workouts.map((workout,index)=>(
                  <tr className="" key={index}>
                      <td>{workout.name}</td>
                      <td>{workout.goal}</td>
                      {/*testing to see how we can get the users name to be displayed */}
                      <td>{workout._id}</td>
                      <td>
                        <Link to={`/workout/view/${workout._id}`}><button className="">View</button></Link>
                      </td>
                  </tr>
                ))
              }
            </tbody>
        </Table>
    </div>
  
  )
}

export default Dashboard