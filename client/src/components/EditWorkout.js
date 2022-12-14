import React from 'react';
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import Button from 'react-bootstrap/Button';


const EditWorkout = () => {
    const {state, dispatch} = useContext(UserContext)
    const {id} = useParams()
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

    useEffect((_id)=>{
        axios.get(`http://localhost:8000/api/workouts/${id}`)
        .then((res) =>{
            console.log(res.data.goal)  
            setName(res.data.name) 
            setGoal(res.data.goal) 
            setSets(res.data.sets) 
            setReps(res.data.reps) 
            setDifficulty(res.data.difficulty)  
            setDescription(res.data.description)  
            setInstruction(res.data.instruction)  
        })
        .catch((err) =>{
            console.log(err)   
        })
    },[id])


    const SubmitWorkout = (e) => {
        e.preventDefault()
        const workout={name,
                goal,
                sets,
                reps,
                difficulty,
                description,
                instruction,
                }
            axios.put(`http://localhost:8000/api/workouts/edit/${id}`,workout)
            .then((workout)=>{
                console.log(workout)
                navigate("/dashboard")
            })
            .catch((err)=>{
                console.log(err.response.data.err.errors)
                setErrors(err.response.data.err.errors)
            },[])
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
        <div>
            <div id="editp">
            <h2>Workout Name: {name}</h2>
                <form onSubmit={ SubmitWorkout } className=''>
                {errors.name ? <p style={{color:"red"}}>{errors.name.message}</p>:null}
                <div>
                    <label htmlFor="">Exercise Name</label>
                    <input type="text" onChange={ handleName } value={name}/>
                </div>
                {errors.goal ? <p style={{color:"red"}}>{errors.goal.message}</p>:null}
                <div> {/*Type*/}
                    <label>Goal Type: </label> 
                    <select name="" id="" onChange={ handleGoal} value={goal} >
                    <option></option>
                        {
                            Goaltypes.map((item,idx)=>(
                                <option key = {idx} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                {errors.sets ? <p style={{color:"red"}}>{errors.sets.message}</p>:null}
                <div> 
                    <label>Sets: </label> 
                    <input type="number" onChange={ handleSets } min='0' value={sets}/>
                </div>
                <div> 
                    {errors.reps ? <p style={{color:"red"}}>{errors.reps.message}</p>:null}
                    <label>Reps: </label> 
                    <input type="number" onChange={ handleReps } min='0' value={reps}/>
                </div>
                <div onChange={ handleDifficulty }> 
                    <label>Difficulty: </label> 
                    <select onChange={ handleDifficulty} value={difficulty} >
                    <option></option>
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
                
                <input id="editf"type="submit" value="Finish Edit" />
                </form>
            </div>
            </div>
        </div>
    )
    }

export default EditWorkout