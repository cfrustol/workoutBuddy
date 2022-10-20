import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'
import {useEffect,useState,useContext} from 'react'
import {Link,useParams,useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const ItemView = () => {

    const navigate = useNavigate()
    const {state, dispatch} = useContext(UserContext)
    const [workout,setWorkout] = useState({})
    const {id} = useParams() 


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/workouts/${id}`,{withCredentials:true})
        .then((res) =>{
            console.log(res.data)  
            setWorkout(res.data)
        })
        .catch((err) =>{
            console.log(err)   
        })
    },[])

    const handleDelete=()=>{
        axios.delete(`http://localhost:8000/api/workouts/${id}`,{withCredentials:true})
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
    <div>
        <div >
            <Button id="dbbtn" onClick={()=>navigate(`/dashboard`)} >Dashboard</Button>
            <Button id="logout" onClick={handleLogout} >Log Out</Button>
        </div>
        <div id="viewW">
            <p>Name: {workout.name}</p>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Goal Type: {workout.goal}</p>
            <p>Sets: {workout.sets}</p>  
            <p>Reps: {workout.reps}</p>
            <p>Description: {workout.description}</p>
            <p>Instruction: {workout.instruction}</p>
            <div className="row">
                <Button onClick = {()=>navigate(`/workout/edit/${id}`)} id="editb">Edit</Button>
                <Button id="dletb" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    </div>
)
}

export default ItemView