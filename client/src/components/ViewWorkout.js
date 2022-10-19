import axios from 'axios'
import {UserContext} from '../context/UserContextProvider'
import {useEffect,useState,useContext} from 'react'
import {Link,useParams,useNavigate } from 'react-router-dom'

const ItemView = () => {

    const navigate = useNavigate()
    const {state} = useContext(UserContext)
    const [workout,setWorkout] = useState({})
    const {id} = useParams() 


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/workouts/view/${id}`,{withCredentials:true})
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
    
    

return (
    <div>
        <div >
            <button onClick={()=>navigate(`/dashboard`)} >Dashboard</button>
            <button onClick={()=>navigate(`/logout`)} >Log Out</button>
        </div>
        <div >
            <p>Name: {workout.name}</p>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Goal Type: {workout.type}</p>
            <p>Sets: {workout.sets}</p>
            <p>Reps: {workout.reps}</p>
            <p>Description: {workout.description}</p>
            <p>Instruction: {workout.instructions}</p>
            <Link to={`/api/workouts/edit/${workout._id}`}><button>Edit</button></Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
)
}

export default ItemView