import React from 'react';
import { useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const WorkoutAdd = () => {
    const {state, dispatch} = useContext(UserContext)
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [description, setDescription] = useState("")
    const [instruction, setInstruction] = useState("")
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const Goaltypes = [
        'Balance',
        'Flexibility',
        'Strength',
        'Endurance',
    ]

    const difficult = [
        'beginner',
        'intermediate',
        'advanced',
    ]

    const handleName = (e)=>{
        setErrors("")
        setName(e.target.value)
    }
    const handleGoal = (e)=>{

        setErrors("")
        setGoal(e.target.value)
    }

    const handleSets = (e)=>{
        setErrors("")
        setSets(e.target.value)
    }
    const handleReps = (e)=>{

        setErrors("")
        setReps (e.target.value)
    }
    const handleDifficulty = (e)=>{

        setErrors("")
        setDifficulty(e.target.value)
    }

    const handleDescription = (e)=>{

        setErrors("")
        setDescription(e.target.value)
    }
    const handleInstruction = (e)=>{

        setErrors("")
        setInstruction(e.target.value)
    }

    const SubmitWorkout = (e) => {
        e.preventDefault()
            const workout={
                name,
                goal,
                sets,
                reps,
                difficulty,
                description,
                instruction,
            }
            axios.post("http://localhost:8000/api/workouts",workout, {withCredentials:true})
            .then((workout)=>{
                console.log(workout)
                navigate("/dashboard")
            })
            .catch((err)=>{
                console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
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
        <button onClick={()=>navigate(`/dashboard`)} >Dashboard</button>
            <button onClick={handleLogout} >Log Out</button>
        </div>
    <div  >
    <div >
    <h1>Lets Add a Workout {state.name}  </h1>
        <form onSubmit={ SubmitWorkout } className='MainSell'>
        
        {errors.name ? <p style={{color:"red"}}>{errors.name.message}</p>:null}
        <div> {/*name*/}
            <label>Name: </label> 
            <input type="text" onChange={ handleName} value={name}/>
        </div>
        {errors.type ? <p style={{color:"red"}}>{errors.type.message}</p>:null}
        <div> {/*Type*/}
            <label>Type: </label> 
            <select name="items" id="items" onChange={ handleGoal}>
            <option value="" ></option>
                {
                    Goaltypes.map((item,idx)=>(
                        <option key = {idx} value={item}>{item}</option>
                    ))
                }
            </select>
        </div>
        {errors.sku ? <p style={{color:"red"}}>{errors.sku.message}</p>:null}
        <div> 
            <label>Sets: </label> 
            <input type="number" onChange={ handleSets } value={sets}/>
        </div>
        <div> 
            <label>Reps: </label> 
            <input type="number" onChange={ handleReps } value={reps}/>
        </div>
        {errors.price ? <p style={{color:"red"}}>{errors.price.message}</p>:null}
        <label>Difficulty: </label> 
        <select name="" id="" onChange={ handleDifficulty}>
            <option value="" ></option>
                {
                    difficult.map((item,idx)=>(
                        <option key = {idx} value={item}>{item}</option>
                    ))
                }
            </select>
        <div> 
            <label>Description: </label> 
            <input type="text" onChange={ handleDescription }  value={description}/>
        </div>
        <div> 
            <label>Instruction: </label> 
            <input type="text" onChange={ handleInstruction }  value={instruction}/>
        </div>
        
        <input type="submit" value="Add Item" />
        </form>
    </div>
    </div>
    </div>
)
}

export default WorkoutAdd
