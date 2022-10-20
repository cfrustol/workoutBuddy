import React from 'react';
import { useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
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
    <div >
        <div id="abtn">
        <Button id="dbbtn"onClick={()=>navigate(`/dashboard`)} >Dashboard</Button>
            <Button id="logout" onClick={handleLogout} >Log Out</Button>
        </div>
    <div id="letsAdd" >
    <div >
    <Form id="addwork" onSubmit={ SubmitWorkout } className='MainSell'>
        <h1>Lets Add a Workout {state.name}  </h1>
        
        {errors.name ? <p style={{color:"red"}}>{errors.name.message}</p>:null}
        <div> {/*name*/}
            <label>Name: </label> 
            <input type="text" onChange={ handleName} value={name}/>
        </div>
        <div> {/*Type*/}
            {errors.goal ? <p style={{color:"red"}}>{errors.goal.message}</p>:null}
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
        <div> 
            {errors.sets ? <p style={{color:"red"}}>{errors.sets.message}</p>:null}
            <label>Sets: </label> 
            <input type="number" onChange={ handleSets } min='0' value={sets}/>
        </div>
        <div> 
            {errors.reps ? <p style={{color:"red"}}>{errors.reps.message}</p>:null}
            <label>Reps: </label> 
            <input type="number" onChange={ handleReps } min='0' value={reps}/>
        </div>
        <div>
        {errors.difficulty ? <p style={{color:"red"}}>{errors.difficulty.message}</p>:null}
        <label>Difficulty: </label> 
        <select name="" id="" onChange={ handleDifficulty}>
            <option value=""></option>
                {
                    difficult.map((item,idx)=>(
                        <option key = {idx} value={item}>{item}</option>
                    ))
                }
            </select>
            </div>
        <div> 
            {errors.description ? <p style={{color:"red"}}>{errors.description.message}</p>:null}
            <label>Description: </label> 
            <input type="text" onChange={ handleDescription }  value={description}/>
        </div>
        <div> 
            {errors.instruction ? <p style={{color:"red"}}>{errors.instruction.message}</p>:null}
            <label>Instruction: </label> 
            <input type="text" onChange={ handleInstruction }  value={instruction}/>
        </div>
        
        <input id="create" type="submit" value="Add Item" />
        </Form>
    </div>
    </div>
    </div>
)
}

export default WorkoutAdd
